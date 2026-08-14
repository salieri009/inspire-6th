package backend.lecture0814;

import backend.lecture0814.features.oop.service.OopService;
import backend.lecture0814.features.oop.sub.ManagerDTO;
import backend.lecture0814.features.oop.sub.StudentDTO;
import backend.lecture0814.features.oop.sub.TeacherDTO;
import backend.lecture0814.features.oop.sup.PersonDTO;
import backend.lecture0814.features.oop.util.Flag;

/*
[학습 정리] 상속(extends)과 다형성(polymorphism) + OopService를 통한 매개변수 다형성
- StudentDTO/TeacherDTO/ManagerDTO가 모두 PersonDTO를 extends하고, @SuperBuilder 빌더
  체이닝(또는 super() 생성자)으로 부모 필드까지 함께 초기화
- 변수의 다형성: PersonDTO 타입 변수/배열이 실제로는 자식 객체(StudentDTO 등)를 참조할 수 있음
- 부모 타입 변수로는 부모가 아는 멤버만 접근 가능 -> 자식 고유 멤버는 다운캐스팅
  ((TeacherDTO)per)해야 접근 가능
- 메서드의 다형성: 각 자식이 @Override한 personInfo()를 부모 타입 배열을 순회하며 호출하면
  실제 객체 타입에 맞는 재정의 버전이 실행됨(동적 바인딩) -> instanceof + 캐스팅 없이도
  다형적으로 처리 가능
- 매개변수의 다형성(OopService.makePerson): 메서드 시그니처는 PersonDTO 하나뿐이지만
  enum(Flag) 값에 따라 내부에서 서로 다른 자식 타입을 생성해 담아줌 -> 호출하는 쪽(OopApp)은
  "어떤 구체 타입이 만들어지는지" 몰라도 되고, 결과를 항상 PersonDTO로 일관되게 다룰 수 있음
  (findPerson으로 이름 검색까지 - 간단한 CRUD 서비스 계층 예시)
*/
public class OopApp {

    public static void main(String[] args) {

        // StudentDTO stu = new StudentDTO();
        // stu.setSsn("2026");
        // stu.setName(null);
        // stu.setAge(0);
        // stu.setAddress(null);

        StudentDTO stu
            = new StudentDTO("임섭순", 20, "서울", "2026");
        System.out.println(stu.getName());
        System.out.println(stu.getAge());
        System.out.println(stu.getAddress());
        System.out.println(stu.getSsn());

        System.out.println();
        System.out.println("debug >>>> TeacherDTO");
        // Q) TeacherDTO 도 PersonDTO 상속받고 StudentDTO 객체생성처럼 구현
        TeacherDTO tea
            = new TeacherDTO("임섭순", 20, "서울", "java");
        System.out.println(tea.getName());
        System.out.println(tea.getAge());
        System.out.println(tea.getAddress());
        System.out.println(tea.getSubject());


        System.out.println();
        System.out.println("debug >>>> 변수타입의 다형성");
        PersonDTO manager
            = new ManagerDTO("김혜림", 20, "서울", "교육사무국") ;

        // Q) manager.getDept() 접근할 수 있는 방법은?
        // casting 이 참조타입에 적용될 수 있음(다만, 상속관계를 전제로)
        System.out.println(manager.getName());
        System.out.println(manager.getAge());
        System.out.println(manager.getAddress());
        System.out.println( ((ManagerDTO)manager).getDept());


        System.out.println();
        System.out.println("debug >>>> 변수타입의 다형성을 활용 : 배열");

        PersonDTO [] ary = new PersonDTO[3] ;
        ary[0] = new TeacherDTO("임정섭", 20, "서울", "react") ;
        ary[1] = new ManagerDTO("김혜림", 20, "서울", "교육팀") ;
        ary[2] = new StudentDTO("이상혁", 20, "서울", "2026") ;


        PersonDTO per01 = ary[0] ;
        System.out.println(per01.getName());
        System.out.println(per01.getAge());
        System.out.println(per01.getAddress());
        System.out.println(((TeacherDTO)per01).getSubject());

        System.out.println();
        // for(int idx=0 ; idx < ary.length ; idx++) {
        //     PersonDTO per = ary[idx];
        //     if (per instanceof TeacherDTO) {
        //         System.out.println( ((TeacherDTO)per).getSubject() );
        //     }
        //     if (per instanceof ManagerDTO ) {
        //         System.out.println( ((ManagerDTO)per).getDept() );
        //     }
        //     if (per instanceof StudentDTO ) {
        //         System.out.println( ((StudentDTO)per).getSsn() );
        //     }
        // }

        for(int idx=0 ; idx < ary.length ; idx++) {
            PersonDTO per = ary[idx];
            System.out.println( per.personInfo() );
        }


        System.out.println();
        System.out.println();
        System.out.println("debug >>>> 매개변수의 다형성 ");
        System.out.println();

        OopService service = new OopService();

        // service.setAry(stu);
        // service.setAry(tea);
        // service.setAry(manager);

        service.makePerson(Flag.STUDENT, "문한일", 20, "seoul", "2026");
        service.makePerson(Flag.TEACHER, "임정섭", 20, "seoul", "java");
        service.makePerson(Flag.MANAGER, "김혜림", 20, "seoul", "교육팀");

        System.out.println();
        System.out.println("debug >>>> 정보출력");
        PersonDTO[] result = service.getAry() ;
        for(PersonDTO person : result) {
            if(person == null) {
                break ;
            }
            System.out.println( person.personInfo() );
        }
        System.out.println();
        System.out.println("debug >>>> findPerson ");
        PersonDTO find = service.findPerson("박수진");
        if( find != null ) {
            System.out.println(find.personInfo());
        }else {
            System.out.println(">>>> Not Found!!");
        }

    }

}
