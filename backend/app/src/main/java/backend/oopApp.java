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
// 전위 연산
// 후위 연산에 따라 접근 방식이 달라진다

// idx ++ 
// ++idx 

// 기본 데이터 타입에서 형변환이 가능하다 
// // public class A {
//     int a = 10;
//     double b = 20.5;

//     public void print() {
//         System.out.println("a: " + a);
//         System.out.println("b: " + b);
//     }
// }
// // public class B extends A {
//     int c = 30;

//     public void print() {
//         super.print(); // 부모 클래스의 print() 호출
//         System.out.println("c: " + c);
//     }
// }
// public void setInt(int value) {
//     this.value = value;
// }
// 묵시적 형변환이 일어나게 됬으


