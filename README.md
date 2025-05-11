# uuidemoji

[![npm](https://badge.fury.io/js/uuidemoji.svg)](https://badge.fury.io/js/uuidemoji)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A tiny library for generating and converting UUIDs encoded with emojis.  
Make your identifiers shorter, more fun, and visually appealing!

## Installation

Using npm:

```bash
npm install uuidemoji
```

Using yarn:

```bash
yarn add uuidemoji
```
Using pnpm:

```bash
pnpm add uuidemoji
```

Using bun:

```bash
bun add uuidemoji
```

## Usage

```typescript
import { emoji, emojiDecode, emojiEncode } from "uuidemoji";

// Generate a new emoji-encoded UUID
const id = emoji();
console.log(id); // 💇🏽🙇🏼‍♀️👨🏾‍🔬🙎🏽‍♀️🌰💮🚶🏾‍➡️🧀☠️🎧👨🏼‍💼

// Encode an existing UUID to emojis
const encoded = emojiEncode("f4b247fd-1f87-45d4-aa06-1c6fc0a8dfad");
console.log(encoded); // 🧏🏼‍♀️🧔🏿‍♀️🧆🤹🏻‍♂️🧕🏽🧗🏼‍♂️👩🏻‍🤝‍👨🏽🧾🔩🪠♂️

// Decode emojis back to a UUID
const decoded = emojiDecode("🧏🏼‍♀️🧔🏿‍♀️🧆🤹🏻‍♂️🧕🏽🧗🏼‍♂️👩🏻‍🤝‍👨🏽🧾🔩🪠♂️");
console.log(decoded); // f4b247fd-1f87-45d4-aa06-1c6fc0a8dfad

import { emojiDecodeSafe, emojiEncodeSafe, UuidEmojiDecodeError, UuidEmojiEncodeError } from "uuidemoji";

// Safe encoding: returns an error object instead of throwing
const encodedSafe = emojiEncodeSafe("f4b247fd-1f87-45d4-aa06-1c6fc0a8dfad");
if (encodedSafe instanceof UuidEmojiEncodeError) {
  console.error(encodedSafe.message);
}
console.log(encodedSafe);

// Safe decoding: returns an error object instead of throwing
const decodedSafe = emojiDecodeSafe("🧏🏼‍♀️🧔🏿‍♀️🧆🤹🏻‍♂️🧕🏽🧗🏼‍♂️👩🏻‍🤝‍👨🏽🧾🔩🪠♂️");
if (decodedSafe instanceof UuidEmojiDecodeError) {
  console.error(decodedSafe.message);
}
console.log(decodedSafe);
```

## Inspired by

Inspired by [uuid58](https://github.com/nakanoasaservice/uuid58)

License: [MIT](https://github.com/nakanoasaservice/uuid58/tree/main?tab=MIT-1-ov-file#readme)

## License

see [package.json](https://github.com/Nakanishi123/uuidemoji/blob/master/package.json)
