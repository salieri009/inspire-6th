import { Link, useLocation, useSearchParams } from 'react-router-dom';

// useLocation().state 와 useSearchParams() 는 둘 다 "이전 화면에서 넘어온 정보"를 읽지만 성격이 다르다.
// - location.state : navigate('/success', { state: {...} }) 로 넘긴 휘발성 데이터.
//   새로고침하면 사라지고, URL 에 노출되지 않는다. (사용자, 폼 값처럼 민감하거나 임시인 데이터에 적합)
// - searchParams   : URL 의 ?key=value 부분. 새로고침해도 유지되고, 링크로 공유/북마크 가능하다.
//   (필터, 정렬처럼 화면 상태를 URL 로 표현하고 싶을 때 적합)
const SuccessPage = () => {
    const location = useLocation();
    const { user, from } = location.state || {}; // location.state 가 없을 수도 있으니 방어 코드 필요
    // 어디서 뭘 했는지는 user 가 이동(navigate)할 때 넣어준 state.from 으로 확인 가능하다.

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');

    return (
        <div>
            <h1>Success Page</h1>
            <p>Your action was successful!</p>
            {user && <p>Welcome, {user}!</p>}
            {from && <p>Redirected from: {from}</p>}
            {(category || sort) && (
                <p>
                    {category && `Category: ${category}`}
                    {category && sort && ' / '}
                    {sort && `Sort: ${sort}`}
                </p>
            )}
            <Link to="/events">Go back to Events</Link>
        </div>
    );
};

export default SuccessPage;

//===============================================================================
// react-router-dom v6 에서 Link 는 a 태그 대신 쓰는 컴포넌트이다.
// Link 의 to 속성에는 이동할 경로를 넣는다. ("/" 는 루트 경로)
// Link 는 페이지를 새로고침하지 않고 이동한다. (SPA)
// props 랑 다른 점은 
// query string 을 넣을 때는 to 에 객체를 넣어야 한다. (v5 는 문자열로 가능)
// 변수명과 축약문법이 동일할때 state로 공유할수잇다