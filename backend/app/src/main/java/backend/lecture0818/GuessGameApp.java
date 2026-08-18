package backend.lecture0818;

// [학습 정리] Scanner를 이용한 사용자 입력 처리
// - 게임 로직(features.game.GuessGame)을 별도 클래스로 분리해 App은 호출/출력만 담당(관심사 분리)
import java.util.Scanner;

import backend.lecture0818.features.game.GuessGame;

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
