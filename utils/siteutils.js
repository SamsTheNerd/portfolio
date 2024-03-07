const fs = require('node:fs');
const nunjucks = require("nunjucks")

// returns a url(..) string
var makeHeartBGSVG = (backColor, heartColor, heartShadowColor) => {
    var svgString = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-1{fill:${backColor};}.cls-2{fill:${heartShadowColor};}.cls-3{fill:none;}.cls-4{fill:${heartColor};}</style></defs><rect id="BackFitted" class="cls-1" width="512" height="512"/><path class="cls-2" d="M405.3333,248.76a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7392,54.8609,62.1861,77.0812a1.9959,1.9959,0,0,0,3.6279,0C353.5942,303.6208,405.3333,272.2786,405.3333,248.76Z"/><path class="cls-2" d="M480,216.9956A31.8828,31.8828,0,0,0,448,248.76c0,23.5187,51.7392,54.8609,62.186,77.0812A1.9835,1.9835,0,0,0,512,327.0043V248.76A31.8828,31.8828,0,0,0,480,216.9956Z"/><path class="cls-2" d="M1.814,325.8411C12.2608,303.6208,64,272.2786,64,248.76a32.0009,32.0009,0,0,0-64,0v78.2444A1.9834,1.9834,0,0,0,1.814,325.8411Z"/><path class="cls-2" d="M234.6667,248.76a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7391,54.8609,62.186,77.0812a1.9959,1.9959,0,0,0,3.6279,0C182.9275,303.6208,234.6667,272.2786,234.6667,248.76Z"/><path class="cls-2" d="M458.6667,344.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7391,54.8609,62.186,77.0812a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.1861-53.5625,62.1861-77.0812A31.8828,31.8828,0,0,0,458.6667,344.9956Z"/><path class="cls-2" d="M117.3333,344.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7392,54.8609,62.1861,77.0812a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.186-53.5625,62.186-77.0812A31.8828,31.8828,0,0,0,117.3333,344.9956Z"/><path class="cls-2" d="M288,344.9956A31.8828,31.8828,0,0,0,256,376.76a32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7392,54.8609,62.186,77.0812a1.996,1.996,0,0,0,3.628,0C268.2608,431.6208,320,400.2786,320,376.76A31.8828,31.8828,0,0,0,288,344.9956Z"/><path class="cls-2" d="M424.8527,197.8411a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.1861-53.5625,62.1861-77.0812a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0C362.6667,144.2786,414.4058,175.6208,424.8527,197.8411Z"/><path class="cls-2" d="M83.5194,197.8411a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.186-53.5625,62.186-77.0812a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0C21.3333,144.2786,73.0725,175.6208,83.5194,197.8411Z"/><path class="cls-2" d="M254.186,197.8411a1.996,1.996,0,0,0,3.628,0C268.2608,175.6208,320,144.2786,320,120.76a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0C192,144.2786,243.7392,175.6208,254.186,197.8411Z"/><path class="cls-2" d="M339.5194,69.8411a1.9959,1.9959,0,0,0,3.6279,0C352.5543,49.8326,395.4349,22.4289,403.88,0H278.7867C287.2318,22.4289,330.1124,49.8326,339.5194,69.8411Z"/><path class="cls-2" d="M510.186,69.8411A1.9835,1.9835,0,0,0,512,71.0043V0H449.4534C457.8984,22.4289,500.7791,49.8326,510.186,69.8411Z"/><path class="cls-2" d="M1.814,69.8411C11.2209,49.8326,54.1016,22.4289,62.5466,0H0V71.0043A1.9834,1.9834,0,0,0,1.814,69.8411Z"/><path class="cls-2" d="M168.8527,69.8411a1.9959,1.9959,0,0,0,3.6279,0C181.8876,49.8326,224.7682,22.4289,233.2133,0H108.12C116.5651,22.4289,159.4457,49.8326,168.8527,69.8411Z"/><path class="cls-2" d="M373.3333,472.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0,20.6146,20.6146,0,0,0,1.4534,7.24H403.88a20.6146,20.6146,0,0,0,1.4534-7.24A31.8828,31.8828,0,0,0,373.3333,472.9956Z"/><path class="cls-2" d="M480,472.9956A31.8828,31.8828,0,0,0,448,504.76a20.6146,20.6146,0,0,0,1.4534,7.24H512v-7.24A31.8828,31.8828,0,0,0,480,472.9956Z"/><path class="cls-2" d="M32,472.9956A31.8828,31.8828,0,0,0,0,504.76V512H62.5466A20.6146,20.6146,0,0,0,64,504.76,31.8828,31.8828,0,0,0,32,472.9956Z"/><path class="cls-2" d="M202.6667,472.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0A20.6146,20.6146,0,0,0,108.12,512H233.2133a20.6146,20.6146,0,0,0,1.4534-7.24A31.8828,31.8828,0,0,0,202.6667,472.9956Z"/><path class="cls-3" d="M510.186,309.8411C499.7392,287.6208,448,256.2786,448,232.76a32.0009,32.0009,0,0,1,64,0V55.0043a1.9835,1.9835,0,0,1-1.814-1.1632C502.9277,38.4028,475.7409,18.5617,459.8187,0H393.5146c-15.9222,18.5617-43.109,38.4028-50.3673,53.8411a1.9959,1.9959,0,0,1-3.6279,0C332.2611,38.4028,305.0742,18.5617,289.152,0H222.848c-15.9222,18.5617-43.1091,38.4028-50.3674,53.8411a1.9959,1.9959,0,0,1-3.6279,0C161.5944,38.4028,134.4076,18.5617,118.4854,0H52.1813C36.2591,18.5617,9.0723,38.4028,1.814,53.8411A1.9834,1.9834,0,0,1,0,55.0043V232.76a32.0009,32.0009,0,0,1,64,0c0,23.5187-51.7392,54.8609-62.186,77.0812A1.9834,1.9834,0,0,1,0,311.0043V488.76a32.0009,32.0009,0,0,1,64,0c0,7.1783-4.8241,15.0859-11.8187,23.24h66.3041c-6.9946-8.1542-11.8187-16.0618-11.8187-23.24a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0c0,7.1783-4.8241,15.0859-11.8187,23.24h66.304c-6.9946-8.1542-11.8187-16.0618-11.8187-23.24a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0c0,7.1783-4.8241,15.0859-11.8187,23.24h66.3041C452.8241,503.8458,448,495.9382,448,488.76a32.0009,32.0009,0,0,1,64,0V311.0043A1.9835,1.9835,0,0,1,510.186,309.8411ZM394.6667,72.9956a31.8828,31.8828,0,0,1,32,31.7643,32.0009,32.0009,0,0,1,64,0c0,23.5187-51.7392,54.8609-62.1861,77.0812a1.9959,1.9959,0,0,1-3.6279,0c-10.4469-22.22-62.186-53.5625-62.186-77.0812A31.8828,31.8828,0,0,1,394.6667,72.9956ZM224,72.9956A31.8828,31.8828,0,0,1,256,104.76a32.0009,32.0009,0,0,1,64,0c0,23.5187-51.7392,54.8609-62.186,77.0812a1.996,1.996,0,0,1-3.628,0C243.7392,159.6208,192,128.2786,192,104.76A31.8828,31.8828,0,0,1,224,72.9956ZM21.3333,104.76a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0c0,23.5187-51.7391,54.8609-62.186,77.0812a1.9959,1.9959,0,0,1-3.6279,0C73.0725,159.6208,21.3333,128.2786,21.3333,104.76Zm65.814,333.0812a1.9959,1.9959,0,0,1-3.6279,0c-10.4469-22.22-62.1861-53.5625-62.1861-77.0812a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0C149.3333,384.2786,97.5942,415.6208,87.1473,437.8411Zm85.3333-128a1.9959,1.9959,0,0,1-3.6279,0c-10.4469-22.22-62.186-53.5625-62.186-77.0812a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0C234.6667,256.2786,182.9275,287.6208,172.4806,309.8411Zm85.3334,128a1.996,1.996,0,0,1-3.628,0C243.7392,415.6208,192,384.2786,192,360.76a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0C320,384.2786,268.2608,415.6208,257.814,437.8411Zm85.3333-128a1.9959,1.9959,0,0,1-3.6279,0c-10.4469-22.22-62.1861-53.5625-62.1861-77.0812a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0C405.3333,256.2786,353.5942,287.6208,343.1473,309.8411Zm85.3333,128a1.9959,1.9959,0,0,1-3.6279,0c-10.4469-22.22-62.186-53.5625-62.186-77.0812a32.0009,32.0009,0,0,1,64,0,32.0009,32.0009,0,0,1,64,0C490.6667,384.2786,438.9275,415.6208,428.4806,437.8411Z"/><path class="cls-4" d="M405.3333,232.76a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7392,54.8609,62.1861,77.0812a1.9959,1.9959,0,0,0,3.6279,0C353.5942,287.6208,405.3333,256.2786,405.3333,232.76Z"/><path class="cls-4" d="M480,200.9956A31.8828,31.8828,0,0,0,448,232.76c0,23.5187,51.7392,54.8609,62.186,77.0812A1.9835,1.9835,0,0,0,512,311.0043V232.76A31.8828,31.8828,0,0,0,480,200.9956Z"/><path class="cls-4" d="M1.814,309.8411C12.2608,287.6208,64,256.2786,64,232.76a32.0009,32.0009,0,0,0-64,0v78.2444A1.9834,1.9834,0,0,0,1.814,309.8411Z"/><path class="cls-4" d="M234.6667,232.76a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7391,54.8609,62.186,77.0812a1.9959,1.9959,0,0,0,3.6279,0C182.9275,287.6208,234.6667,256.2786,234.6667,232.76Z"/><path class="cls-4" d="M458.6667,328.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7391,54.8609,62.186,77.0812a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.1861-53.5625,62.1861-77.0812A31.8828,31.8828,0,0,0,458.6667,328.9956Z"/><path class="cls-4" d="M117.3333,328.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7392,54.8609,62.1861,77.0812a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.186-53.5625,62.186-77.0812A31.8828,31.8828,0,0,0,117.3333,328.9956Z"/><path class="cls-4" d="M288,328.9956A31.8828,31.8828,0,0,0,256,360.76a32.0009,32.0009,0,0,0-64,0c0,23.5187,51.7392,54.8609,62.186,77.0812a1.996,1.996,0,0,0,3.628,0C268.2608,415.6208,320,384.2786,320,360.76A31.8828,31.8828,0,0,0,288,328.9956Z"/><path class="cls-4" d="M424.8527,181.8411a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.1861-53.5625,62.1861-77.0812a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0C362.6667,128.2786,414.4058,159.6208,424.8527,181.8411Z"/><path class="cls-4" d="M83.5194,181.8411a1.9959,1.9959,0,0,0,3.6279,0c10.4469-22.22,62.186-53.5625,62.186-77.0812a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0C21.3333,128.2786,73.0725,159.6208,83.5194,181.8411Z"/><path class="cls-4" d="M254.186,181.8411a1.996,1.996,0,0,0,3.628,0C268.2608,159.6208,320,128.2786,320,104.76a32.0009,32.0009,0,0,0-64,0,32.0009,32.0009,0,0,0-64,0C192,128.2786,243.7392,159.6208,254.186,181.8411Z"/><path class="cls-4" d="M339.5194,53.8411a1.9959,1.9959,0,0,0,3.6279,0C350.4056,38.4028,377.5924,18.5617,393.5146,0H289.152C305.0742,18.5617,332.2611,38.4028,339.5194,53.8411Z"/><path class="cls-4" d="M510.186,53.8411A1.9835,1.9835,0,0,0,512,55.0043V0H459.8187C475.7409,18.5617,502.9277,38.4028,510.186,53.8411Z"/><path class="cls-4" d="M1.814,53.8411C9.0723,38.4028,36.2591,18.5617,52.1813,0H0V55.0043A1.9834,1.9834,0,0,0,1.814,53.8411Z"/><path class="cls-4" d="M168.8527,53.8411a1.9959,1.9959,0,0,0,3.6279,0C179.7389,38.4028,206.9258,18.5617,222.848,0H118.4854C134.4076,18.5617,161.5944,38.4028,168.8527,53.8411Z"/><path class="cls-4" d="M373.3333,456.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0c0,7.1783,4.8241,15.0859,11.8187,23.24H393.5146c6.9946-8.1542,11.8187-16.0618,11.8187-23.24A31.8828,31.8828,0,0,0,373.3333,456.9956Z"/><path class="cls-4" d="M480,456.9956A31.8828,31.8828,0,0,0,448,488.76c0,7.1783,4.8241,15.0859,11.8187,23.24H512V488.76A31.8828,31.8828,0,0,0,480,456.9956Z"/><path class="cls-4" d="M32,456.9956A31.8828,31.8828,0,0,0,0,488.76V512H52.1813C59.1759,503.8458,64,495.9382,64,488.76A31.8828,31.8828,0,0,0,32,456.9956Z"/><path class="cls-4" d="M202.6667,456.9956a31.8828,31.8828,0,0,0-32,31.7643,32.0009,32.0009,0,0,0-64,0c0,7.1783,4.8241,15.0859,11.8187,23.24H222.848c6.9946-8.1542,11.8187-16.0618,11.8187-23.24A31.8828,31.8828,0,0,0,202.6667,456.9956Z"/></svg>`;
    return `url('data:image/svg+xml;base64,${btoa(svgString)}')`
}

var getDescription = (descriptable) => {
    var descFile = `./static/data/descriptions/${descriptable.description || (descriptable.id + ".md")}`
    var rawDesc = fs.readFileSync(descFile, 'utf8');
    return nunjucks.renderString(rawDesc, descriptable);
}

module.exports = {
    "hbgSVG": makeHeartBGSVG,
    "getDesc": getDescription
}