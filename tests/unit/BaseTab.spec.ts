import { mount } from '@vue/test-utils';
import BaseTab from '@/components/tabs/BaseTab.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);

describe('BaseTab.vue', () => {
  it("shows the title", () => {
    const title = "Test title";
    const wrapper = mount(BaseTab, {
      props: { title }
    });

    expect(wrapper.text()).toBe(title);
  });

  it('shows the icon', () => {
    const icon = 'heart';
    const wrapper = mount(BaseTab, {
      props: {
        title: "Title",
        icon,
      },
      global: {
        components: { 'font-awesome-icon': FontAwesomeIcon, },
      }
    });

    expect(wrapper.findComponent(FontAwesomeIcon).props().icon).toBe(icon);
  });

  it("when marked as active, has the is-active class", () => {
    const wrapper = mount(BaseTab, {
      props: {
        title: "Test title",
        active: true
      },
    });

    expect(wrapper.element.classList).toContain('is-active');
  });

  it("when clicked, tries to set itself as active tab", async () => {
    const title = "Test title";
    const wrapper = mount(BaseTab, {
      props: { title },
    });

    await wrapper.find('a').trigger('click');
    expect(Object.keys(wrapper.emitted())).toContain('setActiveTab');
    expect((wrapper.emitted()['setActiveTab'][0] as string[])[0]).toBe(title);
  });
});
