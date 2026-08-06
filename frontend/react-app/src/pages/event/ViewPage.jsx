import {userParams} from 'react-router-dom';
// 이건 user 가 이동(navigate)할 때 넣어준 state.from 으로 확인 가능하다.
// useParams 는 URL path 에서 :key 로 지정한 값을 읽는다. (v6 부터는 useParams 로 통합됨)
// path="/events/:eventId" 처럼 :eventId 로 지정하면 useParams().eventId 로 읽을 수 있다.

const viewPage = () => {
    const {id} = userParams();
    console.log("viewPage id:", ${id});


}

export default view;


// Link/{1} to="/viewPage"  // viewPage.jsx 로 이동
// Link/{2} to="/viewPage?category=book&sort=asc"  // viewPage.jsx 로 이동 + query string 전달
// 이렇게도 가능하고, {id}라는 key 값으로 진행할 수있겟다

