import { request } from 'umi';
import { get, post } from '@/utils/request';
import { system } from '@/config/api';

/** 登录接口 */
export async function login(data: object) {
  return post(system.login, data);
}

/** 退出登录接口 */
export async function logout(data: object) {
  return post(system.logout);
}

/** 获取当前用户 */
export async function getCurrentUser() {
  return get(system.user);
}

/** 获取当前用户菜单 */
export async function getMenu() {
  return get(system.menu);
}
