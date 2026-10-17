from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


# Facebook, WhatsApp and X link previews use a 1.91:1 frame.
WIDTH, HEIGHT = 1200, 630
ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / 'public' / 'brand' / 'practical-love-ministry-facebook-logo.png'
OUT = ROOT / 'public' / 'brand' / 'practical-love-share.jpg'

CREAM = '#fff7ed'
GOLD = '#f4b544'
TEXT_LEFT = 520
TEXT_RIGHT = WIDTH - 70


def font(name: str, size: int):
    return ImageFont.truetype(f'C:/Windows/Fonts/{name}', size)


def fitted(draw: ImageDraw.ImageDraw, text: str, name: str, size: int):
    active = font(name, size)
    while draw.textlength(text, font=active) > TEXT_RIGHT - TEXT_LEFT and size > 12:
        size -= 2
        active = font(name, size)
    return active


image = Image.new('RGB', (WIDTH, HEIGHT), '#5c1a14')
draw = ImageDraw.Draw(image)

# Soft vertical fade from the logo's maroon to a deeper shade.
top, bottom = (0x6d, 0x21, 0x19), (0x3f, 0x11, 0x0d)
for y in range(HEIGHT):
    t = y / (HEIGHT - 1)
    draw.line([(0, y), (WIDTH, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)))

draw.rectangle((22, 22, WIDTH - 23, HEIGHT - 23), outline='#8f3025', width=3)
draw.rectangle((38, 38, WIDTH - 39, HEIGHT - 39), outline=GOLD, width=2)

# The logo has a solid background, so it sits on a matching disc.
logo = Image.open(LOGO).convert('RGB').resize((430, 430), Image.LANCZOS)
mask = Image.new('L', logo.size, 0)
ImageDraw.Draw(mask).ellipse((0, 0, logo.size[0] - 1, logo.size[1] - 1), fill=255)
image.paste(logo, (70, (HEIGHT - 430) // 2), mask)

title = fitted(draw, 'PRACTICAL LOVE', 'georgiab.ttf', 76)
draw.text((TEXT_LEFT, 150), 'PRACTICAL LOVE', font=title, fill=CREAM)

label = font('arialbd.ttf', 26)
draw.text((TEXT_LEFT + 4, 250), 'MINISTRY  |  LOGOSRHEMA', font=label, fill=GOLD)
draw.line([(TEXT_LEFT + 4, 300), (TEXT_LEFT + 180, 300)], fill=GOLD, width=3)

tagline = font('georgia.ttf', 38)
draw.text((TEXT_LEFT + 4, 330), 'Biblical love for homes,', font=tagline, fill=CREAM)
draw.text((TEXT_LEFT + 4, 380), 'churches and communities.', font=tagline, fill=CREAM)

draw.text((TEXT_LEFT + 4, 470), 'logosrhema.org.ng', font=font('arial.ttf', 28), fill=GOLD)

image.save(OUT, 'JPEG', quality=88, optimize=True, progressive=True)
print(OUT)
