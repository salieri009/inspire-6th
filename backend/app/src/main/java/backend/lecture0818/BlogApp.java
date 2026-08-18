package backend.lecture0818;

// [학습 정리] 객체 생성 방식 비교 - new + setter vs Lombok @Builder
// - new + setter: 필드가 많을수록 호출부가 장황해지고, 어떤 값이 어떤 필드인지 가독성이 떨어짐
// - @Builder: 메서드 체이닝으로 필요한 필드만 선택적으로 지정, 가독성/불변성 확보에 유리
import backend.lecture0818.features.blogs.domain.dto.BlogRequestDTO;

public class BlogApp {

    public static void main(String[] args) {

        System.out.println(">>>> new 연산자를 이용한 객체생성");
        // BlogRequestDTO request = new BlogRequestDTO();
        // BlogRequestDTO request
        //     = new BlogRequestDTO(1, "title", "content", "email");
        // System.out.println("title : "+request.getTitle());

        System.out.println();
        System.out.println(">>>> Builder 이용한 객체생성");
        BlogRequestDTO request = BlogRequestDTO.builder()
                                    .title("자바 첫날입니다.")
                                    .content("재미있다.")
                                    .email("jslim9413@naver.com")
                                    .build() ;
        request.setTitle("조기퇴큰");
        System.out.println("title : "+request.getTitle());



    }

}
