import { StructCodec, Vector2 as Vector2Type } from "../Types";

const VECTOR2_SIZE = 8;

export const vector2ArrayCodec: StructCodec<Vector2Type[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values: Vector2Type[] = [];
    let cursor = offset + 4;

    for (let i = 0; i < count; i += 1) {
      values.push({
        x: view.getFloat32(cursor, true),
        y: view.getFloat32(cursor + 4, true),
      });
      cursor += VECTOR2_SIZE;
    }

    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;

    for (const vector of value) {
      view.setFloat32(cursor, vector.x, true);
      view.setFloat32(cursor + 4, vector.y, true);
      cursor += VECTOR2_SIZE;
    }
  },
  byteLength: (value) => 4 + value.length * VECTOR2_SIZE,
};
