package backend.lecture0813;

// [학습 정리] 문자열 비교: == (참조 비교) vs equals() (값 비교)
// - new String(...)으로 만든 두 문자열은 내용이 같아도 서로 다른 객체이므로 ==는 false
// - 실제 값(내용)이 같은지 비교하려면 반드시 equals()를 사용해야 함
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
