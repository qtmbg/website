#!/usr/bin/env python3
"""Assemble approved practice copy with career facts, then use the existing site build.

The six source JSON files are read-only. Public generated data is committed so a
production build does not need this identity workspace or its private records.
"""
import argparse
import json
import os
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SLUGS = ('africa-business-school', 'quantum-branding', 'brandos', 'rbmg', 'energy-cube', 'zone-aire')


def read_json(file):
    return json.loads(file.read_text(encoding='utf-8'))


def assemble(records_dir, career_dir, labels_file):
    labels = read_json(labels_file)
    result = {}
    truth_file = career_dir.parent / "project-truth.json"
    truth = read_json(truth_file)["projects"] if truth_file.exists() else {}

    def career_record(slug):
        editorial = read_json(career_dir / f"{slug}.json")
        return {**editorial, **truth.get(slug, {}), "title": editorial["title"]}
    for slug in SLUGS:
        copy = read_json(records_dir / f'{slug}.json')
        career = career_record(slug)
        if copy['slug'] != slug or career['slug'] != slug:
            raise ValueError(f'{slug}: filename and record slug disagree')
        facts = career['facts']
        start, end = facts.get('start'), facts.get('end')
        ongoing = facts.get('ongoing', end == 'present')
        if end == 'present':
            end = None
        for key, value in [('start', start), ('end', end)]:
            if value is not None and (type(value) is not int or not 1900 <= value <= 2100):
                raise ValueError(f'{slug}: invalid {key}')
        if type(ongoing) is not bool or (ongoing and (start is None or end is not None)):
            raise ValueError(f'{slug}: inconsistent ongoing dates')
        if start and end and end < start:
            raise ValueError(f'{slug}: end precedes start')
        relationship = facts['relationship']
        provenance = facts['attribution']
        role = facts['role']
        # The provider decision uses explicit provenance, never context or KEEP.
        engagement = provenance == 'Quantum Branding engagement'
        if engagement and start is not None and start < 2023:
            raise ValueError(f'{slug}: pre-practice work attributed to Quantum Branding')
        r = {
            'slug': slug, 'name': career['title'],
            'relationship': relationship, 'provenance': provenance,
            'relationshipLabel': labels['relationships'][relationship],
            'attributionLabel': labels['provenance'][provenance],
            'role': labels['roles'][role],
            'start': start, 'end': end, 'ongoing': ongoing,
            'practiceEngagement': engagement,
            'canonicalCareerUrl': copy.get('canonicalCareerUrl', f'https://nizzar.com/work/{slug}'),
            'related': []
        }
        if not re.fullmatch(r'https://nizzar\.com/work/[a-z0-9-]+', r['canonicalCareerUrl']):
            raise ValueError(f'{slug}: invalid canonicalCareerUrl')
        for related in copy.get('related', career.get('related', [])):
            if related == slug or not re.fullmatch(r'[a-z0-9-]+', related):
                raise ValueError(f'{slug}: invalid related work {related}')
            item = career_record(related)
            r['related'].append({'slug': related, 'name': item['title'], 'lens': item['practice']['lens']})
        for lang in ('en', 'fr'):
            c = copy[lang]
            for key in ('title', 'lede', 'description', 'context', 'shows'):
                if not isinstance(c.get(key), str) or not c[key].strip():
                    raise ValueError(f'{slug}/{lang}: missing {key}')
            if not c.get('sections') or any(not s.get('heading') or not s.get('body') or
                    any(not isinstance(p, str) or not p.strip() for p in s['body']) for s in c['sections']):
                raise ValueError(f'{slug}/{lang}: invalid sections')
            r[lang] = {**c, 'seoTitle': c.get('seoTitle', labels.get('seoTitles', {}).get(slug, {}).get(lang, f"{c['title']} · {labels['seoSuffix'][lang]}"))}
        result[slug] = r
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--records-dir', type=Path, default=Path(os.environ.get('PRACTICE_SOURCE', ROOT.parents[1] / 'work-v5/practice')))
    parser.add_argument('--career-dir', type=Path, default=Path(os.environ.get('CAREER_RECORDS', ROOT.parent / 'nizzar-com/content/work/records')))
    parser.add_argument('--labels', type=Path, default=ROOT / 'src/archive/practice-labels.json')
    parser.add_argument('--output', type=Path, default=ROOT / 'src/archive/practice-copy.json')
    parser.add_argument('--data-only', action='store_true', help='assemble data without rebuilding HTML')
    args = parser.parse_args()
    records = assemble(args.records_dir, args.career_dir, args.labels)
    # Keep any previously authored PROOF records; this handoff handles only six KEEP records.
    output = read_json(args.output) if args.output.exists() else {}
    output.update(records)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Assembled {len(records)} practice records: {args.output}')
    if not args.data_only:
        subprocess.run(['node', 'scripts/build.mjs'], cwd=ROOT, check=True)


if __name__ == '__main__':
    main()
