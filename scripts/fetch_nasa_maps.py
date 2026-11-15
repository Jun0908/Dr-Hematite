#!/usr/bin/env python3
"""Optionally download official NASA JPL Photojournal map JPEGs.
These are NASA source visuals, NOT a resource-yield dataset.
Run from the package root with network access: python scripts/fetch_nasa_maps.py
"""
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets'/'nasa_maps'
OUT.mkdir(parents=True,exist_ok=True)
IMAGES={
 'PIA26045':'SWIM subsurface water ice',
 'PIA26046':'Buried water ice distribution',
 'PIA04253':'Iron element distribution',
 'PIA04256':'Silicon element distribution',
 'PIA05154':'Grey hematite Meridiani regional map',
 'PIA02056':'Hematite TES map',
}
for code,desc in IMAGES.items():
    url=f'https://photojournal.jpl.nasa.gov/jpeg/{code}.jpg'
    dest=OUT/f'{code}.jpg'
    if dest.exists() and dest.stat().st_size>1024:
        print('EXISTS',dest)
        continue
    try:
        with urlopen(Request(url,headers={'User-Agent':'Dr-Hematite-science-resource-education/1.0'}),timeout=15) as resp:
            data=resp.read()
            ctype=resp.headers.get('Content-Type','')
        if len(data)<1000 or not data.startswith(b'\xff\xd8'):
            raise ValueError(f'Not a valid JPEG: size={len(data)} type={ctype}')
        dest.write_bytes(data)
        print('OK',code,desc,len(data))
    except (URLError,HTTPError,OSError,ValueError) as e:
        print('FAILED',code,url,str(e))
print('Source catalog: docs/science/NASA_RESOURCE_MAPS.md')
