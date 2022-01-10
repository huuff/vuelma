import { mount } from "@vue/test-utils";
import BaseModal from "@/components/modal/BaseModal.vue";
import CardModal from "@/components/modal/CardModal.vue";
import { emittedHide } from "../util";

function buildWrapper(cardHtml: string, opts: { closeable: boolean; } = { closeable: true }) {
  return mount(BaseModal, {
    props: {
      closeable: opts.closeable, 
    },
    global: {
      components: {
        "card-modal": CardModal,
      },
    },
    slots: {
      default: cardHtml,
    },
  });
}

describe("CardModal.vue", () => {
  test("titleText is shown in header", () => {
    const titleText = "testtitle";
    const wrapper = buildWrapper(`
      <card-modal titleText="${titleText}"></card-modal>
    `);

    expect(wrapper.get(".modal-card-title").text()).toBe(titleText);
  });

  test("there is no close button when not closeable", () => {
    const wrapper = buildWrapper(`
      <card-modal titleText="test" />
    `, { closeable: false });

    expect(wrapper.find(".delete").exists()).toBeFalse();
  });

  describe("when closeable", () => {
    const wrapper = buildWrapper(`
      <card-modal titleText="test" />
    `, { closeable: true })

    test("it's initially shown (sanity check)", () => {
      expect(wrapper.element.classList).toContain("is-active");
    });

    test("there's a close button", () => {
      expect(wrapper.find(".delete").exists()).toBeTrue();
    });

    test("when clicked, it's not visible anymore", async () => {
      await (wrapper.find(".delete").trigger("click"));

      expect(wrapper.element.classList).not.toContain("is-active");
    });

    test("it emitted a close event", () => {
      expect(emittedHide(wrapper)).toBe(true);
    });
  });

  test("it cannot be created with both a header and a title", () => {
    expect(() => buildWrapper(`
      <card-modal titleText="test">
        <template #header>
          Header
        </template>
      </card-modal>
    `)).toThrow();
  });
});
