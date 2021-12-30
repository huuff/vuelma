function recurseIntoFragments(element) {
  if (element.type.toString() === 'Symbol(Fragment)'
    && element.children[0].type.toString() === 'Symbol(Fragment)'
  ) {
    return recurseIntoFragments(element.children[0]);
  } else {
    return element;
  }
}

// TODO: Can I make a new element instead of modifying it?
function appendClass(element, childrenClass) {
  if (element.props?.class && !element.props?.class.includes(childrenClass)) {
    element.props.class += ` ${childrenClass}`;
  } else {
    element.props.class = childrenClass;
  }

  return element;
}

export default {
  props: {
    childrenClass: {
      type: String,
      required: true
    }
  },

  render() {
    const slot = this.$slots.default();

    if (slot[0]?.type?.toString() === 'Symbol(Fragment)') {
      recurseIntoFragments(slot[0]).children.forEach(element => appendClass(element, this.$props.childrenClass));
    } else if (Array.isArray(slot)) {
      slot.forEach(element => appendClass(element, this.$props.childrenClass));
    }

    return slot;
  },
};
