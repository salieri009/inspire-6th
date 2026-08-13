package backend.Java_practice.oop;

// final class: 이 클래스는 더 이상 상속(extends)할 수 없다
public final class RobotDog extends Animal {

    public RobotDog(String name) {
        super(name);
    }

    @Override
    public String makeSound() {
        return name + ": 삐빅! (로봇 소리)";
    }
}

// 아래처럼 final class를 다시 extends 하면 컴파일 에러가 난다.
// class Broken extends RobotDog {}
// -> error: cannot inherit from final RobotDog
