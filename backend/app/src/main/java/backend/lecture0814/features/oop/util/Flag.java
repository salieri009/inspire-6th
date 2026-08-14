package backend.lecture0814.features.oop.util;

/*
[학습 정리] enum (열거형) - 정해진 상수 집합을 표현하는 특수 클래스
- STUDENT(1), TEACHER(2), MANAGER(3) 세 개의 값만 존재하도록 컴파일 시점에 강제되는 타입
  -> int 상수(1,2,3)를 그냥 쓰는 것보다 안전함(오타/범위를 벗어난 값이 들어올 수 없음)
- enum도 일반 클래스처럼 생성자/필드/메서드를 가질 수 있음(단, 생성자는 항상 private -> 외부에서
  new Flag(...) 로 새 값을 만들 수 없고 STUDENT/TEACHER/MANAGER처럼 미리 정의된 상수만 사용)
- 각 상수(STUDENT 등)는 사실 Flag 타입의 "미리 만들어진 단 하나의 인스턴스"이며, 그 인스턴스를
  만들 때 괄호 안의 값(1,2,3)이 생성자로 전달되어 flag 필드에 저장됨
- getFlag()로 내부에 저장된 int 값을 꺼내 쓸 수 있고, switch문/==비교와도 자연스럽게 결합됨
  (EnumApp.java 참고)
*/
public enum Flag {

    STUDENT(1), TEACHER(2), MANAGER(3) ;

    private final int flag ;

    private Flag(int flag) {
        this.flag = flag ;
    }
    public int getFlag() {
        return this.flag ;
    }

}
