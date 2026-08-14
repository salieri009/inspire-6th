package backend.lecture0814;

// [학습 정리] 객체 생성 방법 비교: new 연산자 vs Lombok @Builder
// - new + 생성자로 만든 뒤 setter로 값을 바꾸는 방식과, 빌더 체이닝으로 한 번에 값을 채우는 방식 비교
// - 빌더로 만든 객체도 결국 일반 객체라 build() 이후 setter로 값 변경이 가능함
import backend.lecture0814.features.blogs.domain.dto.BlogRequestDTO;

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
