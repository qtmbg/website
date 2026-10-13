"""Rebuild the UI font subsets without changing glyphs, weights or license.
Authoring dependency: fonttools[woff]. Production builds use committed WOFF2s.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
fonts=Path(__file__).resolve().parents[1]/'assets/fonts'
original=fonts/'bricolage-grotesque-latin-variable.woff2'
basic=set(range(256))|set(range(0x2000,0x2070))|{0x20ac,0x2116,0x2190,0x2191,0x2192,0x2193}
extended=set(range(0x100,0x300))
source=TTFont(original)
assert set(source.getBestCmap()) <= basic|extended
for name,codepoints in [('basic',basic),('extended',extended)]:
 font=TTFont(original)
 options=subset.Options();options.layout_features=['*'];options.name_IDs=['*'];options.name_legacy=True;options.name_languages=['*']
 subsetter=subset.Subsetter(options=options);subsetter.populate(unicodes=codepoints);subsetter.subset(font)
 font.save(fonts/f'bricolage-grotesque-{name}-variable.woff2')
 assert [(a.axisTag,a.minValue,a.maxValue) for a in font['fvar'].axes] == [(a.axisTag,a.minValue,a.maxValue) for a in source['fvar'].axes]
