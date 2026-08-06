import { useParams, useSearchParams } from 'react-router-dom';
import BackHome from '../../components/common/BackHome';
// useParams 는 URL path 에서 :key 로 지정한 값을 읽는다. (v6 부터는 useParams 로 통합됨)
// path="/samples/view/:id" 처럼 :id 로 지정하면 useParams().id 로 읽을 수 있다.

const ViewPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');

    return (
        <div style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
            <BackHome />
            <h1>View Page</h1>
            <p>id: {id}</p>
            {(category || sort) && (
                <p>
                    {category && `category: ${category}`}
                    {category && sort && ' / '}
                    {sort && `sort: ${sort}`}
                </p>
            )}
        </div>
    );
};

export default ViewPage;

// Link to="/samples/view/1"  // ViewPage 로 이동
// Link to="/samples/view/1?category=book&sort=asc"  // ViewPage 로 이동 + query string 전달
