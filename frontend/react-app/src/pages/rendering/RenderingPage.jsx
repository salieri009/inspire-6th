import { useState } from 'react';
import Greeting from '../../components/rendering/Greeting';
import BackHome from '../../components/common/BackHome';

const RenderingPage = () => {
    //script
    const [flag, setFlag] = useState(false);
    //
    //ui
    return (
        <div style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
            <BackHome />
            <h1>Rendering Page</h1>
            <Greeting flag={flag} />
            <div>
                <button onClick={() => setFlag((prev) => !prev)}>
                    {flag ? '로그아웃' : '로그인'}
                </button>
            </div>
        </div>
    );
}
export default RenderingPage;
