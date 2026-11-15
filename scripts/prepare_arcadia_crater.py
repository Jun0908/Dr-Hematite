"""Build a compact, georeferenced game map from a HiRISE DTM row range.

Source: DTEEC_025735_2185_025801_2185_A01.IMG, PDS3 PC_REAL, 1.003 m/pixel.
Run with --fetch to download rows 5000..7599 with HTTP Range
139887972-212615171, then build the map. The temporary 72 MB input can be
deleted after generation; the generated image and tile measurements remain.
The resulting board is an actual 2.61 km square within Arcadia Planitia.
Colors, relief contrast, and the two mountain tiles are game presentation choices.
"""
from __future__ import annotations

import json
import argparse
from pathlib import Path
from urllib.request import Request, urlopen

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "game/assets/arcadia_crater_dtm_rows_5000_7599.bin"
OUT = ROOT / "game/assets"
ROWS, COLS = 2600, 6993
X0, X1 = 2000, 4600
Y0, Y1 = 5000, 7600
SIZE = 11
GAME_MOUNTAIN_TILES = [[4, 6], [6, 4]]
METERS_PER_PIXEL = 1.0030231538227
DTM_URL = "https://www.uahirise.org/PDS/DTM/ESP/ORB_025700_025799/ESP_025735_2185_ESP_025801_2185/DTEEC_025735_2185_025801_2185_A01.IMG"
RANGE_START, RANGE_END = 139887972, 212615171
RESOLUTION = 58980.9242262
SAMPLE_OFFSET = 3607.5
CENTER_LONGITUDE = 191.59
CENTER_LATITUDE = 35.0


def fetch() -> None:
    request = Request(DTM_URL, headers={"Range": f"bytes={RANGE_START}-{RANGE_END}"})
    with urlopen(request, timeout=120) as response:
        if response.status != 206:
            raise ValueError(f"Server did not honor the byte range: {response.status}")
        with SOURCE.open("wb") as output:
            while chunk := response.read(1024 * 1024):
                output.write(chunk)
    if SOURCE.stat().st_size != RANGE_END - RANGE_START + 1:
        raise ValueError("The downloaded DTM row range is incomplete")


def render() -> None:
    rows = np.memmap(SOURCE, dtype="<f4", mode="r", shape=(ROWS, COLS))
    heights = np.asarray(rows[:, X0:X1], dtype=np.float32)
    if heights.shape != (2600, 2600) or not np.isfinite(heights).all():
        raise ValueError("DTM crop is incomplete or contains missing elevations")
    if not ((heights > -5000) & (heights < -3000)).all():
        raise ValueError("Unexpected elevation range")

    # Render measured elevation as a rust-coloured relief map; vertical relief is
    # exaggerated for a phone screen. Game movement uses two discrete mountain
    # tiles selected from this relief; all other tile edges remain traversable.
    h = heights[::2, ::2]
    gy, gx = np.gradient(h, METERS_PER_PIXEL * 2)
    shade = np.clip(0.72 + (-gx * 0.55 - gy * 0.75) * 2.2, 0.38, 1.25)
    t = np.clip((h + 4242) / 368, 0, 1)
    low = np.array([67, 56, 62], dtype=np.float32)
    mid = np.array([164, 91, 65], dtype=np.float32)
    high = np.array([224, 153, 104], dtype=np.float32)
    lower = np.clip(t / .68, 0, 1)[..., None]
    upper = np.clip((t - .68) / .32, 0, 1)[..., None]
    color = low * (1 - lower) + mid * lower
    color = color * (1 - upper) + high * upper
    color *= shade[..., None]
    Image.fromarray(np.uint8(np.clip(color, 0, 255)), "RGB").save(
        OUT / "arcadia_crater_surface.webp", quality=88, method=6
    )

    tile_heights = np.zeros((SIZE, SIZE), dtype=np.float64)
    for y in range(SIZE):
        for x in range(SIZE):
            patch = heights[
                round(y * 2600 / SIZE) : round((y + 1) * 2600 / SIZE),
                round(x * 2600 / SIZE) : round((x + 1) * 2600 / SIZE),
            ]
            tile_heights[y, x] = float(np.median(patch))
    elevations = np.rint(tile_heights).astype(int)
    slopes = np.zeros((SIZE, SIZE), dtype=int)
    for y in range(SIZE):
        for x in range(SIZE):
            slopes[y, x] = max(
                abs(int(elevations[y, x]) - int(elevations[ny, nx]))
                for ny in range(max(0, y - 1), min(SIZE, y + 2))
                for nx in range(max(0, x - 1), min(SIZE, x + 2))
                if (nx, ny) != (x, y)
            )
    data = {
        "source": "HiRISE DTEEC_025735_2185_025801_2185_A01",
        "region": "Fresh 1-km impact crater, Arcadia Planitia",
        "dtmRows": [Y0, Y1],
        "dtmColumns": [X0, X1],
        "metersPerTile": round(METERS_PER_PIXEL * 2600 / SIZE, 1),
        "latitudeBounds": [round(38.256481815693 - Y1 / RESOLUTION, 5), round(38.256481815693 - Y0 / RESOLUTION, 5)],
        "longitudeBounds": [round(CENTER_LONGITUDE + (X0 - SAMPLE_OFFSET) / (RESOLUTION * np.cos(np.deg2rad(CENTER_LATITUDE))), 5), round(CENTER_LONGITUDE + (X1 - SAMPLE_OFFSET) / (RESOLUTION * np.cos(np.deg2rad(CENTER_LATITUDE))), 5)],
        "elevationDatum": "Mars 2000 areoid, meters",
        "elevation": elevations.tolist(),
        "neighborRelief": slopes.tolist(),
        "gameMountainTiles": GAME_MOUNTAIN_TILES,
        "gameRule": "Only two isolated mountain tiles require Climbing Gear; movement, supply, and line-of-sight are game abstractions",
    }
    (OUT / "arcadia_crater_terrain.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT / "arcadia_crater_terrain.js").write_text(
        "window.HematiteTerrain = " + json.dumps(data, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    print("elevation range", heights.min(), heights.max())
    print("per-tile meters", data["metersPerTile"])
    print("rough tiles", int((slopes > 45).sum()))
    print("tile elevations", json.dumps(data["elevation"]))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fetch", action="store_true", help="download the required DTM rows first")
    args = parser.parse_args()
    if args.fetch:
        fetch()
    render()
