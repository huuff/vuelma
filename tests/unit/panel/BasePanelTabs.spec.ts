import { mount } from '@vue/test-utils';
import BasePanelTabs from '@/components/panel/BasePanelTabs.vue';

const FIRST_BLOCK_ID = "firstBlock";
const SECOND_BLOCK_ID = "secondBlock";
const THIRD_BLOCK_ID = "thirdBlock";

const FIRST_BLOCK = `
  <a class="panel-block" id="${FIRST_BLOCK_ID}">
    First block
  </a>
`;

const SECOND_BLOCK = `
  <a class="panel-block" id="${SECOND_BLOCK_ID}">
    Second block
  </a>
`;

const THIRD_BLOCK = `
  <a class="panel-block" id="${THIRD_BLOCK_ID}">
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
      [FIRST_BLOCK_ID]: FIRST_BLOCK,
      [SECOND_BLOCK_ID]: SECOND_BLOCK,
      [THIRD_BLOCK_ID]: THIRD_BLOCK,
    },
    global: {
      provide: {
        getActivePanelTab: jest.fn(() => FIRST_BLOCK_ID),
        setActivePanelTab: jest.fn(),
      },
    },
  });

  test.skip("slots are shown as tabs", () => {
    console.log(wrapper.html());
    const tabWrappers = wrapper.findAll('p');
    console.log(JSON.stringify(tabWrappers));

    expect(tabWrappers[0].text()).toBe(FIRST_BLOCK_ID);
    expect(tabWrappers[1].text()).toBe(SECOND_BLOCK_ID);
    expect(tabWrappers[2].text()).toBe(THIRD_BLOCK_ID);
  });
});
