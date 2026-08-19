package backend.lecture0819;

import backend.lecture0819.features.oop.service.OopService;
import backend.lecture0819.features.oop.sub.ManagerDTO;
import backend.lecture0819.features.oop.sub.StudentDTO;
import backend.lecture0819.features.oop.sub.TeacherDTO;
import backend.lecture0819.features.oop.sup.PersonDTO;
import backend.lecture0819.features.oop.util.Flag;

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
