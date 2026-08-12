package backend.Java_practice.stats;

// static 키워드 데모
// - static 변수(class variable): 인스턴스가 아니라 클래스 자체에 속해서, 모든 인스턴스가 값을 공유한다.
// - static 메서드: 객체를 생성하지 않고 클래스명으로 바로 호출할 수 있다. (예: Math.random())
//
// Java 17 API 문서 확인하는 법:
// https://docs.oracle.com/en/java/javase/17/docs/api/index.html 에서
// 왼쪽 패키지 트리 또는 검색창으로 클래스(java.lang.Math 등)를 찾으면
// 그 클래스의 모든 static/instance 멤버 목록과 설명을 볼 수 있다.
public class StaticDemo {

    public static String staticMessage = "static 변수: 클래스 전체가 공유하는 값 (인스턴스 소유가 아님)";

    public static String staticGreet() {
        return "StaticDemo.staticGreet() - 객체 생성 없이 클래스명으로 바로 호출됨";
    }
}
