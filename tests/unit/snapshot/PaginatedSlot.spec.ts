import { mount } from "@vue/test-utils";
import BasePagination from "@/components/pagination/BasePagination.vue";
import PaginatedSlot from "@/components/pagination/PaginatedSlot.vue";

test("PaginatedSlot.vue snapshot", () => {
  const wrapper = mount(PaginatedSlot, {
    props: {
      currentPage: 5,
      itemsPerPage: 10,
      showAround: 2,
      items: Array.from(Array(100).keys()),
    },
    global: {
      components: { BasePagination }
    },
    slots: {
      default: `
        <template #default="{items}">
          <ul>
            <li v-for="item in items" :key="item.toString()">Item {{item}}</li>
          </ul>
        </template>
      `,
    },
  });

  expect(wrapper.element).toMatchSnapshot();
});
