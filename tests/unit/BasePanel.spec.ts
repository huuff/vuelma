import { mount } from '@vue/test-utils';
import BasePanel from '@/components/panel/BasePanel.vue';

describe('BasePanel.vue', () => {
  test("title is set", () => {
    const title = "Test title";

    const wrapper = mount(BasePanel, {
      props: { title }
    });

    expect(wrapper.get('.panel-heading').text()).toBe(title);
  });
});
