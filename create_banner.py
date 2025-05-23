from PIL import Image, ImageDraw, ImageFont
import os

# Banner size
width, height = 1200, 500

# Create gradient background
base = Image.new('RGB', (width, height), '#4f8cff')
draw = ImageDraw.Draw(base)
for y in range(height):
    r = int(79 + (255-79) * y / height)
    g = int(140 + (255-140) * y / height)
    b = int(255 + (255-255) * y / height)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Add text
text = "Welcome to StoreRankly"
font_size = 64
try:
    font = ImageFont.truetype("arial.ttf", font_size)
except:
    font = ImageFont.load_default()
text_width, text_height = draw.textsize(text, font=font)
text_x = (width - text_width) // 2
text_y = (height - text_height) // 2

draw.text((text_x, text_y), text, font=font, fill="white")

# Ensure output directory exists
os.makedirs("public/banners", exist_ok=True)

# Save image
base.save("public/banners/shopping-mall.jpg", "JPEG", quality=95)
print("Banner image created at public/banners/shopping-mall.jpg") 