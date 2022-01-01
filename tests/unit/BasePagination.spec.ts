import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import BasePagination from '@/components/BasePagination.vue';
import BasePaginationLink from '@/components/BasePaginationLink.vue';

function findPageAnchorByNumber(wrapper: VueWrapper, num: number): DOMWrapper<HTMLAnchorElement> {
  return wrapper.findAll("a").find(elem => elem.text() === num.toString())!;
}

describe("BasePagination.vue", () => {
  describe("10 pages, current page 5", () => {
    const currentPage = 5;
    const pageNumber = 10;
    const wrapper = mount(BasePagination, {
      props: {
        pageNumber,
        currentPage,
        showAround: 2,
      }, global: {
        components: { BasePaginationLink },
      }
    });

    test("5 is marked as current", () => {
      expect(findPageAnchorByNumber(wrapper, currentPage).element.classList).toContain("is-current");
    });

    test("numbers around are shown", () => {
      expect(findPageAnchorByNumber(wrapper, 4).exists()).toBeTrue();
      expect(findPageAnchorByNumber(wrapper, 3).exists()).toBeTrue();
      expect(findPageAnchorByNumber(wrapper, 6).exists()).toBeTrue();
      expect(findPageAnchorByNumber(wrapper, 7).exists()).toBeTrue();
    })

    test("first and last are shown", () => {
      expect(findPageAnchorByNumber(wrapper, 1).exists()).toBeTrue();
      expect(findPageAnchorByNumber(wrapper, pageNumber).exists()).toBeTrue();
    })

    test("there are two ellipses", () => {
      expect(wrapper.findAll('.pagination-ellipsis').length).toBe(2);
    });
  });
});
