import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateFavicons() {
  console.log('🎨 Generating PNG and ICO Favicons for Google Search & Web Standards...');

  const publicDir = path.join(process.cwd(), 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');

  if (!fs.existsSync(svgPath)) {
    console.error('❌ Error: public/favicon.svg not found!');
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(svgPath);

  // Sizes to generate
  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-512x512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'logo.png', size: 512 },
  ];

  for (const item of sizes) {
    const outPath = path.join(publicDir, item.name);
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(outPath);
    console.log(`  ✓ Generated ${item.name} (${item.size}x${item.size})`);
  }

  // Generate binary favicon.ico (48x48 PNG container disguised or converted)
  const icoPath = path.join(publicDir, 'favicon.ico');
  const png48Buffer = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  // Simple ICO header writing logic with PNG entries
  // ICO Header: 2 bytes reserved (0), 2 bytes type (1 = ICO), 2 bytes image count (2)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO Type
  header.writeUInt16LE(2, 4); // Number of images (2: 32x32, 48x48)

  const offsetImage1 = 6 + 16 * 2; // Header (6) + 2 directory entries (32 bytes) = 38
  const offsetImage2 = offsetImage1 + png32Buffer.length;

  const dir1 = Buffer.alloc(16);
  dir1.writeUInt8(32, 0); // Width
  dir1.writeUInt8(32, 1); // Height
  dir1.writeUInt8(0, 2);  // Colors
  dir1.writeUInt8(0, 3);  // Reserved
  dir1.writeUInt16LE(1, 4); // Color planes
  dir1.writeUInt16LE(32, 6); // Bits per pixel
  dir1.writeUInt32LE(png32Buffer.length, 8); // Image size
  dir1.writeUInt32LE(offsetImage1, 12); // Image offset

  const dir2 = Buffer.alloc(16);
  dir2.writeUInt8(48, 0); // Width
  dir2.writeUInt8(48, 1); // Height
  dir2.writeUInt8(0, 2);  // Colors
  dir2.writeUInt8(0, 3);  // Reserved
  dir2.writeUInt16LE(1, 4); // Color planes
  dir2.writeUInt16LE(32, 6); // Bits per pixel
  dir2.writeUInt32LE(png48Buffer.length, 8); // Image size
  dir2.writeUInt32LE(offsetImage2, 12); // Image offset

  const icoBuffer = Buffer.concat([header, dir1, dir2, png32Buffer, png48Buffer]);
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`  ✓ Generated valid binary favicon.ico with 32x32 and 48x48 frames`);

  // Write site.webmanifest
  const manifest = {
    name: "Dreams Fly International",
    short_name: "Dreams Fly",
    icons: [
      { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    theme_color: "#b71c1c",
    background_color: "#ffffff",
    display: "standalone"
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('  ✓ Generated public/site.webmanifest');

  console.log('✨ All Favicon formats generated successfully!');
}

generateFavicons().catch((err) => {
  console.error('❌ Favicon generation failed:', err);
  process.exit(1);
});
