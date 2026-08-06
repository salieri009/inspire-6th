import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogIndexPage from './BlogIndexpage';
import BlogReadPage from './BlogReadPage';
import BlogWritePage from './BlogWritePage';

// blog 기능만 독립적으로 붙여볼 수 있도록 자체 라우터를 갖는다.
// 이미 BrowserRouter 로 감싸는 상위 앱이 생기면 이 컴포넌트는
// <Routes> 이하 내용만 그 라우터 안으로 옮기면 된다.
const BlogApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/write" element={<BlogWritePage />} />
                <Route path="/blog/:postId" element={<BlogReadPage />} />
                <Route path="/blog/:postId/edit" element={<BlogWritePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default BlogApp;
