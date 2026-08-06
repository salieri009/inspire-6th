import { api } from '../../../api/axios';

// 사용자 리소스 경로. 로그인/회원가입 요청이 이 경로를 기준으로 파생된다.
const BASE_PATH = '/user';

export const signin = (credentials) => api.post(`${BASE_PATH}/signin`, credentials).then((res) => res.data);

export const signup = (member) => api.post(`${BASE_PATH}/signup`, member).then((res) => res.data);
