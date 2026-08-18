package backend.lecture0818;

// [학습 정리] 추상 클래스(abstract class) vs 인터페이스(interface)
// - abstract class: new 로 직접 인스턴스화 불가, 하위 클래스가 abstract 메서드를 반드시 구현
// - interface: 다중 구현(implements) 가능, 상수 필드는 자동으로 public static final
// - 업/다운캐스팅: Flyer(인터페이스) 타입 변수를 SuperMan(구현체)으로 다운캐스팅해서 SuperMan 고유 메서드 호출
import backend.lecture0818.features.oop.abstraction.Animal;
import backend.lecture0818.features.oop.abstraction.Flyer;
import backend.lecture0818.features.oop.abstraction.SuperMan;

public class AbstractApp {
    public static void main(String[] args) {
        // Animal animal = new Animal() ;
        // Animal animal = new SuperMan() ;
        // Animal [] ary = new Animal[10] ;

        // Flyer superman = new SuperMan();
        // ((SuperMan)superman).eating("빵");




    }
}
