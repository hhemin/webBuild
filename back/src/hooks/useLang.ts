import i18n from "@/lang";

export function PageLang() {
  const Lang = (key?: string) => {
    return i18n.t("button.edit");
  };
  return {
    Lang,
  };
}
