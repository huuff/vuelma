import { mount } from '@vue/test-utils';
import BasePanel from '@/components/panel/BasePanel.vue';

describe('BasePanel.vue', () => {
  test("titleText is set", () => {
    const titleText = "Test titleText";

    const wrapper = mount(BasePanel, {
      props: { titleText }
    });

    expect(wrapper.get('.panel-heading').text()).toBe(titleText);
  });
});
