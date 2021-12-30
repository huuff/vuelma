import { cloneVNode } from 'vue';

function recursivelyAddClass(element, classToAdd) {
  if (Array.isArray(element)) {
    return element.map(el => recursivelyAddClass(el, classToAdd));
  } else if (element.type.toString() === 'Symbol(Fragment)') {
    const clone = cloneVNode(element);
    clone.children = recursivelyAddClass(element.children, classToAdd)
    return clone;
  } else {
    return cloneVNode(element, { class: classToAdd });
  }
}

export default {
  props: {
    childrenClass: {
      type: String,
      required: true
    },
  },

  render() {
    const slot = this.$slots.default();

    return recursivelyAddClass(slot, this.$props.childrenClass);
  },
};
