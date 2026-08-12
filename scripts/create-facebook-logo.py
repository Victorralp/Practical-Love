from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


SIZE = 1080
OUT = Path(__file__).resolve().parents[1] / 'public' / 'brand' / 'practical-love-ministry-facebook-logo.png'


def font(path: str, size: int):
    return ImageFont.truetype(path, size)


def centered(draw: ImageDraw.ImageDraw, text: str, y: int, active_font, fill: str, spacing: int = 0):
    if spacing:
        widths = [draw.textlength(char, font=active_font) for char in text]
        width = sum(widths) + spacing * (len(text) - 1)
        x = (SIZE - width) / 2
        for char, char_width in zip(text, widths):
            draw.text((x, y), char, font=active_font, fill=fill)
            x += char_width + spacing
        return

    box = draw.textbbox((0, 0), text, font=active_font)
    draw.text(((SIZE - (box[2] - box[0])) / 2, y), text, font=active_font, fill=fill)


OUT.parent.mkdir(parents=True, exist_ok=True)
image = Image.new('RGB', (SIZE, SIZE), '#5c1a14')
draw = ImageDraw.Draw(image)

# Quiet concentric framing, designed for the circular crop on Facebook.
draw.ellipse((75, 75, 1005, 1005), outline='#8f3025', width=3)
draw.ellipse((105, 105, 975, 975), outline='#f4b544', width=2)
draw.ellipse((185, 165, 895, 720), fill='#6d2119', outline='#f4b544', width=6)

# Layered heart derived from the website's existing mark.
heart = [(540, 670), (315, 485), (315, 355), (430, 270), (540, 350), (650, 270), (765, 355), (765, 485)]
draw.polygon(heart, fill='#c53b2d')
draw.ellipse((315, 270, 540, 495), fill='#c53b2d')
draw.ellipse((540, 270, 765, 495), fill='#c53b2d')
draw.polygon([(540, 620), (365, 475), (540, 380), (715, 475)], fill='#e45834')
draw.line([(540, 670), (315, 485), (315, 355), (430, 270), (540, 350), (650, 270), (765, 355), (765, 485), (540, 670)], fill='#fff7ed', width=13, joint='curve')

# The central light is a small, non-denominational sign of hope.
draw.polygon([(540, 330), (565, 412), (540, 474), (515, 412)], fill='#f4b544')
draw.ellipse((525, 377, 555, 407), fill='#fff7ed')

serif = font('C:/Windows/Fonts/georgiab.ttf', 64)
sans = font('C:/Windows/Fonts/arialbd.ttf', 32)
centered(draw, 'PRACTICAL LOVE', 755, serif, '#fff7ed')
centered(draw, 'MINISTRY  |  LOGOSRHEMA', 842, sans, '#f4b544', spacing=3)

image.save(OUT, 'PNG', optimize=True)
print(OUT)
