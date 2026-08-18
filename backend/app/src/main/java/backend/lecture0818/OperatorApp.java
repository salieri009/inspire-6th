package backend.lecture0818;

// [학습 정리] 연산자와 제어문 종합 데모(features.operator.OperatorDemo)
// - 산술/관계/논리/삼항 연산자, switch 표현식, for/while/do-while 반복문
// - 라벨(outer:/inter:) 붙인 중첩 반복문에서의 break/continue
// - charAt 을 활용한 문자열 뒤집기(popStr) 등 문자열 처리
import backend.lecture0818.features.blogs.domain.dto.BlogRequestDTO;
import backend.lecture0818.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0818.features.operator.OperatorDemo;

public class OperatorApp {

    public static void main(String[] args) {
        OperatorDemo instance = new OperatorDemo();

        // instance.operator();

        // BlogResponseDTO response
        //     = instance.register("오늘도 무사히", "앗", "jslim9413@naver.com") ;
        // System.out.println(response.getStatus());
        // System.out.println(response.getMessage());

        // System.out.println();
        // BlogRequestDTO request =
        //     new BlogRequestDTO(1,"오늘도 무사히", "앗", "jslim9413@naver.com");
        // BlogResponseDTO res = instance.register(request) ;

        // System.out.println(res.getStatus());
        // System.out.println(res.getMessage());


        // String result = instance.woodMan(3);
        // System.out.println(result);

        // int result = instance.sumNumber(100, 1);
        // System.out.println(result);

        // int result = OperatorDemo.sumRandom();
        // System.out.println(result);


        // instance.printGugudan(2);

        // instance.gugudan();

        instance.popStr("inspire lgcns camp 6th");




    }

}
