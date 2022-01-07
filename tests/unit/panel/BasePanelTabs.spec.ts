import { mount } from '@vue/test-utils';
import BasePanelTabs from '@/components/panel/BasePanelTabs.vue';

const firstBlockId = "firstBlock";
const secondBlockId = "secondBlock";
const thirdBlockId = "thirdBlock";

const firstBlock = `
  <a class="panel-block" id="${firstBlockId}">
    First block
  </a>
`;

const secondBlock = `
  <a class="panel-block" id="${secondBlockId}">
    Second block
  </a>
`;

const thirdBlock = `
  <a class="panel-block" id="${thirdBlockId}">
    Third block
  </a>
`;

// TODO: Test that the tabs can be switched
// TODO: Test that the content of each tab appears on switch
// TODO: Cannot test anything right now because of https://github.com/vuejs/vue-test-utils/issues/1945
// check back when I get some solution for it

describe('BasePanelTabs.vue', () => {
  const wrapper = mount(BasePanelTabs, {
    props: {
      active: 'firstBlock',
    },
    slots: {
      [firstBlockId]: firstBlock,
      [secondBlockId]: secondBlock,
      [thirdBlockId]: thirdBlock,
    },
    global: {
      provide: {
        getActivePanelTab: jest.fn(() => firstBlockId),
        setActivePanelTab: jest.fn(),
      },
    },
  });

  test.skip("slots are shown as tabs", () => {
    const tabWrappers = wrapper.findAll('p');

    expect(tabWrappers[0].text()).toBe(firstBlockId);
    expect(tabWrappers[1].text()).toBe(secondBlockId);
    expect(tabWrappers[2].text()).toBe(thirdBlockId);
  });
});
