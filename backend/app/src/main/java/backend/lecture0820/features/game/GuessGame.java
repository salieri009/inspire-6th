package backend.lecture0820.features.game;

import java.util.Scanner;

/* 
Q) 숫자를 맞추는 게임 
- 난수(1 ~ 100) : answer 
- 주어진 기회는 10번 (up, down)

콘솔로부터 데이터를 입력받기위한(java.util.Scanner) 

반환값 
- 성공) "x번재 정답을 맞췄습니다."
- 실패) "10번의 기회를 모두 사용하였습니다."
*/
public class GuessGame {
    
    private int answer ;

    public GuessGame(){
        answer = (int)(Math.random() * 100) + 1 ; 
    }

    public String gameFor(){
        System.out.println("debug >>>> answer log : "+answer); 
        
        String  result  = null ; 
        int     cnt     = 0 ;
        boolean isFlag  = false ;

        Scanner scan = new Scanner(System.in);
        
        for(int idx=1 ; idx <= 10 ; idx++) {
            cnt = idx ; 
            System.out.print(">>>> 생각하는 숫자를 입력하세요 : ");
            int guess = scan.nextInt();
            if( answer > guess ) {
                System.out.println(">>> Up");
            } else if( answer < guess ) {
                System.out.println(">>> Down");
            } else {
                isFlag = true ;
                break ; 
            }
        }
        result = (isFlag) ? cnt+"번째 정답을 맞췄습니다." : "10번의 기회를 모두 사용하였습니다." ;
        return result ;
    }
    public String gameWhile(){
        return null ;
    }   
    public String gameDoWhile(){
        return null ;
    }

}
