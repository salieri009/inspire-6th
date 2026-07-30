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
form.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    
