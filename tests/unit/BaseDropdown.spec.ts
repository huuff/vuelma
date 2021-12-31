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

  describe('when clicking', () => {
    const wrapper = mount(BaseDropdown, {
      props: { triggerText: 'Click here' },
    });


    async function trigger(event: string) {
      const triggerButton = wrapper.find('.dropdown-trigger button');
      await triggerButton.trigger(event);
    }

    function classlist() {
      return wrapper.find('.dropdown').element.classList;
    }

    test('when clicked, it is opened', async () => {
      expect(classlist()).not.toContain('is-active');
      await trigger('click');
      expect(classlist()).toContain('is-active');
    });

    test('it is closed when clicked again', async () => {
      expect(classlist()).toContain('is-active');
      await trigger('click');
      expect(wrapper.find('.dropdown').element.classList).not.toContain('is-active');
    });

    test('it is closed when blurred', async () => {
      await trigger('click');
      expect(classlist()).toContain('is-active')

      await trigger('blur');
      expect(classlist()).not.toContain('is-active')
    });


  });

  test('trigerable with custom html', async () => {
    const wrapper = mount(BaseDropdown, {
      slots: { trigger: `<a id="target">CLICK</a>`},
    })
    
    expect(wrapper.find('.dropdown').element.classList).not.toContain('is-active');
    await wrapper.find('#target').trigger('click');
    expect(wrapper.find('.dropdown').element.classList).toContain('is-active');
  });

  test("can't have both a triggerText and trigger slot", () => {
    expect(() => mount(BaseDropdown, {
      props: { triggerText: "test" },
      slots: { trigger: "<div>slot</div>"}
    })).toThrow();
  });
});
