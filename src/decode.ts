import { Uuid58DecodeError, uuid58DecodeSafe } from "@nakanoaas/uuid58";
import { BASE58_ALPHABET } from "./alphabet";
import { emojiMap } from "./emoji";

const SEGMENTER = new Intl.Segmenter("ja-JP", {
  granularity: "grapheme",
});

export class UuidEmojiDecodeError extends Error {
  static {
    this.prototype.name = "UuidEmojiDecodeError";
  }
}

function emojiToBase58(emoji: string): string | UuidEmojiDecodeError {
  let index = emojiMap[emoji];
  if (index === undefined || 3421 < index) return new UuidEmojiDecodeError(`Invalid emoji '${emoji}' in input string`);

  let base58String = "";
  if (index >= BASE58_ALPHABET.length) {
    const charIndex = Math.floor(index / BASE58_ALPHABET.length) - 1;
    base58String = BASE58_ALPHABET[charIndex];
    index = index % BASE58_ALPHABET.length;
  }
  return BASE58_ALPHABET[index] + base58String;
}

export function emojiDecodeSafe(emoji: string): string | UuidEmojiDecodeError {
  let uuid58String = "";
  for (const emojiSegment of SEGMENTER.segment(emoji)) {
    const base58 = emojiToBase58(emojiSegment.segment);
    if (base58 instanceof UuidEmojiDecodeError) {
      return new UuidEmojiDecodeError(base58.message);
    }
    uuid58String += base58;
  }

  const uuidString = uuid58DecodeSafe(uuid58String);
  if (uuidString instanceof Uuid58DecodeError) {
    return new UuidEmojiDecodeError(uuidString.message);
  }

  return uuidString;
}

export function emojiDecode(emoji: string): string {
  const uuid58String = emojiDecodeSafe(emoji);
  if (uuid58String instanceof UuidEmojiDecodeError) {
    throw new UuidEmojiDecodeError(uuid58String.message);
  }
  return uuid58String;
}
