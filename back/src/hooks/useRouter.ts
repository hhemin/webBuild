import router from "@/router";
import RouterMap from "@/utils/routerMap";

export function useRouter() {
  function skipPage(path: string, query: Record<string, any>) {
    router.push({
      path,
      query: { ...query },
    });
  }
  // 采用字典传参
  function skipPageMap(routerMapName: any, query: Record<string, any>) {
    router.push({
      path: RouterMap[routerMapName] || "/",
      query: { ...query },
    });
  }

  return {
    skipPage,
    skipPageMap,
  };
}
