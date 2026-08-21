package backend.lecture0821;

import backend.lecture0821.features.oop.factory.BeanFactory;
import backend.lecture0821.features.oop.tv.LgTV;
import backend.lecture0821.features.oop.tv.SamsungTV;
import backend.lecture0821.features.oop.tv.TV;

public class TvClientApp {

    public static void main(String[] args) {

        BeanFactory factory = BeanFactory.getInstance() ;
        
        TV tv = factory.getBrand("lg");
        tv.turnOn();     

    }

}