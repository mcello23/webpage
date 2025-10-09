#!/bin/bash

# Certificate Thumbnail Generator
# Creates 300px wide thumbnails for certificate images

IMAGES_DIR="/home/mcosta/webpage/images"
THUMBS_DIR="/home/mcosta/webpage/thumbs"

echo "🖼️  Certificate Thumbnail Generator"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed!"
    echo "   Install with: sudo apt-get install imagemagick"
    exit 1
fi

# Ensure thumbs directory exists
mkdir -p "$THUMBS_DIR"

# Counter for created thumbnails
count=0
skipped=0

# Process all jpg files in images directory
for img in "$IMAGES_DIR"/*.jpg; do
    # Skip if no jpg files found
    if [ ! -f "$img" ]; then
        continue
    fi
    
    filename=$(basename "$img")
    thumb_path="$THUMBS_DIR/$filename"
    
    # Check if thumbnail already exists
    if [ -f "$thumb_path" ]; then
        echo "⏭️  Skipped: $filename (already exists)"
        ((skipped++))
    else
        # Create thumbnail
        convert "$img" -resize 300x "$thumb_path"
        if [ $? -eq 0 ]; then
            echo "✓ Created: $filename"
            ((count++))
        else
            echo "❌ Failed: $filename"
        fi
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary:"
echo "   ✓ Created: $count thumbnails"
echo "   ⏭️  Skipped: $skipped (already existed)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Done! Thumbnails saved to: $THUMBS_DIR"
