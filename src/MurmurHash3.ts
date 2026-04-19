const C1 = 0xcc9e2d51;
const C2 = 0x1b873593;

export function hash(key: string, seed = 0): number {
  const bytes = encodeUtf8(key);
  let h1 = seed >>> 0;
  const length = bytes.length;
  const roundedEnd = length & ~0x03;

  for (let i = 0; i < roundedEnd; i += 4) {
    let k1 =
      bytes[i] |
      (bytes[i + 1] << 8) |
      (bytes[i + 2] << 16) |
      (bytes[i + 3] << 24);

    k1 = Math.imul(k1, C1);
    k1 = rotl32(k1, 15);
    k1 = Math.imul(k1, C2);

    h1 ^= k1;
    h1 = rotl32(h1, 13);
    h1 = (Math.imul(h1, 5) + 0xe6546b64) | 0;
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

function encodeUtf8(value: string): Uint8Array {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(value);
  }

  const bytes: number[] = [];
  for (let i = 0; i < value.length; i++) {
    let c = value.charCodeAt(i);

    if (c < 0x80) {
      bytes.push(c);
      continue;
    }
    if (c < 0x800) {
      bytes.push(0xc0 | (c >> 6));
      bytes.push(0x80 | (c & 0x3f));
      continue;
    }
    if (c >= 0xd800 && c <= 0xdbff && i + 1 < value.length) {
      const c2 = value.charCodeAt(i + 1);
      if (c2 >= 0xdc00 && c2 <= 0xdfff) {
        i++;
        const cp = (c - 0xd800) * 0x400 + (c2 - 0xdc00) + 0x10000;
        bytes.push(0xf0 | (cp >> 18));
        bytes.push(0x80 | ((cp >> 12) & 0x3f));
        bytes.push(0x80 | ((cp >> 6) & 0x3f));
        bytes.push(0x80 | (cp & 0x3f));
        continue;
      }
    }

    bytes.push(0xe0 | (c >> 12));
    bytes.push(0x80 | ((c >> 6) & 0x3f));
    bytes.push(0x80 | (c & 0x3f));
  }

  return new Uint8Array(bytes);
}

function rotl32(value: number, shift: number): number {
  return (value << shift) | (value >>> (32 - shift));
}

function fmix32(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h;
}
