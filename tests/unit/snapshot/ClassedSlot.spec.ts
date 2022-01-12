import { mount } from "@vue/test-utils";
import ClassedSlot from "@/components/slots/ClassedSlot";

test("ClassedSlot snapshot", () => {
  const wrapper = mount(ClassedSlot, {
    props: {
      childrenClass: "test-class",
    },
    slots: {
      default: `
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      `,
    },
  });
});
