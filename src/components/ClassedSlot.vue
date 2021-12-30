<template>
<render>
  <slot></slot>
</render>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

// TODO: Many problems, this would benefit from being a
// just JS file, but I can't get it to run.
// add some validations that the input slot is appropriate

// HACK: This feels so hacky on so many levels I can't believe it works
// TODO: At least test it until there are no issues I know of

// TODO: This doesn't give the jest error but STILL fails when devserver rerenders. Maybe try cloning the slot's vNode instead of modifying it?
const props = defineProps<{
  childrenClass: string;
}>();

// Will return the fragment that is the direct
// parent of the slot components (useful if there are
// nested slots)
function recurseIntoFragments(element: any): any {
  if (element.type.toString() === 'Symbol(Fragment)'
    && element.children[0].type.toString() === 'Symbol(Fragment)'
  ) {
    return recurseIntoFragments(element.children[0]);
  } else {
    return element;
  }
}

const render = () => {

  const slot = useSlots().default!();
  recurseIntoFragments(slot[0]).children.forEach((element: any) => {
    if (element.props?.class) {
      element.props.class += props.childrenClass;
    } else {
      element.props.class = props.childrenClass;
    }
  });

  return slot;
}
</script>
