let twfontsStyleElement;
const pretwFonts = "要預先載入的文字";
const twWebFonts = `
BpmfZihiSans-Regular
BpmfZihiKaiStd-Regular
BpmfZihiBox-R
BpmfZihiOnly-R
BpmfZihiSerif-Regular
TaigiKaiStd-TL-R
TaigiKaiStd-HI-R
TaigiKaiStd-TLHI-R
TaigiGenSekiG-TL-R
TaigiGenSekiG-HI-R
TaigiGenSekiG-TLHI-R
TaigiGenRyuM-TL-R
TaigiGenRyuM-HI-R
TaigiGenRyuM-TLHI-R
TaigiGenSenR-TL-R
TaigiGenSenR-HI-R
TaigiGenSenR-TLHI-R
tauhu-oo
EngTRESSA
EngTRESSB
ToneOZ-Pinyin-Kai-Traditional
`.trim().split('\n').map(font => font.trim());

function createTwfontsStyleElement() {
    twfontsStyleElement = document.createElement('style');
    twfontsStyleElement.id = 'dynamicFontStyle';
    document.head.appendChild(twfontsStyleElement);
}

function updateTwfontsStyles() {
    let styleRules = '';
    let topUrl = 'https://oikasu1.github.io/fonts/';
    twWebFonts.forEach(fontName => {
        const elements = document.getElementsByClassName(fontName);
        let text = pretwFonts; // 先加入預載入的文字;
        if (elements.length > 0) {
            text += Array.from(elements).map(el => el.textContent).join('');
        }
        if (text.length > 0) { // 只有當有文字要載入時才創建 @font-face 規則;
            const unicodeRange = [...new Set(text)].map(char => {
                const codePoint = char.codePointAt(0);
                return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
            }).join(', ');
            styleRules += `
                @font-face {
                    font-family: '${fontName}';
                    src: url('${topUrl}${fontName}.woff2') format('woff2'),
                         url('${topUrl}${fontName}.woff') format('woff');
                    unicode-range: ${unicodeRange};
                }
                .${fontName} {
                    font-family: '${fontName}';
                }
            `;
        }
    });
    twfontsStyleElement.textContent = styleRules;
}

// 初始化
createTwfontsStyleElement();
updateTwfontsStyles();