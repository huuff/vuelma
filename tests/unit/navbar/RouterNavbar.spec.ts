import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import BaseNavbar from "@/components/navbar/BaseNavbar.vue";
import NavbarItem from "@/components/navbar/NavbarItem.vue";
import RouterNavbar from "@/components/navbar/RouterNavbar.vue";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  ...jest.requireActual("vue-router"),
  useRouter: jest.fn(() => ({
    getRoutes: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  })),
}));

const firstRoute = {
  name: "First",
  path: "/",
};

const secondRoute = {
  name: "Second",
  path: "/second",
};

const thirdRoute = {
  name: "Third",
  path: "/second/third",
};

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useRouter as jest.MockedFunction<any>).mockImplementation(() => ({
    getRoutes: () => ([ firstRoute, secondRoute, thirdRoute ]),
    currentRoute: { value: thirdRoute },
  }));
});

function buildWrapper(): VueWrapper {
  return mount(RouterNavbar, {
    global: {
      components: { BaseNavbar, RouterNavbar, NavbarItem },
      stubs: [ "router-link" ],
      renderStubDefaultSlot: true,
    },
  });
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll("router-link-stub").find(it => it.text() === text)!;
}

describe("RouterbBreadcrumb.vue", () => {
  test("routes appear as RouterLinks", () => {
    const wrapper = buildWrapper();

    expect(wrapper.findAll("router-link-stub").length).toBe(3);
  });

  test("there is a link in the brand slot to the home", () => {
    const wrapper = buildWrapper();

    const link = wrapper.find(".navbar-brand router-link-stub");
    expect(link.exists()).toBeTrue();
    expect(link.attributes().to).toBe(firstRoute.path);
    expect(link.text()).toBe(firstRoute.name);
  });


  test("the rest of the routes are at the end slot, and they route to their respective paths", () => {
    const wrapper = buildWrapper();

    expect(wrapper.findAll(".navbar-end router-link-stub").length).toBe(2);
    expect(findItemByText(wrapper, secondRoute.name).attributes().to).toBe(secondRoute.path);
    expect(findItemByText(wrapper, thirdRoute.name).attributes().to).toBe(thirdRoute.path);
  });

  test("the current route is set as active", () => {
    const wrapper = buildWrapper() ;

    // Third route is the current one
    expect(findItemByText(wrapper, thirdRoute.name).element.classList).toContain("is-active");
  });

});
