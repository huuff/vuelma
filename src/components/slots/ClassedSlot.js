import { cloneVNode } from 'vue';

// FUTURE: Wish I could type this but it's extremely hard for me
function recursivelyAddClass(element, classToAdd, excluded) {
  if (Array.isArray(element)) {
    return element.map(el => recursivelyAddClass(el, classToAdd, excluded));
  } else if (element.type.toString() === 'Symbol(Fragment)') {
    const clone = cloneVNode(element);
    clone.children = recursivelyAddClass(element.children, classToAdd, excluded)
    return clone;
  } else {
    if (!excluded || !excluded.includes(element.type))
      return cloneVNode(element, { class: classToAdd });
    else
      return element;
  }
}

export default {
  props: {
    childrenClass: {
      type: String,
      required: true
    },
    excludedElements: { // Do not apply the class to these elements
      type: Array
    },
  },

  render() {
    const slot = this.$slots.default();

    return recursivelyAddClass(slot, this.$props.childrenClass);
  },
};
