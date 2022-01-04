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

  test("clicking a tab tries to make it active", async () => {
    const tabToClick = "test1";
    const wrapper = mount(BaseTabs, {
      global: {
        components: {
          'base-tab': BaseTab,
        },
      },
      slots: {
        default: `
        <base-tab title="Test1" tabId="${tabToClick}">
          Tab contents 1
        </base-tab>
        `,
      },
    });

    await wrapper.get('a').trigger('click');

    expect(Object.keys(wrapper.emitted())).toContain("update:activeTabId");
    expect((wrapper.emitted()["update:activeTabId"][0] as string[])[0]).toBe(tabToClick);
  });

  test("only the contents of the active tab are displayed", () => {
    const activeTabId = "activeTab";
    const activeTabContents = "This text should be displayed";
    const unactiveTabContents = "This text shouldn't be displayed";
    const wrapper = mount(BaseTabs, {
      props: {
        activeTabId,
      },
      global: {
        components: {
          'base-tab': BaseTab,
        },
      },
      slots: {
        default: `
        <base-tab title="Tab1" tabId="${activeTabId}">
          ${activeTabContents}
        </base-tab>
        <base-tab title="Tab2" tabId="unactiveTab">
          ${unactiveTabContents}
        </base-tab>
        `,
      },
    });
    
    expect(wrapper.html()).toContain(activeTabContents);
    expect(wrapper.html()).not.toContain(unactiveTabContents);
  });
});
