package backend.lecture0814;

// [학습 정리] 멤버변수 접근: getter/setter vs 필드 직접 접근
// - Teacher.name이 public이라 인스턴스로 직접 접근/대입이 가능하지만, 보통은 캡슐화를 위해
//   private 필드 + getter/setter 조합을 권장함
import backend.lecture0814.features.var.Teacher ;

public class TeacherApp {

    public static void main(String[] args) {

        // new 연산자를 이용해서 instance 를 생성할 수 있음.
        Teacher teacher = new Teacher();
        System.out.println("teacher - "+teacher); 
        
        // 인스턴스 소유 메서드 접근
        teacher.setName("임정섭");
        String name = teacher.getName();
        System.out.println(name); 
        
        // 인스턴스 소유 변수 접근 
        teacher.name = "inspire";
        System.out.println(name); 

        

 
    }

}

