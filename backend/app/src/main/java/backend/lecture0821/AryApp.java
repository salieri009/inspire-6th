package backend.lecture0821;

import backend.lecture0821.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0821.features.blogs.service.BlogService;
import backend.lecture0821.features.game.GuessGame;

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