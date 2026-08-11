package backend.Java_practice.blogs;

import backend.Java_practice.blogs.blogDto.BlogRequestDTO;

public class blogApp {
    static public void main(String[] args) {
        System.out.println("Hello World!");

        BlogRequestDTO blogRequestDTO = BlogRequestDTO.builder()
                .title("My First Blog")
                .content("This is the content of my first blog.")
                .build();
                // DTO 를 통해서 데이터를 전달할 수 있다. DTO 는 데이터를 전달하기 위한 객체이다.
                /// 이렇게 biding 이 된다 이거야

                System.out.println(blogRequestDTO.getTitle());

                //뭐 근데 logger 를 쓰면 System.out.println 을 안써도 된다. System.out.println 은 그냥 콘솔에 출력하는거고, logger 는 로그를 남기는거다. 로그를 남기면 나중에 문제가 생겼을 때, 로그를 보고 문제를 해결할 수 있다.
                // logger 를 쓰는게 권장되긴해
    }

}

// 여기에서 오는건 사실상 front 에서 오는거임

// Data transfer object (DTO) : 데이터를 전달하기 위한 객체
// Data access object (DAO) : 데이터를 접근하기 위한 객체
// Model : 데이터를 표현하기 위한 객체
// Entity : 데이터를 표현하기 위한 객체
// Value object (VO) : 데이터를 표현하기 위한 객체

// 

// front-end : 사용자 인터페이스를 구성하는 부분 , 이 데이터 들은 back-end 에서 가져온다.
// 가져오는 방법은 DTO 를 통해서 가져온다. DTO 는 데이터를 전달하기 위한 객체이다.


// bto -> entity -> dao -> service -> controller -> front-end
// factory pattern : 객체를 생성하는 패턴
// singleton pattern : 객체를 하나만 생성하는 패턴
// builder pattern : 객체를 생성하는 패턴
// strategy pattern : 알고리즘을 캡슐화하여 교환 가능하게 만드는 패턴
// observer pattern : 객체의 상태 변화를 관찰하는 패턴
// adapter pattern : 인터페이스를 변환하는 패턴
// decorator pattern : 객체에 새로운 기능을 추가하는 패턴

/// 뭐 예시로 factory pattern 은 객체를 생성하는 패턴이다. 예를 들어, Student 객체를 생성할 때, StudentFactory 를 통해서 생성할 수 있다. StudentFactory 는 Student 객체를 생성하는 역할을 한다.
// StudentFactory 는 Student 객체를 생성하는데


// Class StudentFactory {
//     public static Student createStudent(String name, int age, String major) {
//         return new Student(name, age, major);
//     }
// }

// 싱글톤으로 student factory 를 하나 만들어두고 거기서 Student 객체를 생성할 수 있다. 이렇게 하면 Student 객체를 생성하는데 필요한 로직을 StudentFactory 에서 관리할 수 있다.


// ===== 08/11 강의 소스(src_0811.zip) 프로젝트 세팅 개념 =====

// 1) 기능(feature) 단위 패키지 구조
// features/<도메인>/domain/dto , features/<도메인>/domain/entity 처럼
// "도메인 폴더 하나 -> 그 안에 domain 폴더 -> 역할별(dto, entity, ...) 하위 폴더" 로 나누는 방식.
// 지금 이 프로젝트의 blogs/blogDto 처럼 한 폴더에 다 몰아넣는 것보다,
// domain 밑에서 dto/entity 를 더 잘게 나눠서 "이 클래스가 무슨 역할인지" 폴더 이름만 봐도 알 수 있게 한다.
// ex) features/blogs/domain/dto/BlogRequestDTO.java , features/blogs/domain/entity/Blog.java(예정)

// 2) 주제별 App 클래스 분리
// BlogApp, CarApp, TeacherApp, VariableApp 처럼 학습 주제마다 main() 을 가진 실행 클래스를 따로 둔다.
// 한 클래스에 모든 실습 코드를 몰아넣지 않고, 주제 단위로 진입점을 쪼개서 관리하는 실습 구성.

// 3) Lombok 어노테이션 조합 (BlogRequestDTO 예시: @Builder @NoArgsConstructor @AllArgsConstructor @Setter @Getter)
// @Builder                : 빌더 패턴으로 객체를 생성할 수 있게 해준다. (title().content().build() 같은 체이닝)
// @NoArgsConstructor      : 매개변수 없는 기본 생성자를 자동으로 만들어준다.
// @AllArgsConstructor     : 모든 필드를 매개변수로 받는 생성자를 자동으로 만들어준다.
// @Getter / @Setter       : 모든 필드에 대한 getter/setter 메서드를 자동으로 만들어준다.
// 네 개를 같이 붙이면 생성자, 빌더, getter, setter 를 직접 안 적어도 컴파일 시점에 자동으로 생성된다.
// (지금 프로젝트의 blogDto/BlogRequestDTO.java 는 이걸 손으로 다 작성한 버전 -> Lombok 쓰면 그 코드가 다 사라짐)
