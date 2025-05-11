import { uuid58 } from "@nakanoaas/uuid58";
import { base58ToEmoji } from "./encode";

/**
 * Generates a new Emoji-encoded UUID.
 *
 * @returns A emoji-encoded string representing a newly generated UUID
 */
export function emoji(): string {
  const uuid = uuid58();
  return base58ToEmoji(uuid);
}
