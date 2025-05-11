import { uuid58 } from "@nakanoaas/uuid58";
import { base58ToEmoji } from "./encode";

export function emoji(): string {
  const uuid = uuid58();
  return base58ToEmoji(uuid);
}
