import { mount } from '@vue/test-utils';
import BaseCard from '@/components/BaseCard.vue';

describe('BaseCard.vue', () => {
  test('it contains the title', () => {
    const title = "TEST TITLE";
    const wrapper = mount(BaseCard, {
      props: { title },
      global: {  stubs: [ 'font-awesome-icon' ], },
    });

    expect(wrapper.find('.card-header-title').exists()).toBeTrue();
    expect(wrapper.get('.card-header-title').text()).toBe(title);
  });

  test('it contains the content', () => {
    const content = `
    <section>
      <p>Test</p>
    </section>
    `;
    const wrapper = mount(BaseCard, {
      global: { stubs: [ 'font-awesome-icon' ], },
      slots: { content },
    });

    expect(wrapper.find('.card-content').exists()).toBeTrue();
    expect(wrapper.get('.card-content').element.innerHTML).toEqualIgnoringWhitespace(content);
  });

});
