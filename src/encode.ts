import { Uuid58EncodeError, uuid58EncodeSafe } from "@nakanoaas/uuid58";
import { BASE58_ALPHABET, BASE58_ALPHABET_MAP } from "./alphabet";
import { emojiList } from "./emoji";

/**
 * UuidEmojiEncodeError クラス
 * UUID を絵文字にエンコードする際のエラーを表します。
 */
export class UuidEmojiEncodeError extends Error {
  static {
    this.prototype.name = "UuidEmojiEncodeError";
  }
}

/**
 * Base58 文字列を絵文字に変換する関数
 *
 * @param base58 - Base58 形式の文字列(1 または 2 文字)
 * @returns 対応する絵文字
 * @throws Error - 入力文字列が空、または長すぎる場合
 */
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

/**
 * Base58 文字列全体を絵文字に変換する関数
 *
 * @param base58 - Base58 形式の文字列
 * @returns 絵文字に変換された文字列
 * @throws Error - Base58 文字列の分割に失敗した場合
 */
export function base58ToEmoji(base58: string): string {
  const matches = base58.match(/.{1,2}/g);
  if (!matches) throw new Error("Failed to match base58 string segments");
  return matches.map(base58CharToEmoji).join("");
}

/**
 * UUID を安全に絵文字にエンコードする関数
 *
 * @param uuid - UUID 文字列
 * @returns 絵文字にエンコードされた文字列、またはエラーオブジェクト
 */
export function emojiEncodeSafe(uuid: string): string | UuidEmojiEncodeError {
  const base58 = uuid58EncodeSafe(uuid);
  if (base58 instanceof Uuid58EncodeError) return new UuidEmojiEncodeError(base58.message);

  return base58ToEmoji(base58);
}

/**
 * UUID を絵文字にエンコードする関数
 *
 * @param uuid - UUID 文字列
 * @returns 絵文字にエンコードされた文字列
 * @throws UuidEmojiEncodeError - エンコードに失敗した場合
 */
export function emojiEncode(uuid: string): string {
  const emoji = emojiEncodeSafe(uuid);
  if (emoji instanceof UuidEmojiEncodeError) throw new UuidEmojiEncodeError(emoji.message);
  return emoji;
}
