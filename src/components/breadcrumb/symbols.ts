import { InjectionKey } from 'vue';

export const ActiveBreadcrumbItemKey: InjectionKey<() => string> = Symbol('ActiveBreadcrumbItem');
export const SetActiveBreadcrumbItemKey: InjectionKey<(newActive: string) => void> = Symbol('SetActiveBreadcrumbItem')
