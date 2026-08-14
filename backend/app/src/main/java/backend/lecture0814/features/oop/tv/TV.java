package backend.lecture0814.features.oop.tv;

// [학습 정리] LgTV/SamsungTV가 공통으로 구현할 "역할" 인터페이스
// - BeanFactory/TvClientApp은 TV 타입만 알면 되고, 실제 구현이 LG인지 Samsung인지는 몰라도 됨
// (인터페이스를 통한 다형성 -> 팩토리 패턴의 기반이 됨)
public interface TV {
    public void turnOn() ;
}
