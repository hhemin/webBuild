import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store";
import elementVariables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";

export interface ISettingsState {
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  sidebarTextTheme: boolean;
}

@Module({ dynamic: true, store, name: "settings" })
class Settings extends VuexModule implements ISettingsState {
  public theme = elementVariables.theme;
  public fixedHeader = defaultSettings.fixedHeader || true; // 固定 Header
  public showSettings = defaultSettings.showSettings;
  public showTagsView = defaultSettings.showTagsView; // 显示 Tags-View
  public showSidebarLogo = defaultSettings.showSidebarLogo || true; // 显示侧边栏 Logo
  public sidebarTextTheme = defaultSettings.sidebarTextTheme; // 侧边栏文字主题色

  @Mutation
  private CHANGE_SETTING(payload: { key: string; value: any }) {
    const { key, value } = payload;
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value;
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any }) {
    this.CHANGE_SETTING(payload);
  }
}

export const SettingsModule = getModule(Settings);
