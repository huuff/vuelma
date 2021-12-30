import { mount } from '@vue/test-utils';
import ClassedSlot from '@/components/ClassedSlot.js';

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

      // XXX: It would be great to just use a selector with `findAll`,
      // but it does not work! The fact that I'm using a render function 
      // with a fragment might be too much for test-utils
      const html = wrapper.html();
      const matches = html.match(new RegExp(`class="${childrenClass}"`, 'g'));
      expect(matches).not.toBeNull();
      expect(matches!.length).toBe(3);
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
