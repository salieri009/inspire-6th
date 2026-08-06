import { Card } from 'react-bootstrap';

const BlogCard = ({ post, onClick }) => {
    return (
        <Card className="mb-2" role="button" onClick={onClick}>
            <Card.Body>
                <Card.Title className="mb-1">{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">
                    {post.author} · {post.createdAt}
                </Card.Subtitle>
                {post.summary && (
                    <Card.Text className="text-truncate mb-0">{post.summary}</Card.Text>
                )}
            </Card.Body>
        </Card>
    );
};

export default BlogCard;
