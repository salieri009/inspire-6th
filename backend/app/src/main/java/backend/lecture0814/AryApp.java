package backend.lecture0814;

// [학습 정리] 배열(array) 문법
// - 참조타입, 고정 길이(재조정 불가), length 속성, 인덱스(0 ~ length-1)로 접근
// - 일반 for문과 for-each(enhanced for)로 순회하는 두 가지 방식 비교
// - 배열 요소가 null일 때 break로 순회를 조기 종료하는 패턴
// - Lombok @Builder로 만든 DTO(BlogResponseDTO)를 배열/서비스 계층과 함께 활용하는 예시
import backend.lecture0814.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0814.features.blogs.service.BlogService;
import backend.lecture0814.features.game.GuessGame;

public class AryApp {
    
    /*
    array? 꾸러미 
    - 참조타입
    - 단일데이터 타입만 담는다.
    - 고정길이(실행시점에 re-sizing X) 
    - 첨자번지에 대한 관리(0 ~ )
    - length 속성
    - []
    */
    public static void main(String[] args) {
        // int [] ary = new int[10] ;  
        // ary[0] = 'A';

        boolean [] ary = new boolean [10] ;  
        ary[0] = true ;
        
        System.out.println(ary[0]);
        for(int idx=0 ; idx < ary.length ; idx++) {
            System.out.print(ary[idx]+"\t"); 
        }
        System.out.println();
        System.out.println("debug >>>> enhanced loop ~ "); 
        for(boolean data : ary) {
            System.out.print(data+"\t"); 
        }
        
        ///////////////////////////////////////////////////////////////////////////
        // Q) frontend로 부터 글 목록 요청이 들어 왔다면?
        BlogResponseDTO [] blogsAry = new BlogResponseDTO[10] ; 

        // builder 방식의 객체 생성
        BlogResponseDTO response = BlogResponseDTO.builder()
                                        .status(200)
                                        .message("good")
                                        .build();
        blogsAry[0] = response ;
        blogsAry[1] = response ;
        blogsAry[2] = response ;

        for(int idx=0 ; idx < blogsAry.length ; idx++) {
            BlogResponseDTO data = blogsAry[idx] ;
            if(data == null) {
                break ;
            }
            System.out.println(data.getMessage()); 
        }
        for(BlogResponseDTO data : blogsAry) {
            if(data == null) {
                break ;
            }
            System.out.println(data.getMessage()); 
        }


        ///////////////////////////////////////////////////////////
        
        BlogResponseDTO [] resultAry = BlogService.builder().build().blogs() ;

        System.out.println(">>>>> main end ");
        
    }


}



