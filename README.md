# gamedatalib

A library for parsing and editing Nintendo gamedata binary save files
## Install

```bash
npm i gamedatalib
```

## How to for dummies

```ts
import fs from "node:fs";
import { GameData, hash } from "gamedatalib";

const file = fs.readFileSync("mii.sav");
const data = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
const save = GameData.fromArrayBuffer(data);

const miiNameSection = save.WString32Array[hash("Mii.Name.Name")];
miiNameSection.setValueAt(0, "Blah")

const dataOut = GameData.toArrayBuffer(save);
fs.writeFileSync("miiOut.sav", Buffer.from(dataOut));

```

## Creating a new file from scratch

Start with a new `GameData` instance, add entries via `addNew`, then serialize with `toArrayBuffer`.

```ts
import fs from "node:fs";
import { GameData, hash } from "gamedatalib";

const save = new GameData();

save.Int.addNew(hash("Player.Level"), 42);
save.BoolArray.addNew(hash("Player.Flags"), [true, false, true]);
save.WString32.addNew(hash("Player.Name"), "Alex");

const out = GameData.toArrayBuffer(save);
fs.writeFileSync("new.sav", Buffer.from(out));
```

## Struct entries

```ts
// scalar
const enabled = save.Int[hash("Field.Scalar")];
enabled.setValue(1);

// array
const names = save.WString32Array[hash("Field.Array")];
names.setValueAt(0, "Name")
```

## Hash keys

Entries are keyed by MurmurHash3 32-bit of the original field name.

```ts
const key = hash("Key.Name"); // 0xAA79FCCC
const entry = save.WString32Array[key];
```
