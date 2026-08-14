package backend.lecture0814.features.oop.factory;

import backend.lecture0814.features.oop.tv.LgTV;
import backend.lecture0814.features.oop.tv.SamsungTV;
import backend.lecture0814.features.oop.tv.TV;

/*
[학습 정리] Factory 패턴 - "어떤 구현체를 만들지"를 클라이언트 대신 결정해주는 객체
- BeanFactory 자신도 Singleton(private 생성자 + static getInstance)으로 관리됨
  -> 팩토리 자체도 애플리케이션에 하나만 존재
- 생성자에서 SamsungTV/LgTV의 Singleton 인스턴스를 미리 만들어 배열(ary)에 담아둠
  (여기서는 "이미 만들어진 두 개의 싱글턴을 보관"하는 방식으로, 브랜드별 인스턴스를 새로 만들지
  않고 재사용함)
- getBrand(String brandName): 문자열 키("samsung"/"lg")를 받아 TV 인터페이스 타입으로
  반환 -> 호출하는 쪽(TvClientApp)은 SamsungTV/LgTV 라는 구체 클래스 이름을 몰라도 되고,
  오직 TV 인터페이스의 turnOn()만 알면 됨(구현을 감추는 것 = 팩토리 패턴의 핵심 목적)
- 이런 구조 덕분에 나중에 "SonyTV"가 추가되어도 BeanFactory 내부만 수정하면 되고
  클라이언트 코드(TvClientApp)는 변경할 필요가 없음(OCP: 개방-폐쇄 원칙과 연결되는 개념)
*/
public class BeanFactory {

    private static BeanFactory instance;
    private TV [] ary ;

    private BeanFactory(){
        ary = new TV[2];
        ary[0] = SamsungTV.getInstance() ;
        ary[1] = LgTV.getInstance() ;
    }

    public static BeanFactory getInstance() {
        if(instance == null) {
            instance = new BeanFactory();
        }
        return instance ;
    }

    public TV getBrand(String brandName) {
        return brandName.equalsIgnoreCase("samsung") ? ary[0] : ary[1] ;
    }

}
