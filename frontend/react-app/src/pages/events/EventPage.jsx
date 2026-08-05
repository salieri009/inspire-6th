import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { api } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
// navigate 는 react-router-dom v6 부터 useHistory 대신 쓰는 hook 이다.

// transition 을 위한 hook 은 use

// bootstrap css 는 앱 전체에 한 번만 import 하면 된다 (src/index.js 에서 처리).
// 컴포넌트마다 import 하면 같은 css 가 중복으로 번들에 들어간다.

const EventPage = () => {
    // 이벤트는 "어떤 입력이 바뀌었는지"를 함수로 처리한다.
    // 폼 입력값은 state로 관리해야 화면과 데이터가 항상 동기화된다.
    // value + onChange 를 같이 주는 방식을 controlled component 라고 한다.
    // value 만 주고 onChange 를 빼면 입력이 안 되는 read-only 가 되니 주의.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');

    const emailHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    // checkbox 는 event.target.value 가 아니라 event.target.checked 를 읽어야 한다.
    const rememberHandler = (event) => {
        setRemember(event.target.checked);
    };

    const submitHandler = (event) => {
        // form 의 기본 동작(페이지 새로고침)을 막는다.
        // SPA 에서 새로고침이 일어나면 state 가 전부 초기화되므로 반드시 필요하다.
        event.preventDefault();
        console.log({ email, password, remember });
    };

    // 회원가입은 서버의 상태를 바꾸는 요청이므로 GET 이 아니라 POST 를 써야 한다.
    // GET 으로 보내면 비밀번호가 URL query string 에 남아
    // 브라우저 기록 / 서버 access log / referer 헤더에 그대로 노출된다.
    const signupHandler = async () => {
        try {
            const response = await api.post('/signup', {
                username: email,
                password,
            });
            setMessage('가입 성공');
            console.log(response.data);
        } catch (requestError) {
            // axios 는 4xx/5xx 를 예외로 던지므로 try/catch 로 받아야 한다.
            setMessage('가입 실패');
            console.error(requestError);
        }
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Event Page</h1>
            <p className="text-muted">
                입력 이벤트가 발생할 때마다 state를 갱신하는 기본 패턴을 보여준다.
            </p>

            <form onSubmit={submitHandler}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={passwordHandler}
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={remember}
                        onChange={rememberHandler}
                    />
                    <label className="form-check-label" htmlFor="remember">
                        Remember me
                    </label>
                </div>

                {/* form 안의 button 은 기본 type 이 submit 이다.
                    submit 이 아닌 버튼은 반드시 type="button" 을 명시해야
                    클릭할 때 form 이 같이 제출되지 않는다. */}
                <Button type="submit" variant="primary" className="me-2">
                    Submit
                </Button>
                <Button type="button" variant="outline-secondary" onClick={signupHandler}>
                    Sign up
                </Button>
            </form>

            {message && <p className="mt-3">{message}</p>}

            {/* 현재 입력값을 눈으로 확인하면 이벤트와 state 연결을 이해하기 쉽다. */}
            <pre className="mt-4 bg-light p-3 rounded">
                {JSON.stringify({ email, password, remember }, null, 2)}
            </pre>
        </div>
    );
};

export default EventPage;

// event 는 "어떤 입력이 바뀌었는지"를 함수로 처리한다.
// event bubbling 은 이벤트가 발생한 요소에서 상위 요소로 이벤트가 전파되는 현상이다.
// stopPropagation() 으로 이벤트 전파를 막을 수 있다.
// preventDefault() 는 "기본 동작"을 막는 것이고, stopPropagation() 은 "전파"를 막는 것이다.
// 둘은 서로 다른 개념이니 헷갈리지 말 것.

//===============================================================================
// 인증 / 세션 개념 정리
//===============================================================================
// http 는 stateless protocol 이다 -> 요청 간에 상태를 기억하지 않는다.
//   (connectionless 는 "연결을 유지하지 않는다"는 별개 개념이다.
//    http/1.1 부터는 keep-alive 로 연결을 재사용하므로 엄밀히는 connectionless 가 아니다.)
// 그래서 로그인 상태를 유지하려면 별도의 수단이 필요하다.
//
// 1) cookie + session : 서버가 세션을 저장하고 브라우저는 세션 ID 만 들고 다닌다.
//    서버가 여러 대로 늘어나면 세션 공유(sticky session, redis 등)가 필요해진다.
// 2) token : 서버가 상태를 저장하지 않아도 되어 확장에 유리하다. 보통 JWT 를 쓴다.
//
// JWT = JSON Web Token, header.payload.signature 세 부분으로 구성된다.
// 중요: JWT 는 base64url 로 "인코딩"된 것이지 "암호화"된 것이 아니다.
//       누구나 디코딩해서 payload 를 읽을 수 있으므로 비밀번호 같은 민감정보를 넣으면 안 된다.
//       signature 가 보장하는 것은 기밀성이 아니라 "위변조되지 않았음"이다.
//
// Access Token  : 권한을 증명하는 토큰. 유효기간이 짧다 (분~시간 단위).
// Refresh Token : access token 을 재발급받는 토큰. 유효기간이 길다 (일~주 단위).
//                 탈취 시 피해가 크므로 서버에 저장/관리하고,
//                 브라우저에서는 httpOnly 쿠키에 두는 방식이 일반적이다.
//                 localStorage 에 두면 XSS 로 그대로 탈취당한다.
