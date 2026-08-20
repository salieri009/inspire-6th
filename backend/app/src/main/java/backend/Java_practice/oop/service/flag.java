package backend.Java_practice.oop.service;

public enum flag {
    STUDENT(1),
    TEACHER(2),
    MANAGER(3);

    private final int value;

    // ENUM 생성자
    flag(int value) {
        this.value = value;
    }

    // ENUM 값 가져오기 -> ENUM 은 CAPITAL 로 들어가야함 PROPERTY 를 굳이 안넣어도 되긴하나. 넣어서 관리는 가능함
}
