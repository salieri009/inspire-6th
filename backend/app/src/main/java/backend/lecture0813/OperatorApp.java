package backend.lecture0813;

// [학습 정리] 연산자 + 매개변수의 다형성(오버로딩) + 반복문 종합
// - 산술/삼항/switch식/관계연산자와 매개변수 타입/개수를 달리한 register() 오버로딩 예시
// - sumNumber(for), sumRandom(do-while), printGugudan(printf 포맷팅), gugudan(중첩 for + 레이블 break)
// - popStr: 문자열도 charAt()과 반복문으로 순회 가능함을 보여줌 (역순 출력)
import backend.lecture0813.features.blogs.domain.dto.BlogRequestDTO;
import backend.lecture0813.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0813.features.operator.OperatorDemo;

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
