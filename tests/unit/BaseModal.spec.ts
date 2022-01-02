import { mount } from '@vue/test-utils';
import BaseModal from '@/components/BaseModal.vue';

const DEFAULT_TEST_CONTENT = "Test content";

describe('BaseModal.vue', () => {
  describe('normal modal', () => {
    test('is closeable by button', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          show: true,
          closable: true,
        },
        slots: {
          default: DEFAULT_TEST_CONTENT,
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
          default: DEFAULT_TEST_CONTENT,
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
          default: DEFAULT_TEST_CONTENT,
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
          cardTitle,
        },
        slots: {
          cardBody: "Test card body",
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
        slots: {
          cardBody: "Test card body",
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

    test("can't be a card and normal modal at the same time", () => {
      expect(() =>  mount(BaseModal, {
        props: {
          show: true,
        },
        slots: {
          cardBody: "Test card body",
          default: "Test default content",
        }
      })).toThrow();
    });
  });
});
