package backend.Java_practice.blogs.blogDto;

public class BlogRegisterDTO {
    
}


// public BlogResponseDTO register(){

//     Blog blog = new Blog();
//}

// 뭐 blog Response DTO 는 return type 으로 정의가 되는것
// int 반환값도 되고 , return 값은 범용성이 넓은데 어디를 어떻게 반환하느냐에 따라 달라짐
// public BlogResponseDTO register(BlogRegisterDTO blogRegisterDTO){
// return new BlogResponseDTO(blogRegisterDTO.getTitle(), blogRegisterDTO.getContent());
// return 값을 받고 response 를 받는경우가 있다.

// if (blogRegisterDTO.getTitle() == null || blogRegisterDTO.getContent() == null){
//     return new BlogResponseDTO("Title or Content is null", "Title or Content is
// null");
/// 이렇게 하면 title 이나 content 가 null 인 경우에 대한 처리를 할 수 있다. 이런식으로 validation 을 할 수 있다. validation 은 보통 service layer 에서 한다. service layer 는 business logic 을 처리하는 layer 이다. controller layer 는 request 를 받고 response 를 반환하는 layer 이다. controller layer 는 service layer 를 호출한다. service layer 는 dao layer 를 호출한다. dao layer 는 database 에 접근하는 layer 이다. database 에 접근할 때는 entity 를 사용한다. entity 는 database table 과 매핑되는 객체이다. entity 는 보통 JPA 를 사용해서 매핑한다. JPA 는 Java Persistence API 의 약자이다. JPA 는 ORM(Object Relational Mapping) 기술이다. ORM 은 객체와 관계형 데이터베이스를 매핑하는 기술이다.
// 즉 예외 처리가 가능함

// equals to 로 하는게 좋음

// publc BlogResponseDTO register(BlogRegisterDTO blogRegisterDTO){
//     if (blogRegisterDTO.getTitle() == null || blogRegisterDTO.getContent() == null){
//         return new BlogResponseDTO("Title or Content is null", "Title or Content is null");
//     }
//     return new BlogResponseDTO(blogRegisterDTO.getTitle(), blogRegisterDTO.getContent());
// }

// 사용자의 요청 정보의 종류에 따라 DTO 를 나누는게 좋음
// overloading 을 통해서 register 를 여러개 만들 수 있음
// public BlogResponseDTO register(BlogRegisterDTO blogRegisterDTO, User user){
// 즉 매개변수 세개가 들어오면 세개짜리를
// 하나가들어오면 하나짜리를 부르는것도 가능하다


// request 를 dto 에 넣어서 보내느냐
// 아니면 그냥 보내느냐에 차이

// BlogPostDTO 를 만들어서 보내는게 좋음
// Blogpost res = new 

// String result = instance.ifwoodmin

// 삼항연산자 
// 조건식 ? true : false
    // 조건식 

// public String woodMan(Interger number) {



//     if (number.equals(1)) {
//         return "거짓말하는구나";
//     } else if (number == 2) {
//         return "또 거짓말하는구나";
//     } else if (number == 3) {
//         return "정직하구나 너에게 모든 도끼를 주겠다";
//     } else {
//         return "1 ~ 3 사이의 값을 입력해주세요.";
//     }

// }

// public int sumNumber(int a, int b) {
//     return a + b;
// }

// /// 상한가와 하한가를 포함하는 모든 것의 총합

// public int sumRange(int lower, int upper) {
//     int sum = 0;
//     for (int i = lower; i <= upper; i++) {
//         sum += i;
//     }
//     return sum;
// }
// // O(n) 의 시간복잡도를 가지는 알고리즘

// // for(int data -start; data <= end; data++) {
// // 이렇게 가도됨..


// // 1 ~ 100 사이에 남수생성
// public int randomNumber() {
//     return (int) (Math.random() * 100) + 1;
// }

