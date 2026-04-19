// src/MurmurHash3.ts
var C1 = 3432918353;
var C2 = 461845907;
function hash(key, seed = 0) {
  const bytes = encodeUtf8(key);
  let h1 = seed >>> 0;
  const length = bytes.length;
  const roundedEnd = length & ~3;
  for (let i = 0; i < roundedEnd; i += 4) {
    let k12 = bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16 | bytes[i + 3] << 24;
    k12 = Math.imul(k12, C1);
    k12 = rotl32(k12, 15);
    k12 = Math.imul(k12, C2);
    h1 ^= k12;
    h1 = rotl32(h1, 13);
    h1 = Math.imul(h1, 5) + 3864292196 | 0;
  }
  let k1 = 0;
  const tail = length & 3;
  const tailStart = roundedEnd;
  if (tail === 3) {
    k1 ^= bytes[tailStart + 2] << 16;
  }
  if (tail >= 2) {
    k1 ^= bytes[tailStart + 1] << 8;
  }
  if (tail >= 1) {
    k1 ^= bytes[tailStart];
    k1 = Math.imul(k1, C1);
    k1 = rotl32(k1, 15);
    k1 = Math.imul(k1, C2);
    h1 ^= k1;
  }
  h1 ^= length;
  h1 = fmix32(h1);
  return h1 >>> 0;
}
function encodeUtf8(value) {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(value);
  }
  const bytes = [];
  for (let i = 0; i < value.length; i++) {
    let c = value.charCodeAt(i);
    if (c < 128) {
      bytes.push(c);
      continue;
    }
    if (c < 2048) {
      bytes.push(192 | c >> 6);
      bytes.push(128 | c & 63);
      continue;
    }
    if (c >= 55296 && c <= 56319 && i + 1 < value.length) {
      const c2 = value.charCodeAt(i + 1);
      if (c2 >= 56320 && c2 <= 57343) {
        i++;
        const cp = (c - 55296) * 1024 + (c2 - 56320) + 65536;
        bytes.push(240 | cp >> 18);
        bytes.push(128 | cp >> 12 & 63);
        bytes.push(128 | cp >> 6 & 63);
        bytes.push(128 | cp & 63);
        continue;
      }
    }
    bytes.push(224 | c >> 12);
    bytes.push(128 | c >> 6 & 63);
    bytes.push(128 | c & 63);
  }
  return new Uint8Array(bytes);
}
function rotl32(value, shift) {
  return value << shift | value >>> 32 - shift;
}
function fmix32(h) {
  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  return h;
}
export {
  hash
};
