import { mount } from '@vue/test-utils';
import BaseMenuItem from '@/components/menu/BaseMenuItem.vue';

const TEST_ID = "testid";
const MOCK_ACTIVE_ITEM = {
  getActiveMenuItem: jest.fn(() => TEST_ID),
  setActiveMenuItem: jest.fn(),
};

describe('BaseMenuItem.vue', () => {
  test("it contains the title", () => {
    const title = "Test title";
    const wrapper = mount(BaseMenuItem, {
      props: { title, itemId: TEST_ID },
      global: { provide: MOCK_ACTIVE_ITEM },
    });

    expect(wrapper.text()).toBe(title);
  });

  test("it is active when the active id is the same as its own", () => {
    const wrapper = mount(BaseMenuItem, {
      props: { title: "test", itemId: TEST_ID },
      global: { provide: MOCK_ACTIVE_ITEM },
    });

    expect(wrapper.get('a').element.classList).toContain("is-active");
  });

  test("clicking it tries to set the active menu item", async () => {
    const DIFFERENT_TEST_ID = "differentid"
    const wrapper = mount(BaseMenuItem, {
      props: { title: "Test", itemId: DIFFERENT_TEST_ID },
      global: { provide: MOCK_ACTIVE_ITEM },
    });

    await wrapper.find("a").trigger("click");
    expect(MOCK_ACTIVE_ITEM.setActiveMenuItem).toHaveBeenCalledOnce();
    expect(MOCK_ACTIVE_ITEM.setActiveMenuItem).toHaveBeenCalledWith(DIFFERENT_TEST_ID);
  });
})
