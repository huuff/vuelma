import { mount } from "@vue/test-utils";
import BaseTabs from "@/components/tabs/BaseTabs.vue";
import BaseTab from "@/components/tabs/BaseTab.vue";

test("BaseTabs.vue snapshot", () => {
  const wrapper = mount(BaseTabs, {
    props: {
      activeTabId: "Tab 1",
    },
    global: {
      components: { BaseTab },
    },
    slots: {
      default: `
        <base-tab titleText="Tab 1">
          <p>Tab 1 contents</p>
        </base-tab>
        <base-tab titleText="Tab 2">
          <p>Tab 2 contents</p>
        </base-tab>
        <base-tab titleText="Tab 3">
          <p>Tab 3 contents</p>
        </base-tab>
      `
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
