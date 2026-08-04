

import axios from 'axios';

// export const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL, // .env 에서 가져온 환경 변수 사용
// });

//개발단계와 배포단계

const endPoint = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_API_URL;

export const api = axios.create({
    baseURL: endPoint, // .env 에서 가져온 환경 변수 사용
});

// 이렇게 사용도가능 