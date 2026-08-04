
import '../../styles.css/book.css';

const books = [
    { category: 'Fiction', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { category: 'Self-Help', title: 'Atomic Habits', author: 'James Clear' },
    { category: 'Science', title: 'A Brief History of Time', author: 'Stephen Hawking' },
];

const scienceBooks = books.filter((book) => book.category === 'Science');
const bookTitles = books.map((book) => book.title);
const Book = (props) => {
    return (
        <div>
            <div>
                <span>카테고리 : {props.category}</span>
            </div>
        </div>
    );
}
// book 이라는 obj 의 props 를 받아서, book.title, book.author, book.category 를 보여주도록 한다


const BookCard = ({ book }) => {
    return (
        <li className="wrapper">
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
                    {/* //path: src/pages/Sample/LibraryPage.jsx
                    //return (book.category === 'Science') && (
                    //     <li key={book.title}>
                    //         <strong>{book.title}</strong>
                    // 아니면 Book 이라는 instnace 를 만들어서, book 을 props 로 전달해서, BookCard 에서 book.title, book.author, book.category 를 보여주도록 한다
                     html 영역에서 t사용할려면 중괄호를 사용해야함*/}

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

// keys 라는 idx 를 꺼내고 props 를 가져오는 것도 가능하다 -> 이게 hash map 의 기본