import { mount } from "@vue/test-utils"
import BaseMessage from "@/components/BaseMessage.vue";

test("BaseMessage.vue snapshot", () => {
  const wrapper = mount(BaseMessage, {
    props: {
      titleText: "Message title",
      closeable: true,
      show: true,
      color: "info"
    },
    slots: {
      default: `
        <p>Message contents!</p>
      `
    },
  });

  expect(wrapper.element).toMatchSnapshot();
})
