package backend.lecture0820;

import backend.lecture0820.features.car.Car;
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