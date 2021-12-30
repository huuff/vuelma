import { mount } from '@vue/test-utils';
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import { useRouter, RouterLink } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    getRoutes: () => {}, // eslint-disable-line
    currentRoute: () => {}, // eslint-disable-line
  })),
}));

const fakeStartRoute = { path: "/", name: "Start" };
const fakeMiddleRoute = { path: "/middle", name: "Middle" };
const fakeEndRoute = { path: "/middle/end", name: "End" };

describe('BaseBreadcrumb.vue', () => {
  const getRoutes = jest.fn(() => [ fakeStartRoute, fakeMiddleRoute, fakeEndRoute ]);
  const currentRoute =  { value: fakeEndRoute };

  (useRouter as jest.Mock).mockImplementationOnce(() => ({
    getRoutes, currentRoute
  }));

  const wrapper = mount(BaseBreadcrumb, {
    global: {
      stubs: [ 'router-link' ],
      renderStubDefaultSlot: true,
    }
  });

  const routerLinks = wrapper.findAllComponents('router-link-stub');
  test('it contains the current route', () => {
    expect(routerLinks[0].attributes().to).toBe(fakeStartRoute.path);
    expect(routerLinks[0].element.textContent).toBe(fakeStartRoute.name);
    expect(routerLinks[1].attributes().to).toBe(fakeMiddleRoute.path);
    expect(routerLinks[1].element.textContent).toBe(fakeMiddleRoute.name);
    expect(routerLinks[2].attributes().to).toBe(fakeEndRoute.path);
    expect(routerLinks[2].element.textContent).toBe(fakeEndRoute.name);
  });

  test('the last one is marked as current', () => {
    expect(routerLinks[2].attributes()["aria-current"]).toBe('page');    
    expect(wrapper.findAll("li")[2].element.classList).toContain('is-active');
  });
});
