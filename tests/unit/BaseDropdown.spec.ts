import { mount } from '@vue/test-utils';
import BaseDropdown from '@/components/BaseDropdown.vue';

describe('BaseDropdown.vue', () => {
  test('all items have the dropdown-item class', () => {
    const wrapper = mount(BaseDropdown, {
      slots: {
        default: `
        <a>First</a>
        <a>Second</a>
        <a>Third</a>
        `,
      }
    });

    for (const elem of wrapper.findAll('a')) {
      expect(elem.element.classList).toContain('dropdown-item')
    }
  });

  test('the trigger text is used as the button content', () => {
    const triggerText = 'test';
    const wrapper = mount(BaseDropdown, {
      props: { triggerText },
    });

    expect(wrapper.find('.dropdown-trigger').text()).toBe(triggerText);
  });
});
