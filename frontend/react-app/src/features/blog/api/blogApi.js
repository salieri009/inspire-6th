import { api } from '../../../api/axios';

// 게시글 리소스 경로. 모든 요청이 이 경로 하나를 기준으로 파생된다.
const BASE_PATH = '/posts';

export const getPosts = () => api.get(BASE_PATH).then((res) => res.data);

export const getPost = (postId) => api.get(`${BASE_PATH}/${postId}`).then((res) => res.data);

export const createPost = (post) => api.post(BASE_PATH, post).then((res) => res.data);

export const updatePost = (postId, post) => api.put(`${BASE_PATH}/${postId}`, post).then((res) => res.data);

export const deletePost = (postId) => api.delete(`${BASE_PATH}/${postId}`).then((res) => res.data);
