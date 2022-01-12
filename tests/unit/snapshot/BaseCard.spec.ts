import { mount } from "@vue/test-utils";
import BaseCard from "@/components/BaseCard.vue";

test("BaseCard.vue snapshot", () => {
  const wrapper = mount(BaseCard, {
    props: {
      titleText: "Card Title",
      image: "testimg",
      icon: "heart"
    },
    global: {
      stubs: [ "font-awesome-icon" ],
    },
    slots: {
      default: `
        <p>Content of the card body</p>
      `,
      footerItems: `
        <a>Footer item 1</a>
        <a>Footer item 2</a>
        <a>Footer item 3</a>
      `
    }
  });

  expect(wrapper.element).toMatchSnapshot();
});
