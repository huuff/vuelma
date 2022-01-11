import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import RouterBreadcrumb from "@/components/breadcrumb/RouterBreadcrumb.vue";
import BaseBreadcrumb from "@/components/breadcrumb/BaseBreadcrumb.vue";
import BreadcrumbItem from "@/components/breadcrumb/BreadcrumbItem.vue";
import { useRouter, RouterLink } from "vue-router";

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
  return mount(RouterBreadcrumb, { 
    global: {
      components: { BaseBreadcrumb, BreadcrumbItem },
      stubs: [ "router-link" ],
      renderStubDefaultSlot: true,
    },
  });
}

function findItemByText(wrapper: VueWrapper, text: string): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".breadcrumb li").find(it => it.text() === text)!;
}

describe("RouterBreadcrumb.vue", () => {
  test("routes appear as RouterLinks", () => {
    const wrapper = buildWrapper();

    expect(wrapper.findAll("router-link-stub").length).toBe(3);
  });

  test("items send to their respective paths", () => {
    const wrapper = buildWrapper();
    
    for (const it of [ firstRoute, secondRoute, thirdRoute ]) {
      const itemElement = findItemByText(wrapper, it.name).get("router-link-stub");
      expect(itemElement.attributes().to).toBe(it.path);
    }
  });

  test("the current route is set as active", () => {
    const wrapper = buildWrapper();

    const activeItem = findItemByText(wrapper, thirdRoute.name);

    expect(activeItem.element.classList).toContain("is-active");
  });
});

