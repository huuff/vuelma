import { mount } from '@vue/test-utils';
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';

beforeEach(() => {
  jest.useFakeTimers('modern');
});

afterAll(() => {
  jest.useRealTimers();
});

describe('BaseNavbar.vue', () => {
  describe("opening and closing on mobile", () => {
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

    test("it's closed when clicking anywhere", async () => {
      const wrapper = mount(BaseNavbar, {
        attachTo: document.documentElement,
      });

      console.log("Now clicking to show");
      await (wrapper.get('.navbar-burger').trigger('click'));

      await wrapper.vm.$forceUpdate();
      expect(wrapper.get('.navbar-menu').element.classList).toContain('is-active');

      jest.runAllTimers();

      console.log("Now clicking to hide");
      await wrapper.get('.navbar-menu').trigger('click');
      
      await wrapper.vm.$forceUpdate();
      expect(wrapper.get('.navbar-menu').element.classList).not.toContain('is-active');

    });
  });
});
