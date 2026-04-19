import { StructCodec } from "../Types";

export const boolArrayCodec: StructCodec<boolean[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const wordCount = (count + 31) >>> 5;
    const values: boolean[] = new Array<boolean>(count);

    for (let i = 0; i < wordCount; i++) {
      const word = view.getUint32(offset + 4 + i * 4, true);

      for (let bit = 0; bit < 32; bit++) {
        const valueIndex = i * 32 + bit;
        if (valueIndex >= count) {
          break;
        }

        values[valueIndex] = (word & (1 << bit)) !== 0;
      }
    }

    return values;
  },
  write: (view, offset, value) => {
    const count = value.length;
    const wordCount = (count + 31) >>> 5;
    const bitsOffset = offset + 4;

    view.setUint32(offset, count, true);
    for (let i = 0; i < wordCount; i++) {
      const base = i * 32;
      let word = 0;

      for (let bit = 0; bit < 32; bit++) {
        const valueIndex = base + bit;
        if (valueIndex >= count) {
          break;
        }

        if (value[valueIndex]) {
          word |= 1 << bit;
        }
      }

      view.setUint32(bitsOffset + i * 4, word >>> 0, true);
    }
  },
};
