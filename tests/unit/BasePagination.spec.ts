import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import BasePagination from '@/components/BasePagination.vue';
import BasePaginationLink from '@/components/BasePaginationLink.vue';

function findPageAnchorByNumber(wrapper: VueWrapper, num: number): DOMWrapper<HTMLAnchorElement> {
  return wrapper.findAll("a").find(elem => elem.text() === num.toString())!;
}

describe("BasePagination.vue", () => {
  describe("10 pages, current page 5", () => {
    const currentPage = 5;
    const wrapper = mount(BasePagination, {
      props: {
        pageNumber: 10,
        currentPage,
        showAround: 2,
      }, global: {
        components: { BasePaginationLink },
      }
    });

    test("5 is marked as current", () => {
      expect(findPageAnchorByNumber(wrapper, currentPage).element.classList).toContain("is-current");
    });

    test("4 is shown", () => {
      expect(findPageAnchorByNumber(wrapper, 4).exists()).toBeTrue();
    })
  });
});
