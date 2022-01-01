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

  describe('when excluding elements', () => {
    const childrenClass = "test";
    const wrapper = mount(ClassedSlot, {
      props: { childrenClass, excludedElements: ['hr']},
      slots: {
        default: `
          <a href="#">1</a>
          <hr>
          <a href="#">2</a>
          <hr>
          <a href="#">3</a>
        `,
      }
    });

    test('the excluded elements are actually there', () => {
      expect(wrapper.findAll('hr').length).toBe(2);
    });

    test('the rest are also there, and the class is added', () => {
      expect(wrapper.findAll('a').length).toBe(3);
      
      for (const elem of wrapper.findAll('a')) {
        expect(elem.element.classList).toContain(childrenClass);
      }
    });
  });
});
