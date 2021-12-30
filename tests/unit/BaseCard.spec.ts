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

  // TODO: Triggering a warning! So there must be a better way
  test('the footer items have the appropriate class', () => {
    const wrapper = mount(BaseCard, {
      global: { stubs: [ 'font-awesome-icon' ], },
      slots: { footerItems: `
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
        `},
    });

    for (const elem of wrapper.findAll('.card-footer a')) {
      expect(elem.element.classList).toContain("card-footer-item");
    }
  }); 
});
