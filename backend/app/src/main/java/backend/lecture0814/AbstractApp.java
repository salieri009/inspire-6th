package backend.lecture0814;

import backend.lecture0814.features.oop.abstraction.Animal;
import backend.lecture0814.features.oop.abstraction.Flyer;
import backend.lecture0814.features.oop.abstraction.SuperMan;

/*
[학습 정리] 추상 클래스/인터페이스는 "직접 인스턴스화 불가" + "업/다운캐스팅"
- Animal animal = new Animal(); -> 컴파일 에러. abstract 클래스는 new로 직접 생성 불가
- Animal animal = new SuperMan(); -> OK. 추상 타입 변수가 실제로는 구체 자식(SuperMan)을
  참조하는 업캐스팅(upcasting). 이 상태의 animal 변수로는 Animal이 아는 멤버(eating)만 호출 가능
- Animal[] ary = new Animal[10]; -> 배열도 추상 타입으로 선언 가능(요소는 실제 자식 인스턴스가 담김)
- Flyer superman = new SuperMan(); -> 인터페이스 타입 변수도 마찬가지로 구현체를 참조하는
  업캐스팅. Flyer 타입으로는 fly/takeOff/landing만 보이고 Animal 쪽 멤버(eating)는 안 보임
- ((SuperMan)superman).eating("빵"); -> 다운캐스팅(downcasting)으로 원래 구체 타입으로
  되돌려야 그 타입에만 있는 멤버(eating은 Animal 소유지만 SuperMan이 상속받음)에 접근 가능
*/
public class AbstractApp {
    public static void main(String[] args) {
        // Animal animal = new Animal() ;
        // Animal animal = new SuperMan() ;
        // Animal [] ary = new Animal[10] ;

        // Flyer superman = new SuperMan();
        // ((SuperMan)superman).eating("빵");




    }
}
