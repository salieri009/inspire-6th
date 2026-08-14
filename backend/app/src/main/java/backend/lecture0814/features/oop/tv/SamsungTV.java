package backend.lecture0814.features.oop.tv;

/*
[학습 정리] Singleton 패턴 - 인스턴스를 애플리케이션 전체에서 하나로 유지하는 방법
- 생성자의 접근제어자를 private으로 막아 외부에서 new SamsungTV()를 못하게 함
- static 필드(instance)에 "자기 자신 타입"의 변수를 선언해서 유일한 인스턴스를 보관
- static 메서드(getInstance)에서 instance가 없으면(null) 그때 처음 생성하고,
  이미 있으면 기존 인스턴스를 그대로 반환(지연 초기화, lazy initialization)
- 결과적으로 SamsungTV.getInstance()를 몇 번을 호출해도 항상 동일한 객체가 반환됨
  -> 상태를 공유해야 하거나 객체 생성 비용을 아끼고 싶은 경우에 사용하는 대표적인 디자인 패턴
*/
public class SamsungTV implements TV{

    private static SamsungTV instance;

    private SamsungTV(){
    }

    public static SamsungTV getInstance() {
        if(instance == null) {
            instance = new SamsungTV();
        }
        return instance ;
    }

    @Override
    public void turnOn() {
        System.out.println("samsung tv turnOn");
    }

}
