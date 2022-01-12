import { mount } from "@vue/test-utils";
import BasePagination from "@/components/pagination/BasePagination.vue";

test("BasePagination.vue snapshot", () => {
  const wrapper = mount(BasePagination, {
    props: {
      currentPage: 5,
      pageNumber: 10,
      showAround: 2,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
