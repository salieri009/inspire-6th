package backend.lecture0820;

import backend.lecture0820.features.stat.StaticDemo;

public class StaticApp {

    public static void main(String[] args) {
        StaticDemo demo = new StaticDemo(); 
        System.out.println(demo.message); 
        demo.message = "메시지 변경" ;
        System.out.println(demo.message); 

        // 
        System.out.println(StaticDemo.staticMessage);

        // 
        System.out.println(StaticDemo.PI);

        // 상수는 수정이 불가능하다.
        // StaticDemo.PI = 3.15 ; 


        demo.instanceMethod();
        StaticDemo.classMethod();
        





    }

}