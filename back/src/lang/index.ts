import Vue from "vue";
import VueI18n from "vue-i18n";

import { getLanguage } from "@/utils/cookies";

// element-ui built-in lang
import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN";
import elementEsLocale from "element-ui/lib/locale/lang/es";
import elementJaLocale from "element-ui/lib/locale/lang/ja";
import elementKoLocale from "element-ui/lib/locale/lang/ko";
import elementItLocale from "element-ui/lib/locale/lang/it";
import elementZhTwLocale from "element-ui/lib/locale/lang/zh-TW";

// 语言包
import EN from "@/lang/en/index";
import ZHCN from "@/lang/zh-cn/index";
import ZHTW from "@/lang/zh-tw/index";
import ES from "@/lang/es/index";
import JA from "@/lang/ja/index";
import KO from "@/lang/ko/index";
import IT from "@/lang/it/index";

Vue.use(VueI18n);

const messages = {
  en: {
    ...EN,
    ...elementEnLocale,
  },
  zh: {
    ...ZHCN,
    ...elementZhLocale,
  },
  zhtw: {
    ...ZHTW,
    ...elementZhTwLocale,
  },
  es: {
    ...ES,
    ...elementEsLocale,
  },
  ja: {
    ...JA,
    ...elementJaLocale,
  },
  ko: {
    ...KO,
    ...elementKoLocale,
  },
  it: {
    ...IT,
    ...elementItLocale,
  },
};

export const getLocale = () => {
  const cookieLanguage = getLanguage();
  if (cookieLanguage) {
    document.documentElement.lang = cookieLanguage;
    return cookieLanguage;
  }

  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      document.documentElement.lang = locale;
      return locale;
    }
  }

  // Default language is english
  return "en";
};

const i18n = new VueI18n({
  locale: getLocale(),
  messages,
});

export default i18n;
