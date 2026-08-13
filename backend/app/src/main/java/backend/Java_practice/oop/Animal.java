package backend.Java_practice.oop;

// 상속의 부모(부모/슈퍼) 클래스
public class Animal {

    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    // 메서드의 다형성: 자식 클래스가 재정의(override)해서 각자 다르게 동작시킬 대상
    public String makeSound() {
        return name + ": (아무 소리도 내지 않음)";
    }

    // final method: 자식 클래스에서 재정의(override)할 수 없다
    public final String breathe() {
        return name + "이(가) 숨을 쉽니다.";
    }
}
