import request from "@/utils/request";

// export async function getMenuList(params) {
//   return request('/api/sys/menu/list', {
//     method: 'POST',
//     data: { ...params },
//   });
// }
export async function getMenuList() {
  return request('/api/sys/menu/list');
}

export async function getTreeList() {
  return request('/api/sys/role/queryTreeList');
}