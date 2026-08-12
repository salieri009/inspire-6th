package backend.Java_practice.stats;

public class statsDemo {

    // constructor
    // constructor 는 class 의 이름과 동일해야 한다.
    // final = > final 은 상수화 시키는것
    // static final int MAX_VALUE = 100;
    // < -- 이제 고정된거임, 보통인


    // public String name <-- instance variable
    // public static String name <-- class variable
    
    // instance variable: statsDemo 객체마다 각자 따로 값을 가진다. (static과 대비되는 예시)
    public String instanceMessage = "instance 변수: 객체마다 따로 존재하는 값";

    public statsDemo() {
        System.out.println("Hello, World!");
    }



}
