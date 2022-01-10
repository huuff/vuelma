import { mount } from "@vue/test-utils";
import BaseCard from '@/components/BaseCard.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

describe("BaseCard.vue", () => {
  test("titleText appears in the title", () => {
    const titleText = "testtext";
    const wrapper = mount(BaseCard, {
      props: { titleText },
      global: { stubs: [ "font-awesome-icon" ], },
    });

    expect(wrapper.get(".card-header-title").text()).toBe(titleText);
  });

  test("footerItems get added the 'card-footer-item' class", () => {
    const wrapper = mount(BaseCard, {
      global: { stubs: [ "font-awesome-icon"], },
      slots: {
        footerItems: `
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        `,
      },
    });

    const footerItems = wrapper.get(".card-footer").findAll("p");
    expect(footerItems.length).toBe(3);
    for (const item of footerItems) {
      expect(item.element.classList).toContain("card-footer-item");
    }
  });

  test("icon gets added to header", () => {
    const icon = "heart";
    const wrapper = mount(BaseCard, {
      props: { icon },
      global: {
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
      },
    });

    const iconComponent = wrapper.get(".card-header-icon").getComponent(FontAwesomeIcon);
    expect(iconComponent.props().icon).toBe(icon);
  });

  test("image gets added", () => {
    const image = "testimg";
    const wrapper = mount(BaseCard, {
      props: { image },
      global: { stubs: ["font-awesome-icon"]},
    });

    expect(wrapper.find(".card-image .image").exists()).toBeTrue();
    expect(wrapper.get(".card-image .image img").element.getAttribute("src")).toBe(image);
  });

  test("it can't be created with both a footer and footer items", () => {
    expect(() => mount(BaseCard, {
      global: { stubs: [ "font-awesome-icon"], },
      slots: {
        footerItems: `
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        `,
        footer: "<p>Footer</p>"
      },
    })).toThrow();
  });

  test("it can't be created with both a title text and a title", () => {
    expect(() => mount(BaseCard, {
      props: { titleText: "titletext" },
      global: { stubs: [ "font-awesome-icon"], },
      slots: {
        header: "<p>Header</p>"
      },
    })).toThrow();
  });
});
