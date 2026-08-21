package backend.lecture0819.features.blogs.factory;

import java.util.HashMap;
import java.util.Map;

import backend.lecture0819.features.blogs.controller.ListController;
import backend.lecture0819.features.blogs.controller.ReadController;
import backend.lecture0819.features.blogs.repository.BlogReactDao;
import backend.lecture0819.features.blogs.service.BlogReactService;
import backend.lecture0819.features.blogs.service.BlogReactServiceImpl;

/*
singleton   pattern
factory     pattern 
사용자의 요청 endPoint 로 각 controller 객체를 바인딩해서 담을 것 : Map
*/
public class BlogBeanFactory {

    private Map<String, Object>     map ; 
    private static BlogBeanFactory  instance ; 
    
    // dependency injection
    private BlogReactService        service ; 
    private BlogReactDao            dao ; 


    private BlogBeanFactory() {
        map = new HashMap<>();
        
        dao = new BlogReactDao();
        service = new BlogReactServiceImpl(dao);

        // 추후 추가되는 각 기능을 구현하는 xxxController 등록
        map.put("list.inspire", new ListController(service));
        map.put("read.inspire", new ReadController(service));
    }

    public static BlogBeanFactory getInstance() {
        if(instance == null) {
            instance = new BlogBeanFactory() ; 
        }
        return instance;
    }

    // front controller 가 호출하는 메서드 
    public Object getBean(String endPoint) {
        return map.get(endPoint) ;
    }


}


// optional 은 <t> 으로써 null point exceptional 을 방지하는데사용이 된다 
// stream 으로 조건 검색, 조회수가 30 이상인 데이터만 추출 

// filter( b -> b.getViewCount() >= 30 ) // 
// filter 같은 경우는 stream 에서 조건에 맞는 데이터만 추출하는 역할을 한다.
// 즉 중간값이 boolean 값으로 반환되며, 조건에 맞는 데이터만 다음 단계로 전달된다.
// blogs.stream().filter( b -> b.getViewCount() >= 30 ).forEach( b -> System.out.println(b));
// blogs.stream.filter(b -> b.getname().contains("lim")).forEach(b -> System.out.println(b));

// 이름이 lim 이 들어간 데이터만 추출하는 예제이다.
// 아니면 collect(Collectors.toList()) 를 사용하여 조건에 맞는 데이터를 리스트로 반환할 수도 있다.
//stream 은 

// ArrayList, LinkedList, HashSet, TreeSet 등과 같은 컬렉션에서 데이터를 추출할 때 사용된다.

// blogs.stream().collect(Collectors.toList()) // 조건에 맞는 데이터를 리스트로 반환, collect 는 중간연산 없이 최종 연산을 한다는 것을 의미함
// groupingBy 는 stream 에서 데이터를 그룹화하는 역할을 한다.
//collectors

//Map<String, List<Blog>> groupedBlogs = blogs.stream().collect(Collectors.groupingBy(Blog::getCategory));
// 여기서 getEmail 은 Blog 클래스의 getEmail() 메서드를 의미하며, 이메일을 기준으로 데이터를 그룹화한다는 것을 의미한다.
// :: 로 표현한건 reflection 을 의미하며, 메서드 참조를 통해 데이터를 그룹화하는 역할을 한다.
// // 메서드 참조랑 메서드랑 차이점은 ZEP AI의 답변
// 좋은 질문이에요! 메서드 참조(Method Reference)와 메서드 호출(Method Calling)의 차이를 쉽게 설명해 볼게요.

// - **메서드 호출 (Method Calling)**: 메서드를 직접 실행하는 거예요. 예를 들어 `obj.myMethod()` 이렇게 하면 바로 그 메서드가 실행돼요.

// - **메서드 참조 (Method Reference)**: 메서드 자체를 **참조(주소처럼 전달)**하는 거예요. 실행하지 않고, 나중에 실행할 수 있도록 메서드의 위치만 넘기는 느낌이에요. 보통 자바 8의 람다 표현식이나 스트림 API에서 사용돼요. 예:  
//   `ClassName::methodName`

// 즉, 메서드 호출은 바로 실행, 메서드 참조는 실행할 ‘함수’를 가리키는 것이라고 생각하면 돼요.
// 왜 이렇게 하냐면, 스트림이나 람다에서 특정 메서드를 반복적으로 호출하고 싶을 때, 메서드 참조를 사용하면 코드가 더 깔끔해지고 가독성이 좋아지거든요.
// 예를 들어, `list.stream().map(String::toUpperCase)` 이렇게 하면 리스트의 모든 문자열을 대문자로 바꾸는 작업을 수행할 수 있어요. 여기서 `String::toUpperCase`는 메서드 참조예요.
//  조회수의 평균을 구하고싶다면

//blogs.stream().mapToInt(Blog::getViewCount).average().orElse(0.0);
//

// double avg = blogs.stream().mapToInt(Blog::getViewCount).average().orElse(0.0);

// 아니면 distinct 를 사용하여 중복을 제거할 수도 있다.
// users = blogs.stream().map(Blog::getEmail).distinct().collect(Collectors.toList());
// blogs.stream().sort(Comparator.comparing(Blog::getViewCount).reversed()).forEach(b -> System.out.println(b));
// blogs.stream().sorted(Comparator.comparing(Blog::getViewCount).reversed()).forEach(b -> System.out.println(b));
// 이렇게 하면 조회수가 높은 순서대로 정렬하여 출력할 수 있다.
// 객체의 sort 는 불가능하기 때문에
// 객체 내부에 있는 필드를 기준으로 정렬을 해야한다.
// blog 작성자의 존재 여부를 판단하고싶다
// blogs.stream().anyMatch(b -> b.getAuthor().equals("lim"));
// anyMatch 는 stream 에서 조건에 맞는 데이터가 하나라도 존재하는지 확인하는 역할을 한다.
// allMatch 는 stream 에서 조건에 맞는 데이터가 모두 존재하는지 확인하는 역할을 한다.
// prdicate 는 stream 에서 조건을 정의하는 역할을 한다.

// filter 에서 사용하는것은 forEach 가 아니라 collect 를 사용하고

// map 은 stream 에서 데이터를 변환하는 역할을 한다.

// Optional 은 null point exceptional 을 방지하는데사용이 된다
// 메서드 호출시 반환값을 확신할수없을때사용ㅎ나다

// optional.ifPresent( b -> System.out.println(b)); // optional 에 값이 존재하면 출력하는 역할을 한다.
// optional.orElse( new Blog() ) // optional 에 값이 존재하지 않으면 새로운 객체를 반환하는 역할을 한다.
// 