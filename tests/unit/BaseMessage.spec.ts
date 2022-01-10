import { mount } from "@vue/test-utils";
import BaseMessage from "@/components/BaseMessage.vue";
import { getFirstEmission } from "./util";

describe("BaseMessage.vue", () => {
  test("title appears in header", () => {
    const titleText = "testtitle";

    const wrapper = mount(BaseMessage, {
      props: { titleText },
    });

    expect(wrapper.get(".message-header").text()).toBe(titleText);
  });

  test("it's shown when show is true", () => {
    const wrapper = mount(BaseMessage, {
      props: { show: true }
    });

    expect(wrapper.find(".message").isVisible()).toBeTrue();
  });

  test("it isn't shown when show is false", () => {
    const wrapper = mount(BaseMessage, {
      props: { show: false }
    });

    expect(wrapper.find(".message").isVisible()).toBeFalse();
  });

  test("it shows a close button if closeable is true", () => {
    const wrapper = mount(BaseMessage, {
      props: { closeable: true }
    });

    expect(wrapper.find(".delete").exists()).toBeTrue();
  });

  test("it doesn't show a close button when closeable is false", () => {
    const wrapper = mount(BaseMessage, {
      props: { closeable: false }
    });

    expect(wrapper.find(".delete").exists()).toBeFalse();
  });

  test("the color is added", () => {
    const color = "primary";
    const wrapper = mount(BaseMessage, {
      props: { color },
    });

    expect(wrapper.get(".message").element.classList).toContain(`is-${color}`);
  });

  describe("closing message", () => {
    const wrapper = mount(BaseMessage, {
      props: {
        closeable: true,
      },
    });

    test("it is initially shown (sanity check)", () => {
      expect(wrapper.find(".message").isVisible()).toBeTrue();
    });

    test("it's not shown after the close button is clicked", async () => {
      await wrapper.get(".delete").trigger("click");

      expect(wrapper.find(".message").isVisible()).toBeFalse();
    });

    test("it emits an event to update show to false", () => {
      expect(Object.keys(wrapper.emitted())).toContain("update:show");
      expect(getFirstEmission(wrapper, "update:show")).toBeFalse();
    });
  });
});
