// 페이지 로드 후 스켈레톤 UI 를 먼저 보여주고, 데이터가 오면 실제 카드로 교체한다.

// 카드 목록을 렌더링할 컨테이너를 가져온다.
const container = document.querySelector('#card-container');
// 지연 시간을 주기 위한 Promise 헬퍼다.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 전달받은 데이터를 실제 카드 UI로 렌더링한다.
const renderCards = (items) => {
    // 컨테이너가 없으면 작업을 중단한다.
    if (!container) return;

    // 카드 마크업을 생성해서 컨테이너에 넣는다.
    container.innerHTML = items
    //map 은 할당하는 것
        .map(
            (item) => `
                <article class="card">
                    <div class="card__image">
                        <!-- 카드 이미지와 대체 텍스트를 출력한다. -->
                        <img src="${item.image ?? ''}" alt="${item.title ?? 'card image'}" />
                    </div>
                    <div class="card__body">
                        <!-- 카드 제목을 출력한다. -->
                        <h3 class="card__title">${item.title ?? ''}</h3>
                        <!-- 카드 설명을 출력한다. -->
                        <p class="card__description">${item.description ?? ''}</p>
                    </div>
                </article>
            `
        )
        .join('');
        //묶여버려~ 
        // card 안에 div 테그를 가져온다고해도됨
        // tolocalString 으로 해도됨 
        // skeleton ui 는 데이터가 로딩되기 전 보여줄 UI 이므로, 실제 데이터가 오면 renderCards 함수로 교체된다.
        // 전체흐름은
        // 데이터가 loadData 함수에서 fetch 로 불러오고,
        //
        //  그 전에 showSkeletonUI 로 스켈레톤 UI 를 보여주고, 
        // 데이터가 오면 renderCards 로 실제 카드로 교체하는 흐름이다.


};

// 데이터가 로딩되기 전 보여줄 스켈레톤 UI 를 렌더링한다.
const showSkeletonUI = (count = 6) => {
    // 컨테이너가 없으면 작업을 중단한다.
    if (!container) return;

    // 지정된 개수만큼 스켈레톤 카드를 생성한다.

    container.innerHTML = Array.from({ length: count })
        .map(
            () => `
                <article class="card card--skeleton" aria-busy="true" aria-hidden="true">
                    <!-- 이미지 자리 스켈레톤 -->
                    <div class="skeleton skeleton--image"></div>
                    <div class="card__body">
                        <!-- 제목 자리 스켈레톤 -->
                        <div class="skeleton skeleton--title"></div>
                        <!-- 본문 첫 줄 스켈레톤 -->
                        <div class="skeleton skeleton--text"></div>
                        <!-- 본문 짧은 줄 스켈레톤 -->
                        <div class="skeleton skeleton--text short"></div>
                    </div>
                </article>
            `
        )
        .join('');
};

// 함수가 함수를 할당 받는 것도 가능
// container.innerhtml = items.map(renderCard).join('') 이런식으로도 가능
//

// 데이터를 불러오고, 준비되는 동안 스켈레톤을 보여준다.
const loadData = async () => {
    // 로딩 시작 로그를 남긴다.
    console.log('Loading skeleton UI...');
    // 먼저 스켈레톤 UI 를 보여준다.
    showSkeletonUI();

    // 의도적으로 지연 시간을 준다.
    await delay(2000);

    // 로컬 JSON 파일에서 데이터를 요청한다.
    const response = await fetch('../server/data.json');
    // 응답이 정상인지 확인한다.
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    // 응답 JSON 을 파싱한다.
    const data = await response.json();

    // 배열 또는 items 필드에서 카드 목록을 추출한다.
    const items = Array.isArray(data) ? data : data.items ?? [];
    // 실제 카드로 교체한다.
    renderCards(items);

    // 원본 데이터를 반환한다.
    return data;
};

// DOM 이 준비되면 데이터 로딩을 시작한다.
document.addEventListener('DOMContentLoaded', () => {
    // 에러는 콘솔에 남기고 실패 메시지를 화면에 보여준다.
    loadData().catch((error) => {
        console.error('Failed to load data:', error);
        if (container) {
            // 데이터 로딩 실패 시 안내 문구를 표시한다.
            container.innerHTML = '<p>데이터를 불러오지 못했습니다.</p>';
        }
    });
});

// 이제 다음에는 compoennt 로 할건데
// jsx- -> script 파일을 활용한 것임
// -> react 
// script 파일을 활용한 것임
// 부품을 만드는 것
// 재 사용성이 있는 부품을 만드는 것임
// module -> 다른 파일에서 가져다 쓸 수 있음
// export default function Card({ title, description, image }) {
//    return (
//        <article className="card">
//            <div className="card__image">
//                <img src={image ?? ''} alt={title ?? 'card image'} />
// export 

// component -> 재사용성이 있는 부품을 만드는 것임
// props ->  component 에서 만들어내는것
// elmeenet -> browser 에서 이용할수잇는것
// 프로그래밍에서 재사용성은
// 독립적으로 재 사용을 할 수 있어야한다 
// brwoser 밖에서 사용가능하게 해줌 -> 노드
// git -> 로컬에서 project 관리가 가능
// github -> 원격에서 project 관리가 가능

// 리엑트를 만드는건 
// CRA(CREATE REACT APP) -> react 를 쉽게 만들수있게 해주는것 
// vite -> CRA 보다 빠르게 react 를 만들수있게 해주는것
// NPX -> NPM (NODE PACKAGE MANAGER) 의 실행기능
