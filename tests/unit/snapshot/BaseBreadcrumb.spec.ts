import { mount } from "@vue/test-utils";
import BaseBreadcrumb from "@/components/breadcrumb/BaseBreadcrumb.vue";
import BreadcrumbItem from "@/components/breadcrumb/BreadcrumbItem.vue";

test("BaseBreadcrumb.vue snapshot", () => {
  const wrapper = mount(BaseBreadcrumb, {
    props: {
      activeItemId: "Item 1",
      separator: "arrow",
    },
    global: {
      components: { BreadcrumbItem },
    },
    slots: {
      default: `
        <breadcrumb-item titleText="Item 1" />
        <breadcrumb-item titleText="Item 2" />
        <breadcrumb-item titleText="Item 3" />
      `,
    }
  });
});
