import { mount } from '@vue/test-utils';
import ClassedSlot from '@/components/ClassedSlot.vue';

describe('ClassedSlot.vue', () => {
  test('every child has the given class', () => {
      const testClass = 'test';
      const wrapper  = mount(ClassedSlot, {
        slots: {
          default: `
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
          `,
        },
      });

      for (const elem of wrapper.findAll('a')) {
        expect(elem.element.classList).toContain(testClass);
      }
  });
});
