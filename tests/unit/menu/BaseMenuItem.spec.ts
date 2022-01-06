import { mount } from '@vue/test-utils';
import BaseMenuItem from '@/components/menu/BaseMenuItem.vue';

const testId = "testid";
const mockActiveItem = {
  getActiveMenuItem: jest.fn(() => testId),
  setActiveMenuItem: jest.fn(),
};

describe('BaseMenuItem.vue', () => {
  test("it contains the title", () => {
    const title = "Test title";
    const wrapper = mount(BaseMenuItem, {
      props: { title, itemId: testId },
      global: { provide: mockActiveItem },
    });

    expect(wrapper.text()).toBe(title);
  });

  test("it is active when the active id is the same as its own", () => {
    const wrapper = mount(BaseMenuItem, {
      props: { title: "test", itemId: testId },
      global: { provide: mockActiveItem },
    });

    expect(wrapper.get('a').element.classList).toContain("is-active");
  });

  test("clicking it tries to set the active menu item", async () => {
    const differentTestId = "differentid"
    const wrapper = mount(BaseMenuItem, {
      props: { title: "Test", itemId: differentTestId },
      global: { provide: mockActiveItem },
    });

    await wrapper.find("a").trigger("click");
    expect(mockActiveItem.setActiveMenuItem).toHaveBeenCalledOnce();
    expect(mockActiveItem.setActiveMenuItem).toHaveBeenCalledWith(differentTestId);
  });
})
