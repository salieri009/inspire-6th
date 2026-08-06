

const TestRouterApp = () => {
    return  (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/events/:eventId" element={<EventDetailPage />} />
            // 내부에는 route 들만 들어가야 한다. (div 등 다른 태그를 넣으면 에러)
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/viewPage" element={<ViewPage />} />
            </Routes>
        </BrowserRouter>
    )
}


        //BrowserRouter 는 react-router-dom v6 부터 Router 를 감싸는 최상위 컴포넌트로 쓰인다.
        // element 는 component 을 넣어야 한다. (JSX 태그를 넣으면 에러)
        // path 는 URL 경로를 의미한다. ("/" 는 루트 경로)
        // router 에서 등록하는 path 의 이름은 component 의 이름과 상관없다. (URL 은 자유롭게 정할 수 있다)
        // react-router-dom v6 부터는 Switch 대신 Routes 를 쓰고, Route 의 component 대신 element 를 쓴다.
        // 


export default TestRouterApp;
