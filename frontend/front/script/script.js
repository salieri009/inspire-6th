var message =  document.getElementById("message");
// 이로코롬 데이터 가져올수도 있음
// var 같은 경우는 scope 가 function 단위로 제한됨


let object = { 
    name : "홍길동",
    age : 30,
    address : "서울시 강남구 테헤란로 123",
    request : "배송 시간은 오후 2시 이후로 해주세요."
};
/// 이렇게 object 로 데이터를 가져오는 경우가 있다


console.log(object.name);
// 이렇게 object 안에 있는 proerpty 를 가져올수도잇음
// 위에껀 홍길동이다

const form = document.getElementById("reservation-form");
if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // 폼 제출 기본 동작 방지
        console.log("폼 제출이 방지되었습니다.");
    });
}
// node 기준 express 는 
// node 기준 express 는 서버에서 데이터를 가져오는 역할을 한다
// nodoe -> react 와 vue 를 사용가능
// backend 에서 데이터를 가져오는 역할을 한다 -> script 만 가지고 frontend backend 를 구현이 가능하다
// query selector 하고 selectorAll 은 차이가 있다
// querySelector 는 하나만 가져오고 selectorAll 은 여러개를 가져온다
// querySelectorAll 은 배열로 가져온다

// 
<div id="err_empty_email_pwd" style="display: none ;">
                <div class="err_msg">
                    이메일 또는 패스워드를 입력해 주세요!!
                </div>
            </div>
            // log in log out 을 구현할때는 session 을 사용한다
            