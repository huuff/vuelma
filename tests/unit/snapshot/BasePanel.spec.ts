import { mount } from "@vue/test-utils";
import BasePanel from "@/components/panel/BasePanel.vue";
import PanelBlock from "@/components/panel/PanelBlock.vue";
import PanelTabs from "@/components/panel/PanelTabs.vue";
import PanelTab from "@/components/panel/PanelTab.vue";
import PanelBlockContent from "@/components/panel/PanelBlockContent.vue";

test("BasePanel.vue snapshot", () => {
  const wrapper = mount(BasePanel, {
    props: {
      headingText: "Heading text",
      activeItemId: "Item 1",
      activeTabId: "Tab 1",
      color: "warning",
    },
    global: {
      components:{ PanelBlock, PanelTabs, PanelTab, PanelBlockContent },
    },
    slots: {
      default: `
        <panel-block titleText="Item 1" />
        <panel-tabs>
          <panel-tab titleText="Tab 1">
            <panel-block titleText="Item 2" />
            <panel-block titleText="Item 3" />
            <panel-block titleText="Item 4" />
          </panel-tab>
          <panel-tab titleText="Tab 2">
            <panel-block titleText="Item 5" />
            <panel-block-content>
              <label>
                <input type="text" /> Test
              </label>
            </panel-block-content>
          </panel-tab>
        </panel-tabs>
      `
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
