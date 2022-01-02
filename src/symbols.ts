import { InjectionKey } from 'vue';

export const PageKey: InjectionKey<() => number> = Symbol('Page');
export const GotoPageKey: InjectionKey<(page: number) => void> = Symbol('GotoPage');
export const SetActiveNavbarItemKey: InjectionKey<(itemId: string) => void> = Symbol("SetActiveNavbarItem")
export const ActiveNavbarItemKey: InjectionKey<() => (string | undefined)> = Symbol("ActiveNavbarItem")
