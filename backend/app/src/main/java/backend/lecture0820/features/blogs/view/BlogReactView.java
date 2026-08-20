package backend.lecture0820.features.blogs.view;

import java.util.List;
import java.util.Scanner;

import backend.lecture0820.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0820.features.blogs.facade.BlogFrontController;

public class BlogReactView {
    /*
    Scanner 데이터입력 처리 
    예외처리
    view has a FrontController 
    */

    private Scanner scan ; 
    private BlogFrontController front ; 


    public BlogReactView() {
        scan        = new Scanner(System.in) ;   
        front       = new BlogFrontController() ;  
    }

    public void landingPage() {
        while(true) {
            System.out.println();
            System.out.println(">>>> Inspire Camp Blog Ver(1.0) <<<<");
            System.out.println("1. 전체검색");
            System.out.println("2. 게시글 상세보기");
            System.out.println("3. 입력화면");
            System.out.println("4. 수정화면");
            System.out.println("5. 게시글 삭제");
            System.out.println("6. 검색"); 
            System.out.println("99. 프로그램 종료"); 

            /* 
            Q)
            - 사용자로부터 문자열 정수가 아닌 문자열이 입력된다면 예외발생!!
            - 예외처리를 통해서 메시지를 출력하고 다시 입력받을 수 있도록 흐름을 제어
            */
            try {
                System.out.print("원하시는 메뉴 번호를 입력하세요 : "); 
                Integer number = Integer.parseInt( scan.nextLine() ); 
                switch (number) {
                    case 1 : 
                        list();
                        break ;
                    case 99:
                        exit() ;        
                        break;
                    default:
                        break;
                }
            } catch(Exception e) {
                System.out.println();
                System.out.println("ERR) 메뉴에 있는 숫자만 가능합니다!! 다시 확인요망");
            } 

        }
        
    } // landingPage block end 


    public void exit() {
        System.out.println();
        System.out.println(">>>> 시스템을 종료하겠습니다.") ; 
        System.exit(1); 
    } // exit block end 


    public void list() {
        System.out.println();
        System.out.println(">>>> 데이터 출력 ") ; 
        String endPoint = "list.inspire" ; 
        List<BlogResponseDTO> response = front.list(endPoint) ;

        // stream api 출력 == json rendering (react)  
        response.stream()
            .forEach(System.out::println); 

    }

}
