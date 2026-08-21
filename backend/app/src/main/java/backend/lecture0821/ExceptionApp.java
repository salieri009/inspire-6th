package backend.lecture0821;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import backend.lecture0821.features.exception.ExceptionDemo;
import backend.lecture0821.features.exception.util.InspireException;

public class ExceptionApp {

    public static void main(String[] args) {
        System.out.println("debug >>>> main start"); 

        // System.out.println("debug >>>> runtime exception ~ ");
        // String [] strAry = {"jslim", "inspire", "lgcns"}; 
        // try{
        //     for(int idx=0 ; idx <= strAry.length ; idx++) {
        //         System.out.println(strAry[idx]);
        //     }
        // } catch (Exception e) {
        //     System.out.println("debug >>>> catch 예외발생시에만 수행");
        //     e.printStackTrace();
        // } finally {
        //     System.out.println("debug >>>> finally 예외발생 여부와 상관없이 수행");
        // }

        System.out.println("debug >>>> compile exception ~ ");
        
        // input stream : 데이터가 입력되는 통로
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in)) ;
        String line = null ;
        try {
            System.out.print("메시지를 입력하세요 : ");
            line = br.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println( line  ); 

        System.out.println("debug >>>> user exception and throw"); 
        ExceptionDemo demo = new ExceptionDemo();
        try {
            demo.first(10);
        } catch (InspireException e) {
            e.printStackTrace();
        }
                

        System.out.println("debug >>>> main end"); 
    }

}