function getColorForBackground(hexColor) {
    const R = getRGBFromHex(hexColor, "R");
    const G = getRGBFromHex(hexColor, "G");
    const B = getRGBFromHex(hexColor, "B");
    const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
  
    return luminance > 0.5 ? "#000" : "#fff";
  }
  
  const getRGBFromHex = (h, c) => {
    let start = 0;
    let end = 2;
  
    switch (c) {
      case "R":
        start = 0;
        end = 2;
        break;
      case "G":
        start = 2;
        end = 4;
        break;
      case "B":
        start = 4;
        end = 6;
        break;
      default:
        break;
    }
  
    return parseInt(cutHex(h).substring(start, end), 16);
  };
  
  const cutHex = h => {
    return h.charAt(0) === "#" ? h.substring(1, 7) : h;
  };
  
  export default getColorForBackground;
  