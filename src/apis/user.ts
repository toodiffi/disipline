import request from '@/utils/request';
import { IPlan } from '@/types/plan';

// 登录
export const login = (data: { code: string }) =>
  request({
    url: '/api/user/login',
    method: 'POST',
    data
  });
// 创建计划
export const postCreatePlan = (data: IPlan) =>
  request({
    url: '/api/user/plan/create',
    method: 'POST',
    data
  });
// 获取计划
export const getUserPlan = () =>
  request({
    url: '/api/user/plan',
    method: 'GET'
  });
// 更新计划
export const putUpdateUserPlan = (data: IPlan) =>
  request({
    url: '/api/user/plan/update',
    method: 'PUT',
    data
  });
// 删除计划
export const deleteUserPlan = (planId: string) =>
  request({
    url: `/api/user/plan/delete/${planId}`,
    method: 'DELETE'
  });
