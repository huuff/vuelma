import { mount } from '@vue/test-utils';
import BaseMenuItem from '@/components/menu/BaseMenuItem.vue';

describe('BaseMenuItem.vue', () => {
  test("it contains the title", () => {
    const title = "Test title";
    const wrapper = mount(BaseMenuItem, {
      props: { title },
    });

    expect(wrapper.text()).toBe(title);
  });

  test("passing active makes it have the is-active class", () => {
    const wrapper = mount(BaseMenuItem, {
      props: { active: true },
    });

    expect(wrapper.element.classList).toContain("is-active");
  });

  test("clicking it tries to set the active menu item", async () => {
    const title = "Test title";
    const wrapper = mount(BaseMenuItem, {
      props: { title }
    });

    await wrapper.find("a").trigger("click");
    expect(Object.keys(wrapper.emitted())).toContain("setActiveMenuItem");
    expect((wrapper.emitted()['setActiveMenuItem'][0] as string[])[0]).toBe(title);
  });
})
