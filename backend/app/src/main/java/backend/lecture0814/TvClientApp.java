package backend.lecture0814;

import backend.lecture0814.features.oop.factory.BeanFactory;
import backend.lecture0814.features.oop.tv.LgTV;
import backend.lecture0814.features.oop.tv.SamsungTV;
import backend.lecture0814.features.oop.tv.TV;

/*
[학습 정리] 싱글턴 + 팩토리 + 인터페이스 다형성을 함께 사용하는 클라이언트 코드
- BeanFactory.getInstance()로 팩토리(그 자신도 싱글턴)를 얻고, factory.getBrand("lg")로
  실제 구현체(LgTV의 싱글턴 인스턴스)를 TV 인터페이스 타입으로 받아옴
- tv 변수의 선언 타입은 TV(인터페이스)이지만 실제로 가리키는 객체는 LgTV -> 다형성
- 이 파일에서 LgTV/SamsungTV를 직접 import는 하고 있지만 실제로 new LgTV()처럼 직접
  생성하지 않는 것이 핵심 -> 객체 생성 책임은 팩토리가 지고, 클라이언트는 "사용"만 함
  (관심사의 분리 / 결합도를 낮추는 설계)
*/
public class TvClientApp {

    public static void main(String[] args) {

        BeanFactory factory = BeanFactory.getInstance() ;

        TV tv = factory.getBrand("lg");
        tv.turnOn();

    }

}
