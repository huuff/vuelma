export interface OptionalId {
  text: string;
  itemId?: string;
}

export function getId(obj: OptionalId): string {
  return obj.itemId ?? obj.text;
}
