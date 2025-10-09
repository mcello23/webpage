#!/bin/bash

# Script to regenerate all certificate thumbnails to consistent high quality
# Generates 300px wide thumbnails from the full-size certificate images

IMAGES_DIR="../../images"
THUMBS_DIR="../../images/thumbs"

echo "🔧 Regenerating certificate thumbnails to consistent 300px width..."
echo "=================================================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed"
    echo "Please install it with: sudo apt-get install imagemagick"
    exit 1
fi

# Counter
count=0
errors=0

# Process each certificate image
for img in "$IMAGES_DIR"/*.jpg; do
    if [ -f "$img" ]; then
        # Get filename without path
        filename=$(basename "$img")
        
        # Skip if this is already a thumbnail
        if [[ "$img" == *"/thumbs/"* ]]; then
            continue
        fi
        
        # Output thumbnail path
        thumb="$THUMBS_DIR/$filename"
        
        echo "Processing: $filename"
        
        # Generate thumbnail:
        # - Resize to 300px width, maintaining aspect ratio
        # - Strip metadata to reduce file size
        # - Use quality 85 for good balance between quality and file size
        # - Sharpen slightly after resize for better clarity
        if convert "$img" \
            -resize 300x300\> \
            -strip \
            -quality 85 \
            -unsharp 0x0.5 \
            "$thumb"; then
            
            # Get new dimensions
            dims=$(identify -format "%wx%h" "$thumb" 2>/dev/null)
            size=$(du -h "$thumb" | cut -f1)
            echo "  ✓ Created: $dims, $size"
            ((count++))
        else
            echo "  ✗ Failed to process $filename"
            ((errors++))
        fi
    fi
done

echo "=================================================="
echo "✅ Regenerated $count thumbnails"
if [ $errors -gt 0 ]; then
    echo "⚠️  $errors errors encountered"
fi
echo ""
echo "📊 Thumbnail statistics:"
cd "$THUMBS_DIR"
echo "Total thumbnails: $(ls -1 *.jpg 2>/dev/null | wc -l)"
echo "Size range: $(du -h *.jpg 2>/dev/null | sort -h | head -1 | cut -f1) - $(du -h *.jpg 2>/dev/null | sort -h | tail -1 | cut -f1)"
echo ""
echo "Dimension breakdown:"
identify -format "%wx%h\n" *.jpg 2>/dev/null | sort | uniq -c | sort -rn
