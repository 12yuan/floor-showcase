// 程序化木纹 SVG 纹理生成器
// 每种木色由 base(底色), grain(纹理色), dark(深色纹), highlight(高光) 组成

const woodPalettes = {
  lightOak: { base: '#D4B896', grain: '#C4A882', dark: '#A68B6B', highlight: '#E8D5B7', knot: '#8B7355' },
  darkWalnut: { base: '#5C4033', grain: '#4A3328', dark: '#3B2720', highlight: '#7A5A4A', knot: '#2E1F18' },
  cherry: { base: '#A0522D', grain: '#8B4513', dark: '#6B3410', highlight: '#C4704A', knot: '#5A2D0C' },
  grayWash: { base: '#B8B0A8', grain: '#A8A098', dark: '#908880', highlight: '#D0C8C0', knot: '#787068' },
  maple: { base: '#E8D5B7', grain: '#D4C0A0', dark: '#BFA882', highlight: '#F5EDE0', knot: '#A89070' },
  carbonized: { base: '#6B5B4F', grain: '#5A4A3E', dark: '#4A3A2E', highlight: '#8B7B6F', knot: '#3A2A1E' },
  heavyBamboo: { base: '#8B7D6B', grain: '#7A6B5A', dark: '#695B4A', highlight: '#A89A88', knot: '#5A4B3A' },
  ash: { base: '#C8B89A', grain: '#B8A888', dark: '#A09070', highlight: '#E0D0B8', knot: '#887858' },
};

// 生成 SVG data URI 木纹纹理
function generateWoodSVG(palette, width = 400, height = 300) {
  const { base, grain, dark, highlight, knot } = palette;

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <filter id="w1" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.12" numOctaves="6" seed="${Math.floor(Math.random() * 999)}" result="noise"/>
          <feColorMatrix type="matrix" in="noise" values="
            0.3 0 0 0 ${parseInt(base.slice(1,2),16)/255}
            0 0.3 0 0 ${parseInt(base.slice(2,4),16)/255}
            0 0 0.3 0 ${parseInt(base.slice(4,6),16)/255}
            0 0 0 1 0"/>
          <feBlend in="SourceGraphic" mode="multiply" result="base"/>
        </filter>
        <filter id="w2">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.06" numOctaves="4" seed="${Math.floor(Math.random() * 999)}" result="grain"/>
          <feColorMatrix type="matrix" in="grain" values="
            0.4 0 0 0 ${parseInt(grain.slice(1,2),16)/255}
            0 0.4 0 0 ${parseInt(grain.slice(2,4),16)/255}
            0 0 0.4 0 ${parseInt(grain.slice(4,6),16)/255}
            0 0 0 0.6 0"/>
        </filter>
        <linearGradient id="plank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${highlight}" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="${base}" stop-opacity="0"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0.2"/>
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0.08"/>
          <stop offset="50%" stop-color="white" stop-opacity="0"/>
          <stop offset="100%" stop-color="white" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="${base}"/>
      <rect width="${width}" height="${height}" filter="url(#w1)" opacity="0.7"/>
      <rect width="${width}" height="${height}" filter="url(#w2)" opacity="0.5"/>
      <rect width="${width}" height="${height}" fill="url(#plank)"/>
      <rect width="${width}" height="${height}" fill="url(#shine)"/>
      <line x1="${width*0.33}" y1="0" x2="${width*0.33}" y2="${height}" stroke="${dark}" stroke-width="1" opacity="0.15"/>
      <line x1="${width*0.66}" y1="0" x2="${width*0.66}" y2="${height}" stroke="${dark}" stroke-width="1" opacity="0.15"/>
      <ellipse cx="${width*0.5}" cy="${height*0.4}" rx="12" ry="20" fill="${knot}" opacity="0.2"/>
      <ellipse cx="${width*0.2}" cy="${height*0.7}" rx="8" ry="14" fill="${knot}" opacity="0.15"/>
    </svg>
  `)}`;
}

// 瓷砖纹理
function generateTileSVG(palette, width = 400, height = 400) {
  const { base, grain, dark, highlight } = palette;
  const patterns = [
    // 大理石纹
    `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="${base}"/>
        <filter id="m1"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="8" seed="42"/></filter>
        <rect width="${width}" height="${height}" filter="url(#m1)" opacity="0.3"/>
        <path d="M0,${height*0.3} Q${width*0.3},${height*0.2} ${width*0.5},${height*0.35} T${width},${height*0.3}" stroke="${grain}" stroke-width="2" fill="none" opacity="0.4"/>
        <path d="M0,${height*0.6} Q${width*0.4},${height*0.55} ${width*0.6},${height*0.65} T${width},${height*0.58}" stroke="${dark}" stroke-width="1.5" fill="none" opacity="0.3"/>
        <path d="M${width*0.2},0 Q${width*0.25},${height*0.4} ${width*0.15},${height*0.8}" stroke="${grain}" stroke-width="1" fill="none" opacity="0.25"/>
        <rect width="${width}" height="${height}" fill="url(#tg)" opacity="0.5"/>
        <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${highlight}" stop-opacity="0.3"/><stop offset="100%" stop-color="${dark}" stop-opacity="0.1"/></linearGradient></defs>
      </svg>
    `)}`,
    // 木纹砖
    `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="${base}"/>
        <filter id="tw"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.08" numOctaves="5" seed="77"/></filter>
        <rect width="${width}" height="${height}" filter="url(#tw)" opacity="0.5"/>
        ${Array.from({length: 6}, (_, i) => `<line x1="0" y1="${height*(i+1)/7}" x2="${width}" y2="${height*(i+1)/7}" stroke="${dark}" stroke-width="0.8" opacity="0.2"/>`).join('')}
        <line x1="${width/2}" y1="0" x2="${width/2}" y2="${height}" stroke="${dark}" stroke-width="0.5" opacity="0.15"/>
        <rect width="${width}" height="${height}" fill="${highlight}" opacity="0.08"/>
      </svg>
    `)}`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
}

// PVC/SPC 纹理
function generatePvcSVG(palette, width = 400, height = 300) {
  const { base, grain, dark, highlight } = palette;
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="${base}"/>
      <filter id="pv"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.15" numOctaves="4" seed="55"/></filter>
      <rect width="${width}" height="${height}" filter="url(#pv)" opacity="0.4"/>
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${highlight}" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0.15"/>
        </linearGradient>
        <pattern id="planks" width="${width/3}" height="${height}" patternUnits="userSpaceOnUse">
          <rect width="${width/3}" height="${height}" fill="none" stroke="${dark}" stroke-width="1" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#pg)"/>
      <rect width="${width}" height="${height}" fill="url(#planks)"/>
    </svg>
  `)}`;
}

// 竹木纹理
function generateBambooSVG(palette, width = 400, height = 300) {
  const { base, grain, dark, highlight } = palette;
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="${base}"/>
      <filter id="bp"><feTurbulence type="fractalNoise" baseFrequency="0.04 0.02" numOctaves="5" seed="33"/></filter>
      <rect width="${width}" height="${height}" filter="url(#bp)" opacity="0.35"/>
      ${Array.from({length: 40}, (_, i) => {
        const x = (i / 40) * width;
        const h = 0.3 + Math.random() * 0.7;
        return `<line x1="${x}" y1="${height*(1-h)/2}" x2="${x}" y2="${height*(1+h)/2}" stroke="${grain}" stroke-width="${0.5+Math.random()}" opacity="${0.15+Math.random()*0.2}"/>`;
      }).join('')}
      <rect width="${width}" height="${height}" fill="${highlight}" opacity="0.06"/>
    </svg>
  `)}`;
}

// 导出纹理生成函数和调色板
export { woodPalettes, generateWoodSVG, generateTileSVG, generatePvcSVG, generateBambooSVG };

// 快速生成产品色块
export function getColorSwatches(category) {
  const paletteKeys = {
    wood: ['lightOak', 'darkWalnut', 'cherry', 'maple', 'ash'],
    laminate: ['grayWash', 'lightOak', 'darkWalnut', 'maple', 'ash'],
    tile: [
      { base: '#F0EBE3', grain: '#D8D0C4', dark: '#B8B0A4', highlight: '#FFF8F0' },
      { base: '#E8E4DE', grain: '#D0CCC6', dark: '#B0ACA6', highlight: '#F8F4EE' },
      { base: '#C8B89A', grain: '#B8A888', dark: '#A09070', highlight: '#E0D0B8' },
      { base: '#A09080', grain: '#908070', dark: '#786858', highlight: '#C0B0A0' },
      { base: '#D4C8B8', grain: '#C4B8A8', dark: '#A8A090', highlight: '#F0E8D8' },
    ],
    pvc: ['grayWash', 'lightOak', 'darkWalnut', 'maple', 'carbonized'],
    bamboo: ['carbonized', 'heavyBamboo', 'lightOak', 'darkWalnut', 'maple'],
  };

  const keys = paletteKeys[category] || paletteKeys.wood;
  return keys.map((key) => {
    if (typeof key === 'string') {
      return { name: key, ...woodPalettes[key] };
    }
    return key;
  });
}

// 根据分类生成纹理 URL
export function generateTexture(category, colorIndex = 0) {
  const swatches = getColorSwatches(category);
  const palette = swatches[colorIndex % swatches.length];

  switch (category) {
    case 'wood':
    case 'laminate':
      return generateWoodSVG(palette);
    case 'tile':
      return generateTileSVG(palette);
    case 'pvc':
      return generatePvcSVG(palette);
    case 'bamboo':
      return generateBambooSVG(palette);
    default:
      return generateWoodSVG(palette);
  }
}

// 色块名称映射
export const colorNames = {
  lightOak: '浅橡木',
  darkWalnut: '深胡桃',
  cherry: '樱桃木',
  grayWash: '灰白洗',
  maple: '枫木',
  carbonized: '碳化色',
  heavyBamboo: '重竹色',
  ash: '白蜡木',
};
