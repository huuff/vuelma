import { mount } from '@vue/test-utils';
import ClassedSlot from '@/components/slots/ClassedSlot.js';

describe('ClassedSlot.js', () => {
  test('every child has the given class', () => {
      const childrenClass = 'test';
      const wrapper  = mount(ClassedSlot, {
        props: { childrenClass },
        slots: {
          default: `
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
          `,
        },
      });

      for (const elem of wrapper.findAll('a')) {
        expect(elem.classes()).toContain(childrenClass);
      }
  });

  test('it works with only one child too', () => {
    const childrenClass = 'test';
    const wrapper  = mount(ClassedSlot, {
      props: { childrenClass },
      slots: {
        default: `
          <a href="#">1</a>
        `,
      },
    });

    expect(wrapper.find('a').element.classList).toContain(childrenClass);
  });
});
