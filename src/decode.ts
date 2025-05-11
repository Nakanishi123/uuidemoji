import { Uuid58DecodeError, uuid58DecodeSafe } from "@nakanoaas/uuid58";
import { BASE58_ALPHABET } from "./alphabet";
import { emojiMap } from "./emoji";

/**
 * 絵文字を正確に分割するためのセグメンター。
 * 日本語の文字単位（グラフェム）で分割します。
 */
const SEGMENTER = new Intl.Segmenter("ja-JP", {
  granularity: "grapheme",
});

/**
 * 絵文字デコード時のエラーを表すカスタムエラークラス。
 */
export class UuidEmojiDecodeError extends Error {
  static {
    this.prototype.name = "UuidEmojiDecodeError";
  }
}

/**
 * 絵文字をBase58文字列に変換します。
 *
 * @param {string} emoji - 変換対象の絵文字。
 * @returns {string | UuidEmojiDecodeError} Base58文字列、またはエラーオブジェクト。
 * @throws {UuidEmojiDecodeError} 無効な絵文字が渡された場合。
 */
function emojiToBase58(emoji: string): string | UuidEmojiDecodeError {
  let index = emojiMap[emoji];

  const max_index = BASE58_ALPHABET.length * (BASE58_ALPHABET.length + 1);
  if (index === undefined || max_index <= index)
    return new UuidEmojiDecodeError(`Invalid emoji '${emoji}' in input string`);

  let base58String = "";
  if (index >= BASE58_ALPHABET.length) {
    const charIndex = Math.floor(index / BASE58_ALPHABET.length) - 1;
    base58String = BASE58_ALPHABET[charIndex];
    index = index % BASE58_ALPHABET.length;
  }
  return BASE58_ALPHABET[index] + base58String;
}

/**
 * 絵文字を安全にUUID形式にデコードします。
 *
 * @param {string} emoji - デコード対象の絵文字列。
 * @returns {string | UuidEmojiDecodeError} UUID文字列、またはエラーオブジェクト。
 */
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

/**
 * 絵文字をUUID形式にデコードします。
 * エラーが発生した場合は例外をスローします。
 *
 * @param {string} emoji - デコード対象の絵文字列。
 * @returns {string} UUID文字列。
 * @throws {UuidEmojiDecodeError} デコードに失敗した場合。
 */
export function emojiDecode(emoji: string): string {
  const uuid58String = emojiDecodeSafe(emoji);
  if (uuid58String instanceof UuidEmojiDecodeError) {
    throw new UuidEmojiDecodeError(uuid58String.message);
  }
  return uuid58String;
}
