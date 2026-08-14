package backend.lecture0814.features.oop.abstraction;

/*
[학습 정리] interface (인터페이스)
- 오직 "상수"와 "추상 메서드"만 가질 수 있음(자바 8+부터는 default/static 메서드도 가능하지만
  이 강의 예제에서는 순수 추상 메서드만 사용)
- interface 자체로는 객체 생성(new Flyer())이 불가능 -> 구현체(implements)가 있어야 함
- "표준 역할(계약, contract)"을 정의하는 용도 -> 서로 다른 상속 계층의 클래스들도 같은
  interface만 구현하면 동일한 방식으로 다룰 수 있음 (다중 구현 가능: implements A, B, C)
- 여기 선언된 STUDENT 필드는 interface 안에서는 암묵적으로
  public static final int STUDENT = 1; 로 취급됨(인터페이스 상수는 항상 상수)
*/
public interface Flyer {

    public int STUDENT = 1 ;

    public void fly();
    public void takeOff();
    public void landing();

}
