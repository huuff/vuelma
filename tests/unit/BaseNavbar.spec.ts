import { mount } from '@vue/test-utils';
import BaseNavbar from '@/components/BaseNavbar.vue';

describe('BaseNavbar.vue', () => {
  test('there is always a navbar burger', () => {
    const wrapper = mount(BaseNavbar);

    expect(wrapper.find('.navbar-burger').exists()).toBe(true);
  });

  test('the navbar menu is initially not active', () => {
    const wrapper = mount(BaseNavbar);

    expect(wrapper.get('.navbar-menu').element.classList).not.toContain('is-active');
  });

  test('the navbar menu is active when the burger button is clicked', async () => {
    const wrapper = mount(BaseNavbar);

    await (wrapper.get('.navbar-burger').trigger('click'));

    expect(wrapper.get('.navbar-menu').element.classList).toContain('is-active');
  });
});
