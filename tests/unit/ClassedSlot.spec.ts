import { mount } from "@vue/test-utils";
import ClassedSlot from '@/components/slots/ClassedSlot';

describe("ClassedSlot.js", () => {
  test("the class gets added to all children", () => {
    const childrenClass = "testclass";
    const wrapper = mount(ClassedSlot, {
      props: { childrenClass },
      slots: {
        default: `
          <p>Element 1</p>
          <p>Element 2</p>
          <p>Element 3</p>
        `,
      },
    })

    const nodes = wrapper.findAll("p");
    expect(nodes.length).toBe(3);
    for (const node of nodes) {
      expect(node.element.classList).toContain(childrenClass);
    }
  });
});
