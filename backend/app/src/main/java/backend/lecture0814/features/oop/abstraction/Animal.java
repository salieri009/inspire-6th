package backend.lecture0814.features.oop.abstraction;

/*
[학습 정리] abstract class (추상 클래스) vs interface
- abstract 클래스는 interface와 달리 일반 필드/생성자/구현된 메서드(eating)를 가질 수 있음
  -> "공통 구현을 물려주고 싶을 때"는 추상 클래스, "구현 없이 규격만 강제하고 싶을 때"는 인터페이스
- interface와 마찬가지로 abstract 클래스도 직접 인스턴스화(new Animal()) 불가 -> 반드시
  extends한 자식 클래스를 통해서만 사용 가능
- 아래 주석 처리된 abstract 메서드(fly/takeOff/landing)를 선언하면, 이 클래스를 상속하는
  모든 자식은 반드시 그 메서드를 재정의(@Override)해야 함(강제 구현)
- 지금은 eating()처럼 "몸통이 있는" 일반 메서드만 두고, 추상 메서드는 Flyer 인터페이스 쪽으로
  분리한 상태 -> 상속(extends Animal)과 다중 구현(implements Flyer)을 함께 쓰는 예제(SuperMan 참고)
*/
public abstract class Animal {

    private String name ;

    public Animal(){
    }

    public void eating(String food) {
        System.out.println(food+"를 먹고 살아갑니다.");
    }

    // public abstract void fly();
    // public abstract void takeOff();
    // public abstract void landing();

}
