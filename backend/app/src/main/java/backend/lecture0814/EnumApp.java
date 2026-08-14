package backend.lecture0814;

import backend.lecture0814.features.oop.util.Flag;

/*
[학습 정리] enum 활용: 값 출력 / switch식(arrow) / == 비교
- flag.toString()은 별도로 재정의하지 않으면 상수 이름 그대로("STUDENT")가 출력됨
- switch (flag) { case STUDENT -> ... } 처럼 자바 14+ 의 switch 표현식(arrow 문법)으로
  각 enum 상수별 분기 처리 가능 -> break 없이도 fall-through가 발생하지 않음
- enum 상수는 애플리케이션 전체에서 동일한 단일 인스턴스이므로 equals() 대신 ==로 비교해도
  항상 안전하게 참조 동일성이 성립함(문자열의 ==와 달리 enum의 ==는 관용적으로 사용됨)
*/
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
