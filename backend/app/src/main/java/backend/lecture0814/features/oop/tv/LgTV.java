package backend.lecture0814.features.oop.tv;

// [학습 정리] SamsungTV와 동일한 Singleton 구조(private 생성자 + static getInstance)
// - TV 인터페이스를 구현하므로 BeanFactory 입장에서는 SamsungTV와 동일하게 TV 타입으로 다뤄짐
public class LgTV implements TV {

    private static LgTV instance;
    private LgTV(){
    }
    public static LgTV getInstance() {
        if(instance == null) {
            instance = new LgTV();
        }
        return instance ;
    }


    @Override
    public void turnOn() {
        System.out.println("lg tv turnOn");
    }

}
