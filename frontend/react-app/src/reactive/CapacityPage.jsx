import { useState } from 'react';
import Button from '../components/materials/materialButton';

const CapacityPage = () => {
    console.log("CapacityPage rendered");
    const [cnt, setCnt] = useState(0);
    //===============================================================================
    // state 를 관리하는 방법은 useState 를 사용한다
    // 입장인원
    // 입장 퇴장 
    // 입장버튼을 클릭하면 인원이 증가하고, 퇴장버튼을 클릭하면 인원이 감소한다
    // 인원이 꽉 차거나, 0이 되면 버튼을 비활성화 시킨다
    //===============================================================================
    return (
        <div>
            <p>입장인원 : {cnt}</p>
            <Button title="입장" variant="contained" color="primary" onClick={() => setCnt((prev) => prev + 1)} />
            <Button title="퇴장" variant="contained" color="secondary" onClick={() => setCnt((prev) => Math.max(0, prev - 1))} />
        </div>
    );

}

export default CapacityPage;

// react 에서 state 를 관리하는 방법은 useState 를 사용한다
// useState 는 state 를 관리하는 hook 이다 -> 일단 개념 그 자체는 상태를 저장하는 것을 말한다