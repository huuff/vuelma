import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import BasePagination from "@/components/pagination/BasePagination.vue";
import { getFirstEmission } from "../util";


function findPageByNumber(wrapper: VueWrapper, pageNumber: number): DOMWrapper<Element> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper.findAll(".pagination-link").find(it => it.text() === pageNumber.toString())!;
}

describe("BasePagination.vue", () => {
  test("first and last pages are shown", () => {
    const pageNumber = 10;
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 5,
        pageNumber,
      }
    }); 

    expect(findPageByNumber(wrapper, 1).exists()).toBeTrue();
    expect(findPageByNumber(wrapper, pageNumber).exists()).toBeTrue();
  });

  describe("concerning ellipses", () => {
    test("two ellipses are shown when there are omitted elements", () => {
      // Since the showAround is 1, pages 7-9 and 3-2 are ellided
      const wrapper = mount(BasePagination, {
        props: {
          currentPage: 5,
          pageNumber: 10,
          showAround: 1,
        }
      });

      expect(wrapper.findAll(".pagination-ellipsis").length).toBe(2);
    });

    test("no ellipses are shown when there are no omitted elements", () => {
      const wrapper = mount(BasePagination, {
        props: {
          currentPage: 5,
          pageNumber: 10,
          showAround: 4
        }
      });

      expect(wrapper.findAll(".pagination-ellipsis").length).toBe(0);
    });
  });

  describe("back and forward buttons", () => {
    test("they are there and not disabled when the page is not first nor last", () => {
      const wrapper = mount(BasePagination, {
        props: {
          currentPage: 5,
          pageNumber: 10,
          showAround: 2,
        }
      });

      const previous = wrapper.find(".pagination-previous");
      expect(previous.exists()).toBeTrue();
      expect(Object.keys(previous.attributes())).not.toContain("disabled");
      const next = wrapper.find(".pagination-next");
      expect(next.exists()).toBeTrue();
      expect(Object.keys(next.attributes())).not.toContain("disabled");
    });

    test("they are disabled when the current page is first and last", () => {
      const wrapper = mount(BasePagination, {
        props: {
          currentPage: 1,
          pageNumber: 1,
          showAround: 0,
        }
      });

      const previous = wrapper.find(".pagination-previous");
      expect(Object.keys(previous.attributes())).toContain("disabled");
      const next = wrapper.find(".pagination-next");
      expect(Object.keys(next.attributes())).toContain("disabled");
    });
  });

  test("the showAround number of pages are shown before and after the current one", () => {
    const currentPage = 5;
    const wrapper = mount(BasePagination, {
      props: {
        currentPage,
        pageNumber: 10,
        showAround: 2
      }
    });

    expect(findPageByNumber(wrapper, currentPage-2)).toBeDefined();
    expect(findPageByNumber(wrapper, currentPage-1)).toBeDefined();
    expect(findPageByNumber(wrapper, currentPage+1)).toBeDefined();
    expect(findPageByNumber(wrapper, currentPage+2)).toBeDefined();
  });

  test("the current page is set as active", () => {
    const currentPage = 5;
    const wrapper = mount(BasePagination, {
      props: {
        currentPage,
        pageNumber: 10,
        showAround: 2,
      }
    });

    expect(findPageByNumber(wrapper, currentPage).element.classList).toContain("is-current");
  });

  test("clicking on a page sets it as active", async () => {
    const wrapper = mount(BasePagination, {
      props: {
        pageNumber: 10,
        showAround: 2,
      }
    });

    const targetPage = 2;
    await findPageByNumber(wrapper, targetPage).trigger("click");
    await wrapper.vm.$forceUpdate();
    console.log(wrapper.html());
    expect(findPageByNumber(wrapper, targetPage).element.classList).toContain("is-current")
  });

  test("clicking on a page emits an event to set it as current", async () => {
    const wrapper = mount(BasePagination, {
      props: {
        pageNumber: 10,
        showAround: 2,
      }
    });

    const targetPage = 2;
    await findPageByNumber(wrapper, targetPage).trigger("click");
    expect(getFirstEmission(wrapper, "update:currentPage")).toBe(targetPage);
  });
});
