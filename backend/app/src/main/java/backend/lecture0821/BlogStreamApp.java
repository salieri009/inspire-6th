package backend.lecture0821;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import backend.lecture0821.features.blogs.domain.dto.BlogResponseDTO;

public class BlogStreamApp {

    public static void main(String[] args) {
        ArrayList<BlogResponseDTO> blogs = new ArrayList<>(List.of(
            BlogResponseDTO.builder()
            .blogId(1).title("react").content("state").email("lim")
            .viewCnt(10).build(),
            BlogResponseDTO.builder()
            .blogId(2).title("java").content("oop").email("kim")
            .viewCnt(20).build(),
            BlogResponseDTO.builder()
            .blogId(3).title("spring").content("mybatis").email("lee")
            .viewCnt(30).build(),
            BlogResponseDTO.builder()
            .blogId(4).title("docker").content("devops").email("park")
            .viewCnt(40).build(),
            BlogResponseDTO.builder()
            .blogId(5).title("msa").content("kafka").email("lim")
            .viewCnt(50).build()
        ));

        System.out.println();
        System.out.println("debug >>>> filter : 조건검색(조회수가 30 이상인 데이터만 추출) ");  
        blogs.stream()
            .filter( blog -> blog.getViewCnt() >= 30 )
            .forEach(blog -> System.out.println(blog));
            //.forEach(System.out::println); 
        
        System.out.println();
        System.out.println("debug >>>> map : 타입변환 용도"); 
        blogs.stream()
            .filter( blog -> blog.getViewCnt() >= 30 )
            // .map(BlogResponseDTO::getEmail)
            .map( blog -> blog.getEmail())
            .forEach(System.out::println); 
        

        // Q) 이메일 계정이 lim 인 사용자만 추출해서 리스트로 반환해서 출력 
        System.out.println();
        System.out.println("debug >>>> collect : 리스트 반환 "); 
        List<BlogResponseDTO> result = blogs.stream()
                                            .filter( blog -> blog.getEmail().equals("lim") ) 
                                            // .collect(Collectors.toList()); 
                                            .toList(); 

        result.forEach(System.out::println); 


        System.out.println();
        System.out.println("debug >>>> Collectors.groupingBy : 작성자별 그룹"); 
        Map<String, List<BlogResponseDTO>> map = blogs.stream()
            .collect(Collectors.groupingBy(BlogResponseDTO::getEmail));
        
        map.get("park").stream()
            .forEach(System.out::println); 

        System.out.println();
        System.out.println("debug >>>> Q) 조회수의 평균을 확인하고 싶다면? ");  
        double avg = blogs.stream()
            .mapToInt(BlogResponseDTO::getViewCnt) 
            .average()
            .orElse(0);
        System.out.println( avg ); 

        System.out.println();
        System.out.println("debug >>>> 이메일 추출하는데 중복된 데이터는 한번만 출력하고 싶다면?"); 
        blogs.stream()
            .map(BlogResponseDTO::getEmail) 
            .distinct()
            .forEach(System.out::println);         
        
        System.out.println();
        System.out.println("debug >>>> sort , reversed "); 
        blogs.stream()
            .sorted(Comparator.comparing(BlogResponseDTO::getViewCnt).reversed())
            .forEach(System.out::println); 
        
        System.out.println();
        System.out.println("debug >>>> anyMatch(존재여부 판단) , allMatch(검증) ");  
        System.out.println("debug >>>> Q) 블로그 작성자(lim) 존재여부를 판단? ");  

        boolean isEmail = blogs.stream()
            .anyMatch( blog -> blog.getEmail().equals("jslim"));
        System.out.println( isEmail ); 

        boolean isExists = blogs.stream()
            .allMatch(blog -> blog.getViewCnt() >= 20) ;
        System.out.println( isExists ); 

        boolean isUnder = blogs.stream()
            .noneMatch(blog -> blog.getViewCnt() < 10 ) ;
        System.out.println( isUnder ); 

        /*
        NPE 회피하는 방법
        Optional 
        - 메서드 호출시 반환값을 확신할 수 없을 때 사용하는 문법
        - null.method() : null 값 처리를 놓쳐서 발생하는 예외를 피하고자 할 때 
        - 메서드의 반환타입으로만 사용(전역변수, 매개변수)
        - 사용의도에 맞게 사용해야 함( null 할당 X) 
        */

        System.out.println();
        System.out.println("debug >>>> optional "); 
        Optional<String> optional = Optional.of("lgcns"); 
        // if( optional.isPresent() ) {
        //     System.out.println( optional.get() ); 
        // } eles {
        
        // }
        // optional.ifPresent(value -> System.out.print(value)); 
        // java version 9+
        optional.ifPresentOrElse(
            value -> System.out.println(value), 
            () -> System.out.println("값이 없습니다.")); 
        
        optional = Optional.empty() ;
        String err = optional.orElseThrow(() -> new RuntimeException("값이 없습니다.")) ;
        System.out.println( err ); 

    }

}