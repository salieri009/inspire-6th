package backend.lecture0818;

// [학습 정리] String 비교 - == (참조 비교) vs .equals() (값 비교)
// - new String(...) 은 매번 새 객체를 heap에 생성하므로, 내용이 같아도 == 는 false
// - 문자열 리터럴("lgcns")은 String Pool을 공유하므로 == 가 true가 될 수 있음(주석 처리된 부분 참고)
// - 값(내용) 비교가 목적이라면 반드시 .equals() 사용
public class StringApp {
    public static void main(String[] args) {

        // String str01 = "lgcns";
        // String str02 = "lgcns";

        String str01 = new String("lgcns");
        String str02 = new String("lgcns");


        if( str01 == str02 ) {
            System.out.println("str01 == str02");
        } else {
            System.out.println("str01 != str02");
        }
        if( str01.equals(str02) ) {
            System.out.println("str01.equals(str02)");
        } else {
            System.out.println("str01.!equals(str02)");
        }






    }
}
