package backend.lecture0819;

import java.util.Scanner;

import backend.lecture0819.features.game.GuessGame;

public class GuessGameApp {
    
    public static void main(String[] args) {
        
        // Scanner scan = new Scanner(System.in);
        // System.out.print(">>>> 생각하는 숫자를 입력하세요 : ");
        // int guess = scan.nextInt();
        // System.out.println("guess >>> "+guess) ; 

        
        GuessGame game = new GuessGame();

        String result = game.gameFor();    
        
        System.out.println( result ); 

        

    }

}
