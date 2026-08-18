package backend.lecture0818;

// [학습 정리] 캡슐화(encapsulation) - public 필드 직접 접근 vs getter/setter
// - teacher.name = "inspire" 처럼 public 필드는 직접 접근/수정이 가능하지만 값 검증 로직을 넣을 수 없음
// - getter/setter를 사용하면 접근 시점에 유효성 검증, 로깅 등을 추가할 수 있어 유지보수에 유리
import backend.lecture0818.features.var.Teacher ;

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

