import { mount } from '@vue/test-utils';
import BaseMenuItem from '@/components/menu/BaseMenuItem.vue';

const testId = "testid";
const mockActiveItem = {
  getActiveMenuItem: jest.fn(() => testId),
  setActiveMenuItem: jest.fn(),
};

describe('BaseMenuItem.vue', () => {
  test("it contains the titleText", () => {
    const titleText = "Test titleText";
    const wrapper = mount(BaseMenuItem, {
      props: { titleText, itemId: testId },
      global: { provide: mockActiveItem },
    });

    expect(wrapper.text()).toBe(titleText);
  });

  test("it is active when the active id is the same as its own", () => {
    const wrapper = mount(BaseMenuItem, {
      props: { titleText: "test", itemId: testId },
      global: { provide: mockActiveItem },
    });

    expect(wrapper.get('a').element.classList).toContain("is-active");
  });

  test("clicking it tries to set the active menu item", async () => {
    const differentTestId = "differentid"
    const wrapper = mount(BaseMenuItem, {
      props: { titleText: "Test", itemId: differentTestId },
      global: { provide: mockActiveItem },
    });

    await wrapper.find("a").trigger("click");
    expect(mockActiveItem.setActiveMenuItem).toHaveBeenCalledOnce();
    expect(mockActiveItem.setActiveMenuItem).toHaveBeenCalledWith(differentTestId);
  });
})
