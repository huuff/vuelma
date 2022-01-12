import { mount } from "@vue/test-utils";
import BaseModal from "@/components/modal/BaseModal.vue";
import CardModal from "@/components/modal/CardModal.vue";

test("CardModal.vue snapshot", () => {
  const wrapper = mount(BaseModal, {
    props: {
      show: true,
      closeable: true,
    }, 
    global: {
      components: { CardModal },
    },
    slots: {
      default: `
        <card-modal titleText="Card Modal Title">
          <template #default>
            <p>Card modal body</p>
          </template>
          <template #footer>
            <p>Card modal footer</p>
          </template>
        </card-modal>
      `,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
