import { get, post } from '@/utils/request';
import { user } from '@/config/api';

/** 获取当前用户 */
export async function getCurrentUser(params: object) {
    return get(user.userList, params);
}
