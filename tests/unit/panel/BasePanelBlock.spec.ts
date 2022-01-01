import { mount } from '@vue/test-utils';
import BasePanelBlock from '@/components/panel/BasePanelBlock.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);

describe('BasePanelBlock.vue', () => {
  test('if active is passed, then it has the is-active class', () => {
    const wrapper = mount(BasePanelBlock, {
      props: {
        active: true,
      }
    });

    expect(wrapper.element.classList).toContain('is-active');
  });

  test("if an icon is passed, then it's in the element", () => {
    const icon = 'heart';
    const wrapper = mount(BasePanelBlock, {
      props: { icon },
      global: {
        components: { 'font-awesome-icon': FontAwesomeIcon }
      }
    })

    expect(wrapper.findComponent(FontAwesomeIcon).exists()).toBe(true);
    expect(wrapper.findComponent(FontAwesomeIcon).props().icon).toBe(icon)
  });
});
