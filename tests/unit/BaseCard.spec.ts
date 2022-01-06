import { mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BaseCard from '@/components/BaseCard.vue';

library.add(faHeart);

describe('BaseCard.vue', () => {
  test('it contains the titleText', () => {
    const titleText = "TEST titleText";
    const wrapper = mount(BaseCard, {
      props: { titleText },
      global: {  stubs: [ 'font-awesome-icon' ], },
    });

    expect(wrapper.find('.card-header-title').exists()).toBeTrue();
    expect(wrapper.get('.card-header-title').text()).toBe(titleText);
  });

  test('it contains the content', () => {
    const content = `
    <section>
      <p>Test</p>
    </section>
    `;
    const wrapper = mount(BaseCard, {
      global: { stubs: [ 'font-awesome-icon' ], },
      slots: { default: content },
    });

    expect(wrapper.find('.card-content').exists()).toBeTrue();
    expect(wrapper.get('.card-content').element.innerHTML).toEqualIgnoringWhitespace(content);
  });

  test('footer elements have the card-footer-item class', () => {
    const wrapper = mount(BaseCard, {
      global: { stubs: [ 'font-awesome-icon' ]},
      slots: { footerItems: `
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
        `}
    });

    for (const item of wrapper.findAll('a')) {
      expect(item.classes()).toContain('card-footer-item');
    }
  });

  test('cannot create an instance with both a footer and footer items', () => {
    expect(() => mount(BaseCard, {
      global: { stubs: ['font-awesome-icon']},
      slots: {
        footer: 'test1',
        footerItems: 'test2'
      },
    })).toThrow();
  });

  test('cannot create an instance with both a header and a titleText', () => {
    expect(() => mount(BaseCard, {
      global: { stubs: ['font-awesome-icon']},
      slots: {
        header: 'test1',
        titleText: 'test2'
      },
    })).toThrow();
  });

  test('it contains the icon', () => {
    const wrapper = mount(BaseCard, {
      props: {
        icon: 'heart',
      },
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    }); 

    expect(wrapper.findComponent(FontAwesomeIcon).props().icon).toBe('heart');
  });

});
