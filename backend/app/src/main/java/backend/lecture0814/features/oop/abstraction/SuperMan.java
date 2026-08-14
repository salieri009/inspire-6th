package backend.lecture0814.features.oop.abstraction;

/*
[학습 정리] 추상클래스 + 인터페이스를 동시에 사용하는 예
- extends Animal: 추상 클래스를 상속받아 eating() 같은 공통 구현을 그대로 물려받음
- implements Flyer: 인터페이스를 구현해서 fly/takeOff/landing 이라는 "역할(계약)"을 이행
- 자바는 클래스 다중 상속(extends 여러 개)은 불가능하지만, 인터페이스는 다중 구현
  (implements A, B, ...)이 가능 -> "추상 클래스로 공통 특성 하나만 상속받고, 나머지 역할은
  인터페이스로 여러 개 조합"하는 설계가 자바 다형성의 전형적인 패턴
- 아래 각 메서드는 아직 구체 로직이 없어 UnsupportedOperationException을 던지도록
  자동 생성된 스텁(stub) 상태 -> 인터페이스가 강제한 메서드는 반드시 존재해야 컴파일되지만,
  "무엇을 할지"는 나중에 채워도 됨을 보여줌
*/
public class SuperMan extends Animal implements Flyer {

    @Override
    public void fly() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'fly'");
    }

    @Override
    public void takeOff() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'takeOff'");
    }

    @Override
    public void landing() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'landing'");
    }

}
