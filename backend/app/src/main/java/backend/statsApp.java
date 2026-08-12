package backend;

import backend.Java_practice.stats.GuessGame;
import backend.Java_practice.stats.StaticDemo;
import backend.Java_practice.stats.statsDemo;

/**
 * statsApp
 */
public class statsApp {

    public static void main(String[] args) {
        System.out.println("Hello, World!");

        statsDemo demo = new statsDemo();

        // instance 변수: 객체(demo)를 통해서만 접근 가능
        System.out.println(demo.instanceMessage);

        // static 변수: 객체 생성 없이 클래스명으로 바로 접근 가능
        System.out.println(StaticDemo.staticMessage);
        System.out.println(StaticDemo.staticGreet());

        new GuessGame().play();
    }

}

//static 은 instance 의 소유가 아님
// instance 는 class 의 소유임

// demo.instanceMessage
// static 은 instance 의 소유가 아님


// math 같은 경우는 대다수 static method 로 되어있음
// 그래서 굳이 객체를 생성하지 않고도 바로 호출이 가능함
// 아무튼 static 은 import 되면 바로 사용가능하다

// StringBuilder 는 static method 로 되어있음
// 그래서 굳이 객체를 생성하지 않고도 바로 호출이 가능함

// thread 환경에서느 String buffer 를 사용해야함
