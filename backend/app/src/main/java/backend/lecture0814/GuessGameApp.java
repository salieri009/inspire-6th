package backend.lecture0814;

// [학습 정리] Scanner + 반복문(for) + break로 만든 숫자 맞추기 게임
// - 1~100 난수를 Math.random()으로 생성 후 최대 10번의 기회 동안 Up/Down 힌트 제공
// - 정답을 맞히면 break로 반복 종료, 못 맞히면 기회 소진 메시지를 삼항연산자로 결정
import java.util.Scanner;

import backend.lecture0814.features.game.GuessGame;

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
