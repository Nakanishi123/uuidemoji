// scripts/generate-emoji.ts
function getEmojiList(text: string): string {
  const lines = text.split("\n");
  const emojis: string[] = [];

  for (const line_raw of lines) {
    const line = line_raw.trim();
    if (line.length === 0) continue; // Skip empty lines
    if (line.startsWith("#")) continue; // Skip comments
    if (line.indexOf("E16") !== -1) continue; // Skip emoji added in unicode 16

    const [code, description] = line.split(";");
    if (!description.trim().startsWith("fully-qualified")) continue;
    const codePoints = code
      .split(" ")
      .filter((c) => c.trim() !== "")
      .map((c) => `\\u{${c.trim()}}`);
    emojis.push(`"${codePoints.join("")}"`);
  }
  const emojiListString = `export const emojiList = [${emojis.join(",")}];`;
  const emojiMapString = "export const emojiMap = Object.fromEntries(emojiList.map((emoji) => [emoji, emoji]))";
  return `${emojiListString}\n${emojiMapString}`;
}

const inputPath = "./emoji-test.txt";
const outputPath = "./emoji2.ts";

const text = await Bun.file(inputPath).text();
const output = getEmojiList(text);

await Bun.write(outputPath, output);
