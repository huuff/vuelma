import { mount, VueWrapper } from "@vue/test-utils";
import BaseModal from "@/components/modal/BaseModal.vue";
import { getFirstEmission } from "./get-first-emission";

function isShown(wrapper: VueWrapper): boolean {
  return wrapper.element.classList.contains("is-active");
}

function emitsClose(wrapper: VueWrapper): boolean {
  return Object.keys(wrapper.emitted()).includes("update:show")
    && getFirstEmission(wrapper, "update:show") === false;
}

describe("BaseModal.vue", () => {
  test("it is shown when show is true", () => {
    const wrapper = mount(BaseModal, {
      props: {show: true },
    });

    expect(isShown(wrapper)).toBeTrue();
  });

  test("it isn't show when show is false", () => {
    const wrapper = mount(BaseModal, {
      props: { show: false },
    });

    expect(isShown(wrapper)).toBeFalse();
  });

  describe("when closeable", () => {
    const wrapper = mount(BaseModal, {
      props: { closeable: true },
    });

    test("it's initially shown (sanity check)", () => {
      expect(isShown(wrapper)).toBeTrue();
    });

    test("there's a close button", () => {
      expect(wrapper.find(".modal-close").exists()).toBeTrue();
    });

    test("when clicked, it's hidden", async () => {
      await wrapper.get(".modal-close").trigger("click");

      expect(isShown(wrapper)).toBeFalse();
    });

    test("an event to update show to false is thrown", () => {
      expect(emitsClose(wrapper)).toBeTrue();
    });
  });

  test("there's no close button when closeable is false", () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: true,
        closeable: false,
      }
    });

    expect(wrapper.find(".modal-close").exists()).toBeFalse();
  });

  test("when backdropCloseable, it can be closed by clicking on the backdrop", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: true,
        closeable: true,
        backdropCloseable: true,
      },
    });

    await wrapper.get(".modal-background").trigger("click");
    expect(emitsClose(wrapper)).toBeTrue();
  });

  test("when not backdropCloseable, it cannot be closed by clicking on the backdrop", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: true,
        closeable: true,
        backdropCloseable: false,
      },
    });

    await wrapper.get(".modal-background").trigger("click");
    expect(emitsClose(wrapper)).toBeFalse();
  });
});
