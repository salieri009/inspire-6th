package backend.Java_practice.oop;

// 배열 + for-each + 매개변수의 다형성 실습
public class ArrayDemo {

    // 매개변수의 다형성: Animal 타입 매개변수는 Dog, Cat, RobotDog 등 어떤 하위 타입 인자도 받을 수 있다
    public void introduce(Animal animal) {
        System.out.println(animal.makeSound());
        System.out.println(animal.breathe());
    }

    // for-each 구문: 배열의 처음부터 끝까지 순회
    public void runAll(Animal[] animals) {
        for (Animal animal : animals) {
            introduce(animal);
        }
    }
}
