package backend.lecture0818;

// [학습 정리] Enum(열거형)
// - 서로 관련된 상수들의 집합을 타입 안전하게 표현
// - switch 문(화살표 표기)에서 case 값으로 상수명만 사용, break 불필요
// - enum 인스턴스는 JVM에 단 하나만 존재하므로 == 비교가 안전(equals와 동일 결과)
import backend.lecture0818.features.oop.util.Flag;

public class EnumApp {
    public static void main(String[] args) {
        Flag flag = Flag.STUDENT;
        System.out.println(flag);
        System.out.println(flag.getFlag());

        System.out.println(">>>> switch 활용");
        switch (flag) {
            case STUDENT -> System.out.println("학생");
            case TEACHER -> System.out.println("강사");
            case MANAGER -> System.out.println("매니저");
        }
        System.out.println(">>>> == 비교");
        if(flag == Flag.STUDENT) {
            System.out.println("학생");
        }
    }
}
