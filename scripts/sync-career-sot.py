#!/usr/bin/env python3
"""Align the QB archive continuity data with the canonical career record on nizzar.com.

nizzar.com/work is the canonical career portfolio. The QB archive keeps historical pages
for continuity only; their dates and corrections follow the shared truth file.
Usage: python3 scripts/sync-career-sot.py --truth <nizzar-com>/content/work/project-truth.json
"""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MOD = ROOT / 'src/archive/projects.mjs'
REG = ROOT / 'archive/registers/projects.json'
CAREER = ROOT / 'src/career.mjs'

NYT_EN = 'On 12 August 2020, Diptyk’s Instagram account, @diptykmagazine, was included in Siddhartha Mitter’s “Five Art Accounts to Follow on Instagram Now” in The New York Times. The recognition concerned the magazine’s account and the editorial and digital work Arroz Con Pollo built for it.'
NYT_FR = 'Le 12 août 2020, le compte Instagram de Diptyk, @diptykmagazine, a été retenu dans l’article de Siddhartha Mitter « Five Art Accounts to Follow on Instagram Now » du New York Times. Cette reconnaissance concernait le compte du magazine et le travail éditorial et numérique qu’Arroz Con Pollo avait construit pour lui.'

FIXES = {
 'diptyk': {'role': {'en': 'Brand Strategy & Implementation · Arroz Con Pollo co-founder', 'fr': 'Brand Strategy & Implementation · cofondateur d’Arroz Con Pollo'}},
 'arroz-con-pollo': {'role': {'en': 'Co-founder with Nabil Nadifi · 2019–2022', 'fr': 'Cofondateur avec Nabil Nadifi · 2019–2022'}},
 'bananacorp': {'role': {'en': 'Co-founder; board member; head of communications', 'fr': 'Cofondateur ; membre du conseil ; responsable de la communication'}},
 'unitar': {'role': {'en': 'Web3 strategy and certification: concept phase from 2022, then through Berexia in 2023', 'fr': 'Stratégie Web3 et certification : phase de conception dès 2022, puis via Berexia en 2023'}},
 'the-future-fashion': {
  'title': 'THE FUTURE FASHION',
  'relationship': 'COLLABORATION',
  'role': {'en': 'Co-creator and programme contributor · 18 September 2024', 'fr': 'Cocréateur et contributeur au programme · 18 septembre 2024'},
  'text': {
   'en': 'The Future Fashion, on 18 September 2024 in Milan, was organised by IZY Studio and BananaConf. Nizzar Ben Chekroune co-created it with Zarina Izy and Sander Gansen and contributed to its programme, which widened the fashion conversation to AI, AR, 3D and physical and digital creation. It followed Web3 × Fashion, a separate event held on 18 September 2023.',
   'fr': 'The Future Fashion, le 18 septembre 2024 à Milan, a été organisé par IZY Studio et BananaConf. Nizzar Ben Chekroune l’a cocréé avec Zarina Izy et Sander Gansen et a contribué à son programme, qui élargissait la conversation sur la mode à l’IA, à la réalité augmentée, à la 3D et à la création physique et numérique. Il faisait suite à Web3 × Fashion, un événement distinct tenu le 18 septembre 2023.'},
 },
}
# Earlier register edits (pass C), re-applied on the rebuilt archive copy.
STRING_FIXES = [
 ('Founded in 2021. $2.7M raised. An eight-figure exit.', 'Founded in 2021. $2.7M raised.'),
 ('Fondé en 2021. 2,7 millions de dollars levés. Une sortie à huit chiffres.', 'Fondé en 2021. 2,7 millions de dollars levés.'),
 ('"en": "Web3 strategy and certification consultant"', '"en": "Web3 strategy and certification, through Berexia"'),
 ('"fr": "Consultant en stratégie Web3 et certification"', '"fr": "Stratégie Web3 et certification, via Berexia"'),
 ('"en": "Web3 strategic consultant"', '"en": "Web3 strategy, through Berexia"'),
 ('"fr": "Consultant stratégique Web3"', '"fr": "Stratégie Web3, via Berexia"'),
 ('"en": "Strategic advisor · February–June 2023"', '"en": "Web3 strategy through Berexia · February–June 2023"'),
 ('"fr": "Conseiller stratégique · février–juin 2023"', '"fr": "Stratégie Web3 via Berexia · février–juin 2023"'),
 ('Arroz Con Pollo’s work for Diptyk · New York Times', 'Diptyk · Arroz Con Pollo studio film'),
]


def period_from_truth(f):
    start, end, ongoing = f.get('start'), f.get('end'), f.get('ongoing')
    return start, ('present' if ongoing else end)


def fix_projects(projects, truth, log):
    for p in projects:
        t = truth.get(p['slug'])
        if t:
            start, end = period_from_truth(t['facts'])
            if (p.get('start'), p.get('end')) != (start, end):
                log.append(f"{p['slug']}: {p.get('start')}–{p.get('end')} → {start}–{end}")
                p['start'], p['end'] = start, end
        fx = FIXES.get(p['slug'])
        if not fx:
            continue
        for k in ('title', 'relationship', 'role'):
            if k in fx and p.get(k) != fx[k]:
                log.append(f"{p['slug']}: {k}"); p[k] = fx[k]
        if 'text' in fx:
            body = {l: [fx['text'][l]] for l in ('en', 'fr')}
            p['oneLine'] = {l: fx['text'][l].split('. ')[0] + '.' for l in ('en', 'fr')}
            p['summary'] = body
            for b in p.get('blocks', []):
                if b.get('type') == 'text':
                    b['body'] = body
            log.append(f"{p['slug']}: text separated from Web3 × Fashion 2023")
        if p['slug'] == 'diptyk':
            for b in p.get('blocks', []):
                if b.get('type') == 'text':
                    for l, new in (('en', NYT_EN), ('fr', NYT_FR)):
                        b['body'][l] = [new if ('New York Times' in x and ('included' in x or 'a inclus' in x)) else x for x in b['body'][l]]
            log.append('diptyk: NYT recognition stated exactly')
    return projects


def apply_strings(text):
    for a, b in STRING_FIXES:
        text = text.replace(a, b)
    return text


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--truth', required=True, type=Path)
    a = ap.parse_args()
    truth = json.loads(a.truth.read_text())['projects']
    log = []

    src = MOD.read_text(encoding='utf-8')
    m = re.search(r'(export const projects = )(\[.*\])(;?\s*)$', src, re.S)
    raw = m.group(2)
    projects = json.loads(raw)
    if json.dumps(projects, ensure_ascii=False, indent=2) != raw:
        raise SystemExit('projects.mjs is not in canonical JSON form; refusing to rewrite')
    projects = fix_projects(projects, truth, log)
    out = src[:m.start(2)] + json.dumps(projects, ensure_ascii=False, indent=2) + m.group(3)
    MOD.write_text(apply_strings(out), encoding='utf-8')

    if REG.exists():
        reg = json.loads(apply_strings(REG.read_text(encoding='utf-8')))
        items = reg if isinstance(reg, list) else reg.get('projects', [])
        fix_projects(items, truth, [])
        REG.write_text(json.dumps(reg, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    for extra in [ROOT / 'archive/registers/claims.json', ROOT / 'archive/media.json']:
        if extra.exists():
            t = extra.read_text(encoding='utf-8')
            t2 = apply_strings(t).replace('"statement": "Founded 2021; $2.7M raised; eight-figure exit"', '"statement": "Founded 2021; $2.7M raised (exit claim withdrawn by owner, 7 Oct 2026)"')
            if t2 != t:
                extra.write_text(t2, encoding='utf-8')

    c = CAREER.read_text(encoding='utf-8')
    c = c.replace("{name:'Diptyk',start:2020,end:2021}", "{name:'Diptyk',start:2019,end:2021}")
    c = c.replace("{name:'BnanaCorp',start:2021,end:2023}", "{name:'BananaCorp',start:2022,end:2025}")
    CAREER.write_text(c, encoding='utf-8')
    print('\n'.join(log))
    print(f'{len(log)} changes')


if __name__ == '__main__':
    main()
