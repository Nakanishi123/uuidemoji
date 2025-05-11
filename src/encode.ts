import { Uuid58EncodeError, uuid58EncodeSafe } from "@nakanoaas/uuid58";
import { BASE58_ALPHABET, BASE58_ALPHABET_MAP } from "./alphabet";
import { emojiList } from "./emoji";

export class UuidEmojiEncodeError extends Error {
  static {
    this.prototype.name = "UuidEmojiEncodeError";
  }
}

function base58CharToEmoji(base58: string): string {
  if (base58.length === 0) throw new Error("Input string is empty");
  if (base58.length > 2) throw new Error("Input string is too long");

  let number;
  if (base58.length === 2) {
    number = BASE58_ALPHABET_MAP[base58[0]] + (BASE58_ALPHABET_MAP[base58[1]] + 1) * BASE58_ALPHABET.length;
  } else {
    number = BASE58_ALPHABET_MAP[base58[0]];
  }

  return emojiList[number];
}

export function base58ToEmoji(base58: string): string {
  const matches = base58.match(/.{1,2}/g);
  if (!matches) throw new Error("Failed to match base58 string segments");
  return matches.map(base58CharToEmoji).join("");
}

export function emojiEncodeSafe(uuid: string): string | UuidEmojiEncodeError {
  const base58 = uuid58EncodeSafe(uuid);
  if (base58 instanceof Uuid58EncodeError) return new UuidEmojiEncodeError(base58.message);

  return base58ToEmoji(base58);
}

export function emojiEncode(uuid: string): string {
  const emoji = emojiEncodeSafe(uuid);
  if (emoji instanceof UuidEmojiEncodeError) throw new UuidEmojiEncodeError(emoji.message);
  return emoji;
}
