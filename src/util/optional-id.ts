export interface OptionalId {
  titleText: string;
  itemId?: string;
}

export function getId(obj: OptionalId): string {
  return obj.itemId ?? obj.titleText;
}
