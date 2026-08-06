import { Link } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

// 이 프로젝트에서 만든 모든 페이지로 이동할 수 있는 진입점.
// 새 페이지를 추가하면 이 목록에도 링크를 함께 추가한다.
const sections = [
    {
        title: '계정',
        links: [
            { to: '/signup', label: '회원가입' },
            { to: '/signin', label: '로그인' },
        ],
    },
    {
        title: '블로그',
        links: [
            { to: '/blog', label: '블로그 목록 / 글쓰기 / 상세' },
        ],
    },
    {
        title: '학습 예제',
        links: [
            { to: '/samples/button', label: 'Button (MUI + styled-components)' },
            { to: '/samples/capacity', label: 'Capacity (useState 카운터)' },
            { to: '/samples/library', label: 'Library (filter / map)' },
            { to: '/samples/comment', label: 'Comment (fetch + 로딩/에러 처리)' },
            { to: '/samples/rendering', label: 'Rendering (조건부 렌더링)' },
            { to: '/samples/event', label: 'Event (controlled form + axios)' },
            { to: '/samples/event/success', label: 'Success Page (location.state / searchParams)' },
            { to: '/samples/event/error', label: 'Error Page' },
            { to: '/samples/view/1?category=book&sort=asc', label: 'View (useParams / useSearchParams)' },
        ],
    },
];

const HomePage = () => {
    return (
        <Container className="py-4" style={{ maxWidth: 720 }}>
            <h1 className="mb-4 h3">React 학습 프로젝트</h1>
            {sections.map((section) => (
                <div className="mb-4" key={section.title}>
                    <h2 className="h6 text-muted mb-2">{section.title}</h2>
                    <ListGroup>
                        {section.links.map((link) => (
                            <ListGroup.Item as={Link} to={link.to} key={link.to} action>
                                {link.label}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            ))}
        </Container>
    );
};

export default HomePage;
