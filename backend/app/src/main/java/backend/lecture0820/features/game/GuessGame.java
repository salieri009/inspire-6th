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


/*
 * 웹 애플리케이션의 일반적인 처리 흐름
 *
 * 1. 클라이언트가 브라우저나 프론트엔드에서 HTTP 요청을 보낸다.
 * 2. 웹 서버 또는 WAS(Web Application Server)가 요청을 받고 URL, HTTP 메서드,
 *    헤더와 파라미터를 분석한다.
 * 3. 서블릿(Servlet)은 Java 웹 애플리케이션에서 HTTP 요청과 응답을 처리하는
 *    표준 컴포넌트이다. 서블릿 컨테이너(Tomcat 등)는 요청마다 서블릿을 찾아
 *    service(), doGet(), doPost() 같은 메서드를 호출한다.
 * 4. 실제 프로젝트에서는 모든 요청을 하나의 서블릿이 직접 처리하기보다
 *    프레임워크의 DispatcherServlet 또는 라우터가 URL을 알맞은 Controller로
 *    연결한다. 이 연결은 보통 매핑 정보와 객체 생성/관리 기능을 이용하며,
 *    이를 단순히 Factory Pattern이라고만 보기는 어렵다.
 * 5. Controller는 요청 데이터를 검증하고 필요한 Service를 호출한다. 즉,
 *    HTTP와 화면/API 응답에 관한 역할을 담당하며 복잡한 비즈니스 로직은
 *    가능한 한 Service에 맡긴다.
 * 6. Service는 애플리케이션의 업무 규칙을 처리하고, 필요한 경우 Repository
 *    또는 DAO(Data Access Object)를 호출한다.
 * 7. Repository/DAO는 데이터베이스 조회·저장·수정·삭제를 담당한다. 처리 결과는
 *    Repository -> Service -> Controller 방향으로 반환되고, Controller는 이를
 *    JSON, HTML, 상태 코드 등의 HTTP 응답으로 변환해 클라이언트에 돌려준다.
 *
 * 데이터 접근 기술의 차이
 * - JDBC: SQL과 커넥션 처리를 개발자가 직접 작성한다.
 * - MyBatis: SQL은 직접 작성하되 자바 객체와 결과 매핑을 도와주는 SQL Mapper다.
 * - JPA: 객체와 테이블을 매핑하는 표준 API이며 Hibernate는 대표적인 구현체다.
 * - Hibernate/JPA가 기본 CRUD와 일부 연관관계 처리를 자동화할 수 있지만,
 *   모든 INSERT, UPDATE, JOIN을 항상 자동으로 최적 처리하는 것은 아니다.
 *   복잡한 조회에서는 JPQL, Criteria 또는 네이티브 SQL이 필요할 수 있다.
 *
 * null과 Optional
 * Optional은 모든 null을 자동으로 없애는 기능이 아니다. Repository가 값이
 * 없을 수 있다는 사실을 명시하고, 호출자가 존재 여부를 확인하도록 돕는
 * 반환 타입이다. 예를 들어 Optional<User>를 받은 Service는 isPresent(),
 * orElseThrow() 등을 사용해 정상 흐름과 예외 흐름을 분리한다. Controller는
 * 그 결과에 따라 200, 404 등의 HTTP 상태 코드와 응답을 만들어낸다.
 *
 * 전체 흐름 예시:
 * HTTP 요청 -> 서블릿 컨테이너/라우터 -> Controller -> Service
 * -> Repository/DAO -> 데이터베이스 -> 결과 반환 -> HTTP 응답
 */