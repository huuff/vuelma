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
          <base-tab title="Test1" tabId="test1">
            Tab contents 1
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
  test("the titles of the tabs appear in the tab elements", () => {
    const tab1Title = "Test1";
    const tab2Title = "Test2";
    const tab3Title = "Test3";
    const wrapper = mount(BaseTabs, {
      global: {
        components: {
          'base-tab': BaseTab,
        },
      },
      slots: {
        default: `
        <base-tab title="${tab1Title}" tabId="test1">
          Tab contents 1
        </base-tab>
        <base-tab title="${tab2Title}" tabId="test2">
          Tab contents 2
        </base-tab>
        <base-tab title="${tab3Title}" tabId="test3">
          Tab contents 3
        </base-tab>
        `,
      },
    });

    const allTabs = wrapper.get("ul").findAll("li");
    expect(allTabs[0].text()).toBe(tab1Title);
    expect(allTabs[1].text()).toBe(tab2Title);
    expect(allTabs[2].text()).toBe(tab3Title);
  });
});
