package backend.lecture0813;

// [학습 정리] static 변수/메서드 vs instance 변수/메서드, final 상수
// - message는 인스턴스마다 따로 존재(instance 소유), staticMessage는 클래스 전체가 공유(static 소유)
// - static final PI는 상수라 재대입 불가(컴파일 에러)
// - static 메서드(classMethod)는 인스턴스 소유 멤버(message)에 접근할 수 없음
import backend.lecture0813.features.stat.StaticDemo;

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
        





    }

}

