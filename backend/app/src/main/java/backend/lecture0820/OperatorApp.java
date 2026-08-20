package backend.lecture0820;

import backend.lecture0820.features.blogs.domain.dto.BlogRequestDTO;
import backend.lecture0820.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0820.features.operator.OperatorDemo;

public class OperatorApp {

    public static void main(String[] args) {
        OperatorDemo instance = new OperatorDemo();
        
        // instance.operator();

        // BlogResponseDTO response 
        //     = instance.register("오늘도 무사히", "앗", "jslim9413@naver.com") ;
        // System.out.println(response.getStatus());
        // System.out.println(response.getMessage());

        // System.out.println();
        // BlogRequestDTO request = 
        //     new BlogRequestDTO(1,"오늘도 무사히", "앗", "jslim9413@naver.com");
        // BlogResponseDTO res = instance.register(request) ;

        // System.out.println(res.getStatus());
        // System.out.println(res.getMessage());


        // String result = instance.woodMan(3);
        // System.out.println(result);

        // int result = instance.sumNumber(100, 1); 
        // System.out.println(result);

        // int result = OperatorDemo.sumRandom();
        // System.out.println(result);


        // instance.printGugudan(2);

        // instance.gugudan();

        instance.popStr("inspire lgcns camp 6th");




    }

}