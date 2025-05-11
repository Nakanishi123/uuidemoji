import { describe, expect, it } from "bun:test";
import { emoji, emojiDecode, emojiEncode } from "../src";

describe("should", () => {
  it("encode decode", () => {
    const emojiString = emoji();
    const decoded = emojiDecode(emojiString);
    const encoded = emojiEncode(decoded);
    expect(emojiString).toBe(encoded);
  });
});
