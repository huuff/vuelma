import { mount } from '@vue/test-utils';
import BaseMessage from '@/components/BaseMessage.vue';
import BaseWrapper from '@vue/test-utils/dist/baseWrapper';

describe('BaseMessage.vue', () => {
  test("it shows the title", () => {
    const title = "Test title"
    const wrapper = mount(BaseMessage, {
      props: { title }
    });

    expect(wrapper.get('.message-header').text()).toBe(title);
  }); 

  test("it is not possible to have both a header and a title", () => {
    expect(() => mount(BaseMessage, {
      props: { title: "Test" },
      slots: { header: "<div>test</div>"},
    })).toThrow();
  })

  describe("when passing the show property", () => {
    const wrapper = mount(BaseMessage, {
      props: { show: false },
    });

    it("is not shown when show is false", () => {
      expect(wrapper.find('.message').isVisible()).toBeFalse();
    });

    it("is shown when show is changed to true", async () => {
      await wrapper.setProps({ show: true });

      expect(wrapper.find('.message').isVisible()).toBeTrue();
    });
  });

  describe("about the close button", () => {
    const show = true;
    const wrapper = mount(BaseMessage, {
      props: {
        show, closeable: true ,
      },
    });

    test("it is initially shown (sanity check)", () => {
      expect(wrapper.find('.message').isVisible()).toBe(true);
    })

    test("the close button is there", () => {
      expect(wrapper.find('button.delete').exists()).toBe(true);
    })

    test("when clicked, it's not there anymore", async () => {
      await(wrapper.get("button.delete").trigger('click'));

      expect(wrapper.find('.message').isVisible()).toBe(false);
    });
  });
});
