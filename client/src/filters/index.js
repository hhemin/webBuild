import {roleOption} from "@/utils/options.js"

// 过滤出options目标label值
function filterOptionsTargetLabel(options, targetType) {
  return options.filter((item) => item.value === String(targetType))[0]?.label ?? '';
}

// 角色状态
export const roleOptionFilterToName = (type) => {
  return filterOptionsTargetLabel(roleOption, type);
};