import request from "@/utils/request";

export async function getMenuList() {
  return request('/api/sys/menu/list');
}

export async function getTreeList() {
  return request('/api/sys/role/queryTreeList');
}

export async function removeMenu(params) {
  return request('/api/sys/menu/removeMenu', {
    method: 'DELETE',
    data: { ...params },
  });
}

export async function addMenu(params) {
  return request('/api/sys/menu/addMenu', {
    method: 'POST',
    data: { ...params },
  });
}

export async function updateMenu(params) {
  return request('/api/sys/menu/updateMenu', {
    method: 'PUT',
    data: { ...params },
  });
}