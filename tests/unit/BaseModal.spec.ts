import { mount } from '@vue/test-utils';
import BaseModal from '@/components/modal/BaseModal.vue';
import CardModal from '@/components/modal/CardModal.vue';

const defaultTestContent = "Test content";

describe('BaseModal.vue', () => {
  describe('normal modal', () => {
    test('is closeable by button', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          show: true,
          closable: true,
        },
        slots: {
          default: defaultTestContent,
        },
      });

      await wrapper.get('.modal-close').trigger('click');

      expect(Object.keys(wrapper.emitted())).toContain('update:show');
      expect((wrapper.emitted()["update:show"][0] as boolean[])[0]).toBe(false);
    });

    test('it is closeable by backdrop', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          show: true,
          closable: true,
          backdropCloseable: true
        },
        slots: {
          default: defaultTestContent,
        },
      });

      await wrapper.get('.modal-background').trigger('click');

      expect(Object.keys(wrapper.emitted())).toContain('update:show');
      expect((wrapper.emitted()["update:show"][0] as boolean[])[0]).toBe(false);
    });

    describe('when backdropCloaseable is false', () => {
      const wrapper = mount(BaseModal, {
        props: {
          show: true,
          closable: true,
          backdropCloseable: false,
        },
        slots: {
          default: defaultTestContent,
        },
      });

      test("it's not closeable by backdrop", async () => {
        await wrapper.get('.modal-background').trigger('click');

        expect(Object.keys(wrapper.emitted())).not.toContain('update:show');
      });

      test("but it's still closeable by button", async () => {
        await wrapper.get('.modal-close').trigger('click');

        expect(Object.keys(wrapper.emitted())).toContain('update:show');
        expect((wrapper.emitted()["update:show"][0] as boolean[])[0]).toBe(false);
      });
    });
  });

  describe('card modal', () => {
    test("it includes the title", () => {
      const cardTitle = "Test title";
      const wrapper = mount(BaseModal, {
        props: { 
          show: true,
        },
        global: {
          components: {
            "card-modal": CardModal,
          },
        },
        slots: {
          default: `
            <card-modal title="${cardTitle}" />
          `
        }
      });

      expect(wrapper.get('.modal-card-title').text()).toBe(cardTitle);
    });

    describe("for closing", () => {
      const wrapper = mount(BaseModal, {
        props: {
          show: true,
          closeable: true,
        },
        global: {
          components: {
            "card-modal": CardModal,
          },
        },
        slots: {
          default: `
            <card-modal>Test modal</card-modal> 
          `
        }
      });

      test("there is a delete button", () => {
        expect(wrapper.find('button.delete').exists()).toBeTrue();
      });

      test("that when clicked, emits a close event", async () => {
        await wrapper.get("button.delete").trigger("click");

        expect(Object.keys(wrapper.emitted())).toContain('update:show');
        expect((wrapper.emitted()["update:show"][0] as boolean[])[0]).toBe(false);
      });
    });

  });
});
