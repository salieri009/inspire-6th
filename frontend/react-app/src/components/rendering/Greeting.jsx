import UserGreeting from './UserGreeting';
import GuestGreeting from './GuestGreeting';

const Greeting = (props) => {
    return props.flag ? <UserGreeting /> : <GuestGreeting />;
    // Greeting 컴포넌트는 props.flag 값에 따라 UserGreeting 또는 GuestGreeting 컴포넌트를 렌더링한다.
}

export default Greeting;
