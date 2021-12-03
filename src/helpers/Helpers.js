export function getMaxPageFromHeader(header) {
    if (!header.includes('rel="last"')) return 0;
    let tmp = header.split('rel="last"');
    if (!tmp[0]) return -1;
    tmp = tmp[0].split("<https://");
    tmp = tmp[tmp.length - 1];
    if (!tmp.includes("&page=")) return -1;
    tmp = tmp.split("&page=")[1];
    tmp = tmp.split("&");
    if (!tmp[0]) return -1;
    try {
      const max = parseInt(tmp[0], 10);
      return max;
    } catch (e) {
      return -1;
    }
  }
  