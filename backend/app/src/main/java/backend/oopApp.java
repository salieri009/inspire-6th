package backend;

import backend.Java_practice.oop.Animal;
import backend.Java_practice.oop.ArrayDemo;
import backend.Java_practice.oop.Cat;
import backend.Java_practice.oop.Dog;
import backend.Java_practice.oop.RobotDog;

/**
 * oopApp - 배열 및 객체지향(상속, 다형성) 실습
 */
public class oopApp {

    public static void main(String[] args) {
        // 배열 문법: 크기 3인 Animal 배열 선언
        Animal[] animals = new Animal[3];

        // 변수의 다형성: Animal 타입 변수(배열 요소)가 Dog/Cat/RobotDog 객체를 참조
        animals[0] = new Dog("바둑이");
        animals[1] = new Cat("나비");
        animals[2] = new RobotDog("로봇멍이");

        ArrayDemo arrayDemo = new ArrayDemo();
        arrayDemo.runAll(animals);

        // 배열 리터럴 문법 + for-each로 합계 구하기
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        System.out.println("합계: " + sum);
    }
}
