import { mount } from "@vue/test-utils";
import BaseModal from "@/components/modal/BaseModal.vue";

test("BaseModal.vue snapshot", () => {
  const wrapper = mount(BaseModal, {
    props: {
      show: true,
      closeable: true,
    },
    slots: {
      default: `
        <p>Modal contents!</p> 
      `,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
