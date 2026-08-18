package backend.lecture0818;

// [학습 정리] 싱글턴(Singleton) + 팩토리(Factory) 패턴
// - BeanFactory.getInstance() 는 애플리케이션 전체에서 단 하나의 BeanFactory만 존재하도록 보장(private 생성자 + static getInstance)
// - factory.getBrand("lg") 는 브랜드 문자열에 따라 LgTV/SamsungTV 중 알맞은 구현체를 반환(단순 팩토리)
// - 클라이언트 코드는 TV 인터페이스 타입으로만 다루므로 구체 클래스에 의존하지 않음(다형성)
import backend.lecture0818.features.oop.factory.BeanFactory;
import backend.lecture0818.features.oop.tv.LgTV;
import backend.lecture0818.features.oop.tv.SamsungTV;
import backend.lecture0818.features.oop.tv.TV;

public class TvClientApp {

    public static void main(String[] args) {

        BeanFactory factory = BeanFactory.getInstance() ;

        TV tv = factory.getBrand("lg");
        tv.turnOn();

    }

}
