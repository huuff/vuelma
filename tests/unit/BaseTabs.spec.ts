import { mount } from '@vue/test-utils';
import BaseTabs from '@/components/tabs/BaseTabs.vue';
import BaseTab from '@/components/tabs/BaseTab.vue';

describe('BaseTabs.vue', () => {
  test("it cannot be created with a non-tab child", () => {
    expect(() => mount(BaseTabs, {
      global: {
        components: {
          'base-tab': BaseTab,
        },
      },
      slots: {
        default: `
          <base-tab title="Test" tabId="test1">
            Tab contents
          </base-tab>
          <div>
            This is a non-tab child, so it should throw
          </div>
          <base-tab title="Test2" tabId="test2">
            Test contents 2
          </base-tab>
        `,
      },
    }));
  });
});
