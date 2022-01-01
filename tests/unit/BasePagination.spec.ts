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

    test("clicking each one goes to the page it shows in the text", async () => {
      // Sanity check
      expect(Object.keys(wrapper.emitted()).length).toBe(0);

      for (const [index, paginationLink] of wrapper.findAll('.pagination-link').entries()) {
        await paginationLink.trigger('click');
        const number = +paginationLink.text();
        expect((wrapper.emitted()["gotoPage"][index] as number[])[0]).toBe(number);
      }
    })
  });

  describe('3 pages, 2 as current', () => {
    const pageNumber = 3;
    const currentPage = 2;

    const wrapper = mount(BasePagination, {
      props: {
        pageNumber, currentPage,
      },
      global: {
        stubs: [ 'font-awesome-icon' ],
      }
    });

    test('there are exactly three pages shown', () => {
      expect(wrapper.findAll('.pagination-link').length).toBe(3);
    });

    test('1, 2, and 3 are shown', () => {
      expect(findPageAnchorByNumber(wrapper, 1).exists()).toBeTrue();
      expect(findPageAnchorByNumber(wrapper, 2).exists()).toBeTrue();
      expect(findPageAnchorByNumber(wrapper, 3).exists()).toBeTrue();
    });

    test('there are no ellipses', () => {
      expect(wrapper.findAll('.pagination-ellipsis').length).toBe(0);
    });
  });
});