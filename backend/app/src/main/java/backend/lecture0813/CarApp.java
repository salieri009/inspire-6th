package backend.lecture0813;

// [학습 정리] 생성자 오버로딩(constructor overloading)
// - 매개변수의 타입/개수를 달리한 생성자를 여러 개 정의해 다양한 초기화 방식을 지원
// - 필드가 private이면 반드시 getter/setter를 통해 접근해야 함 (직접 접근 시 컴파일 에러)
import backend.lecture0813.features.car.Car;
public class CarApp {

    public static void main(String[] args) {
        Car audi = new Car() ;
        // audi.brand = "아우디" ;
        audi.setBrand("AUDI");
        // System.out.println("brand :"+audi.brand);
        System.out.println("brand :"+audi.getBrand());

        ///////////////
        System.out.println();
        Car bmw = new Car("BMW");
        // System.out.println("brand :"+bmw.brand);
        System.out.println("brand :"+bmw.getBrand());

        ///////////////
        System.out.println();
        Car benz = new Car("BENZ", "C200");
        // System.out.println("brand :"+benz.brand);
        // System.out.println("brand :"+benz.model);
        System.out.println("brand :"+benz.getBrand());
        System.out.println("brand :"+benz.getModel());

        String carInfo = benz.carInfo() ; 
        System.out.println("carInfo : "+carInfo); 

    }
    
}

