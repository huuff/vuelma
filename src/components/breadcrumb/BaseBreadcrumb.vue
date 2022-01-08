<template>
<nav 
  :class="{
    'breadcrumb': true,
    [`is-${alignment}`]: alignment !== 'left',
    [`has-${separator}-separator`]: separator,
  }"
  aria-label="breadcrumbs"
>
  <ul>
    <render-items />
  </ul>
</nav>
</template>

<script setup lang="ts">
// TODO: Icons
import { toRef, useSlots, h } from "vue";
import { useOptionalTwoWayBinding } from '@/composables/optional-two-way-binding';
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem.vue';
import partial from "lodash/partial";
import {getId} from "@/util/optional-id";
import classnames from "classnames";
import { unwrapFragment } from "@/util/unwrap-fragment";
import { Alignment } from "@/types/alignment";

export type BreadcrumbSeparator = "arrow" | "bullet" | "dot" | "succeeds";

const props = withDefaults(defineProps<{
  activeItemId?: string;
  alignment?: Alignment;
  separator?: BreadcrumbSeparator;
}>(), {
  alignment: "left",
});

const emit = defineEmits<{
  (event: "update:activeItemId", itemId?: string): void;
}>();

const actualActiveItemId = useOptionalTwoWayBinding(undefined, toRef(props, "activeItemId"), partial(emit, "update:activeItemId"));

const slots = useSlots();
const renderItems = () => slots.default && unwrapFragment(slots.default()).map(node => {
  if (node.type !== BreadcrumbItem) {
    throw new Error("The children of a BaseBreadcrumb must be BreadcrumbItems!");
  }
  const itemProps = node.props as BreadcrumbItemProps;
  const itemId = getId(itemProps);

  const isActive = () => actualActiveItemId.value === itemId;
  return h("li",
    {
      class: classnames({
        "is-active": isActive(),
      })
    },
    {
      // eslint-disable-next-line
      // @ts-ignore
      default: () => [h(itemProps.tag ?? "a",
        {...itemProps,
          class: node.props?.class,
          onClick: () => actualActiveItemId.value = itemId,
          ...(isActive() ? { "aria-current": "page"} : {})
        },
        { default: () => [itemProps.titleText] },
      )],
    }
  )
})
</script>
