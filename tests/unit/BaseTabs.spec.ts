// TODO: uncomment this, but I can't compile TSX because of https://github.com/vuejs/vue-cli/issues/6911
describe("fake test so jest wont complain", () => {
  test("do nothing", () => {
    expect(true).toBe(true);
  })
})
//import { mount } from '@vue/test-utils';
//import BaseTabs from '@/components/tabs/BaseTabs.vue';
//import BaseTab from '@/components/tabs/BaseTab.vue';
//import { library } from '@fortawesome/fontawesome-svg-core';
//import { faHeart } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//library.add(faHeart);

//describe('BaseTabs.vue', () => {
  //test("it cannot be created with a non-tab child", () => {
    //expect(() => mount(BaseTabs, {
      //global: {
        //components: {
          //'base-tab': BaseTab,
        //},
      //},
      //slots: {
        //default: `
          //<base-tab titleText="Test1" tabId="test1">
            //Tab contents 1
          //</base-tab>
          //<div>
            //This is a non-tab child, so it should throw
          //</div>
          //<base-tab titleText="Test2" tabId="test2">
            //Test contents 2
          //</base-tab>
        //`,
      //},
    //}));
  //});
  //test("the titleTexts of the tabs appear in the tab elements", () => {
    //const tab1titleText = "Test1";
    //const tab2titleText = "Test2";
    //const tab3titleText = "Test3";
    //const wrapper = mount(BaseTabs, {
      //global: {
        //components: {
          //'base-tab': BaseTab,
        //},
      //},
      //slots: {
        //default: `
        //<base-tab titleText="${tab1titleText}" tabId="test1">
          //Tab contents 1
        //</base-tab>
        //<base-tab titleText="${tab2titleText}" tabId="test2">
          //Tab contents 2
        //</base-tab>
        //<base-tab titleText="${tab3titleText}" tabId="test3">
          //Tab contents 3
        //</base-tab>
        //`,
      //},
    //});

    //const allTabs = wrapper.get("ul").findAll("li");
    //expect(allTabs[0].text()).toBe(tab1titleText);
    //expect(allTabs[1].text()).toBe(tab2titleText);
    //expect(allTabs[2].text()).toBe(tab3titleText);
  //});

  //test("clicking a tab tries to make it active", async () => {
    //const tabToClick = "test1";
    //const wrapper = mount(BaseTabs, {
      //global: {
        //components: {
          //'base-tab': BaseTab,
        //},
      //},
      //slots: {
        //default: `
        //<base-tab titleText="Test1" tabId="${tabToClick}">
          //Tab contents 1
        //</base-tab>
        //`,
      //},
    //});

    //await wrapper.get('a').trigger('click');

    //expect(Object.keys(wrapper.emitted())).toContain("update:activeTabId");
    //expect((wrapper.emitted()["update:activeTabId"][0] as string[])[0]).toBe(tabToClick);
  //});

  //test("only the contents of the active tab are displayed", () => {
    //const activeTabId = "activeTab";
    //const activeTabContents = "This text should be displayed";
    //const unactiveTabContents = "This text shouldn't be displayed";
    //const wrapper = mount(BaseTabs, {
      //props: {
        //activeTabId,
      //},
      //global: {
        //components: {
          //'base-tab': BaseTab,
        //},
      //},
      //slots: {
        //default: `
        //<base-tab titleText="Tab1" tabId="${activeTabId}">
          //${activeTabContents}
        //</base-tab>
        //<base-tab titleText="Tab2" tabId="unactiveTab">
          //${unactiveTabContents}
        //</base-tab>
        //`,
      //},
    //});
    
    //expect(wrapper.html()).toContain(activeTabContents);
    //expect(wrapper.html()).not.toContain(unactiveTabContents);
  //});

  //test("icons are displayed", () => {
    //const icon = "heart";
    //const wrapper = mount(BaseTabs, {
      //global: {
        //components: {
          //"base-tab": BaseTab,
          //"font-awesome-icon": FontAwesomeIcon,
        //},
      //},
      //slots: {
        //default: `
          //<base-tab titleText="Test" tabId="testid" icon="heart">
            //Test content
          //</base-tab>
        //`,
      //},
    //});

    //expect(wrapper.findComponent(FontAwesomeIcon).props().icon).toBe(icon);
  //});
//});
