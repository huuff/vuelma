import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import PaginatedSlot from "@/components/pagination/PaginatedSlot.vue";
import BasePagination from "@/components/pagination/BasePagination.vue";

type PaginatedSlotProps = {
  items: unknown[],
  itemsPerPage?: number;
  currentPage?: number;
  showAround?: number;
};

function buildWrapper(props: PaginatedSlotProps): VueWrapper {
  return mount(PaginatedSlot, {
    props,
    global: {
      components: { BasePagination }
    },
    slots: {
      default: `
      <template v-slot:default="{ items }">
        <ul id="contents">
          <li v-for="item in items" :key="item.toString()"> {{ item }} </li>
        </ul>
      </template>
      `
    }
  });
}

function range(to: number): number[] {
  return Array.from(Array(to).keys());
}

describe("PaginatedSlot.vue", () => {
  test("the appropriate number of items appear", () => {
    const itemsPerPage = 10;
    const wrapper = buildWrapper({ items: range(100), itemsPerPage, currentPage: 1, showAround: 2 })

    expect(wrapper.get("#contents").findAll("li").length).toBe(itemsPerPage);
  });

  test("the correct items appear", () => {
    const wrapper = buildWrapper({ items: range(100), itemsPerPage: 10, currentPage: 2});

    const items = wrapper.get("#contents").findAll("li");
    // There's one of each of the numbers 10-19
    for (let i = 10; i < 20; i++) {
      expect(items.filter(it => it.text() === i.toString()).length).toBe(1);
    }
  });
});
