
import '../../styles/book.css';

// 컴포넌트 밖에 있는 데이터는 렌더링될 때마다 다시 만들어지지 않는다.
// 바뀌지 않는 상수 데이터라면 이렇게 밖에 두는 편이 낫다.
const books = [
    { category: 'Fiction', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { category: 'Self-Help', title: 'Atomic Habits', author: 'James Clear' },
    { category: 'Science', title: 'A Brief History of Time', author: 'Stephen Hawking' },
];

// filter 는 조건에 맞는 원소만 골라 "새 배열"을 만든다. (원본은 그대로)
const scienceBooks = books.filter((book) => book.category === 'Science');
// map 은 각 원소를 변환해서 "새 배열"을 만든다.
const bookTitles = books.map((book) => book.title);

// book 객체를 props 로 받아서 화면 조각으로 바꾸는 컴포넌트.
// 컴포넌트 이름은 반드시 대문자로 시작해야 한다.
// 소문자로 시작하면 React 가 <div> 같은 일반 HTML 태그로 취급한다.
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
                    {/* JSX 안에서 JS 표현식을 쓰려면 중괄호 {} 로 감싼다.
                        중괄호 안에는 "값이 되는 표현식"만 들어갈 수 있다.
                        (if 문이나 for 문 같은 statement 는 못 쓴다
                         -> 대신 삼항연산자, && , map 을 쓴다)

                        조건부 렌더링 방법:
                          {isReady && <p>준비됨</p>}          -> 참일 때만 렌더링
                          {isReady ? <A /> : <B />}          -> 둘 중 하나
                        주의: {count && <p>..</p>} 처럼 숫자를 쓰면
                        count 가 0 일 때 화면에 "0" 이 그대로 찍힌다.
                        조건에는 반드시 boolean 을 쓸 것. */}

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

//===============================================================================
// key 개념
//===============================================================================
// 배열을 map 으로 렌더링할 때는 각 항목에 key 라는 특별한 props 를 줘야 한다.
// key 는 React 가 "이전 목록의 어떤 항목이 지금의 어떤 항목인지" 짝지을 때 쓴다.
// 그래서 key 는 형제 요소들 사이에서 유일하고, 리렌더링 사이에 변하지 않아야 한다.
//
// key 를 index 로 쓰면 안 되는 이유:
//   목록의 중간에 삽입/삭제/정렬이 일어나면 같은 index 가 다른 데이터를 가리키게 된다.
//   그러면 React 는 "같은 항목인데 내용만 바뀌었다"고 판단해서 DOM 을 재사용하고,
//   input 에 입력 중이던 값이나 focus 가 엉뚱한 행으로 옮겨붙는 버그가 생긴다.
//   -> 데이터 고유의 id 를 key 로 쓸 것.
//   (목록이 절대 바뀌지 않는다면 index 도 괜찮긴 하다)
//
// key 는 props 가 아니다. 자식 컴포넌트에서 props.key 로 읽을 수 없다.
// 값이 필요하면 별도 props 로 한 번 더 넘겨야 한다.

//===============================================================================
// 비동기 데이터와 렌더링 순서
//===============================================================================
// 렌더링은 즉시 일어나고 API 응답은 나중에 도착한다. 즉 첫 렌더링 시점에는 데이터가 없다.
// 그래서 초기값(빈 배열 등)으로 먼저 렌더링되고, 응답이 오면 state 가 바뀌며 다시 렌더링된다.
//
// 이때 초기값을 undefined 로 두면 data.map(...) 에서 바로 터진다.
// 대응 방법:
//   1) 초기값을 빈 배열 [] 로 준다        -> 가장 확실
//   2) optional chaining: data?.map(...)  -> data 가 없으면 undefined 반환
//   3) loading / error 상태를 따로 두고 분기해서 렌더링한다 (Comment.jsx 참고)
//
// 데이터 fetch 자체는 렌더링 중에 하면 안 되고 useEffect 안에서 해야 한다.
// 렌더링 함수 안에서 호출하면 매 렌더링마다 요청이 나가서 무한 루프가 된다.