package backend.lecture0814.features.oop.sup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/*
[학습 정리] Lombok @SuperBuilder - 상속 계층에서의 빌더 패턴
- 일반 @Builder는 부모 필드까지 체이닝해주지 못하기 때문에, 상속 관계(부모-자식)에서 빌더를
  쓰려면 부모/자식 모두에 @SuperBuilder를 붙여야 함
- @SuperBuilder가 만들어주는 builder()는 부모(super)의 빌더를 자식 빌더가 상속받는 구조라서
  StudentDTO.builder().name(...).age(...).address(...).ssn(...).build() 처럼
  부모 필드(name/age/address)와 자식 필드(ssn)를 한 번의 체이닝으로 채울 수 있음
- @Getter/@Setter/@ToString은 컴파일 시점에 getter/setter/toString()을 자동 생성 -> 아래
  주석 처리된 수동 getter/setter 코드가 사실상 동일한 역할을 함(중복 제거 목적)
- 단, @SuperBuilder를 쓰더라도 생성자 오버로딩(new PersonDTO(name, age, address))처럼
  직접 정의한 생성자는 별개로 계속 존재/사용 가능
*/
@SuperBuilder
@Getter
@Setter
@ToString
public class PersonDTO {

    private String  name ;
    private int     age  ;
    private String  address;

    // public PersonDTO(){
    // }

    public PersonDTO(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }


    // public String getName() {
    //     return name;
    // }

    // public void setName(String name) {
    //     this.name = name;
    // }

    // public int getAge() {
    //     return age;
    // }

    // public void setAge(int age) {
    //     this.age = age;
    // }

    // public String getAddress() {
    //     return address;
    // }

    // public void setAddress(String address) {
    //     this.address = address;
    // }

    public String personInfo() {
        return "name=" + name + ", age=" + age + ", address=" + address ;
    }

}
