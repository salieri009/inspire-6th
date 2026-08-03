
const books = [
    { category: 'Fiction', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { category: 'Self-Help', title: 'Atomic Habits', author: 'James Clear' },
    { category: 'Science', title: 'A Brief History of Time', author: 'Stephen Hawking' },
];

const scienceBooks = books.filter((book) => book.category === 'Science');
const bookTitles = books.map((book) => book.title);

const BookCard = ({ book }) => {
    return (
        <li>
            <strong>{book.title}</strong>
            <div>{book.author}</div>
            <small>{book.category}</small>
        </li>
    );
};

const LibraryPage = () => {
    return (
        <div>
            <h1>Library Page</h1>
            <p>
                JSX는 JavaScript 안에서 HTML처럼 보이는 문법을 사용해서 UI를 선언적으로
                만드는 방식입니다.
            </p>

            <section>
                <h2>JSX 개념</h2>
                <ul>
                    <li>위쪽 script 영역에서 데이터와 함수를 준비합니다.</li>
                    <li>아래쪽 return 영역에서 UI를 JSX로 작성합니다.</li>
                    <li>filter는 조건에 맞는 데이터만 먼저 고릅니다.</li>
                    <li>map은 고른 데이터를 화면 요소로 바꿉니다.</li>
                </ul>
            </section>

            <section>
                <h2>filter 예시</h2>
                <ul>
                    {scienceBooks.map((book) => (
                        <BookCard key={book.title} book={book} />
                    ))}
                </ul>
            </section>

            <section>
                <h2>map 예시</h2>
                <ul>
                    {bookTitles.map((title) => (
                        <li key={title}>{title}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default LibraryPage;
