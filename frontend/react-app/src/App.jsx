import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import ButtonPage from './pages/material/ButtonPage';
import CapacityPage from './pages/reactive/CapacityPage';
import LibraryPage from './pages/sample/LibraryPage';
import CommentPage from './pages/sample/CommentPage';
import RenderingPage from './pages/rendering/RenderingPage';
import EventPage from './pages/event/EventPage';
import SuccessPage from './pages/event/SuccessPage';
import ErrorPage from './pages/event/ErrorPage';
import ViewPage from './pages/event/ViewPage';

import SignupPage from './features/user/Signuppage';
import SigninPage from './features/user/Signinpage';

import BlogIndexPage from './features/blog/BlogIndexpage';
import BlogReadPage from './features/blog/BlogReadPage';
import BlogWritePage from './features/blog/BlogWritePage';

// 앱 전체에서 BrowserRouter 는 여기 한 곳에서만 감싼다.
// (예전에는 TestRouterApp / ToyRouterApp / BlogApp 이 각자 BrowserRouter 를
//  따로 갖고 있었는데, 그중 어느 것도 index.js 에서 실제로 렌더링되지 않았다.
//  라우터를 하나로 합쳐서 모든 페이지를 이 트리 하나로 접근할 수 있게 한다.)
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/samples/button" element={<ButtonPage />} />
                <Route path="/samples/capacity" element={<CapacityPage />} />
                <Route path="/samples/library" element={<LibraryPage />} />
                <Route path="/samples/comment" element={<CommentPage />} />
                <Route path="/samples/rendering" element={<RenderingPage />} />
                <Route path="/samples/event" element={<EventPage />} />
                <Route path="/samples/event/success" element={<SuccessPage />} />
                <Route path="/samples/event/error" element={<ErrorPage />} />
                <Route path="/samples/view/:id" element={<ViewPage />} />

                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />

                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/write" element={<BlogWritePage />} />
                <Route path="/blog/:postId" element={<BlogReadPage />} />
                <Route path="/blog/:postId/edit" element={<BlogWritePage />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
