package backend.lecture0818;

// [학습 정리] static 키워드
// - 인스턴스 필드/메서드: 객체(demo)를 통해서만 접근
// - static 필드/메서드: 클래스명(StaticDemo.xxx)으로 바로 접근, 모든 인스턴스가 공유
// - static final 상수(PI)는 재할당 불가(컴파일 에러)
import backend.lecture0818.features.stat.StaticDemo;

public class StaticApp {

    public static void main(String[] args) {
        StaticDemo demo = new StaticDemo();
        System.out.println(demo.message);
        demo.message = "메시지 변경" ;
        System.out.println(demo.message);

        //
        System.out.println(StaticDemo.staticMessage);

        //
        System.out.println(StaticDemo.PI);

        // 상수는 수정이 불가능하다.
        // StaticDemo.PI = 3.15 ;


        demo.instanceMethod();
        StaticDemo.classMethod();


        System.out.println();




    }

}

