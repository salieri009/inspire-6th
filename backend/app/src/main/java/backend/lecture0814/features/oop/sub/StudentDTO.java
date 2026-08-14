package backend.lecture0814.features.oop.sub;

import backend.lecture0814.features.oop.sup.PersonDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

// [학습 정리] @SuperBuilder를 쓰는 자식 클래스도 반드시 @SuperBuilder를 붙여야
// 부모(PersonDTO)의 빌더를 이어받아 name/age/address까지 함께 빌드할 수 있음
@SuperBuilder
@Getter
@Setter
@ToString
public class StudentDTO extends PersonDTO {

    private String  ssn ;

    // public StudentDTO(){
    // }
    public StudentDTO(String name, int age, String address, String ssn) {
        super(name, age, address);
        this.ssn = ssn;
    }


    // public String getSsn() {
    //     return ssn;
    // }

    // public void setSsn(String ssn) {
    //     this.ssn = ssn;
    // }


    @Override
    public String personInfo() {
        return super.personInfo()+", ssn=" + ssn ;
    }
    public String stuInfo() {
        return super.personInfo()+", ssn=" + ssn ;
    }


}
