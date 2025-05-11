export const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
export const BASE58_ALPHABET_MAP = Object.fromEntries([...BASE58_ALPHABET].map((char, i) => [char, i]));
