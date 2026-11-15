"""Create game-sized crops from a NASA/JPL/University of Arizona HiRISE browse image.

Source: PSP_004097_2185_RED.abrowse.jpg (map-projected, north up).
Only contrast and false-colour are changed; the image is not redrawn.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / "assets/nasa_maps/arcadia_hirise.jpg"
out = ROOT / "game/assets"
out.mkdir(parents=True, exist_ok=True)
image = Image.open(source).convert("L")
# A square within the original browse frame, avoiding the black image edges.
box = (400, 2300, 1648, 3548)
crop = image.crop(box)
ImageEnhance.Contrast(crop).enhance(1.12).save(out / "arcadia_source_crop.webp", quality=89)
colour = ImageOps.colorize(ImageEnhance.Contrast(crop).enhance(1.25), black="#30242b", mid="#975d4d", white="#e8b78d")
colour.save(out / "arcadia_surface.webp", quality=88)
print(f"Crop {box}, {crop.size}; source {source}")
