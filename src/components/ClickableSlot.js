import { h } from 'vue';

export default {
  props: {
    fn: {
      type: Function,
      required: true
    }
  },

  render() {
    return h(
      'span',
      { 
        onClick: () => {
          this.$props.fn();
        }
      },
      this.$slots.default(),
    )
  }
}
