import { AsyncComponentPromise } from "vue/types/options";

export interface IDynamicComponent {
  [key: string]: AsyncComponentPromise;
}

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/
export interface IRouter {
  path: string;
  component: AsyncComponentPromise;
  name: string;
  redirect?: string;
  meta?: Partial<{
    roles: Array<string>;
    title: string;
    icon: string;
    elicon: string;
    hidden: boolean;
    alwaysShow: boolean;
    breadcrumb: boolean;
    noCache: boolean;
    affix: boolean;
    activeMenu: string;
  }>;
  children?: Array<IRouter>;
}
