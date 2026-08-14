package backend.lecture0814.features.oop.service;

import backend.lecture0814.features.oop.sub.ManagerDTO;
import backend.lecture0814.features.oop.sub.StudentDTO;
import backend.lecture0814.features.oop.sub.TeacherDTO;
import backend.lecture0814.features.oop.sup.PersonDTO;
import backend.lecture0814.features.oop.util.Flag;

/*
- 배열을 통한 xxxxxDTO 를 관리하고 싶다.
- search, delete, insert, update 요청 처리

[학습 정리] 매개변수의 다형성(polymorphic parameter) + enum으로 분기하는 팩토리성 로직
- makePerson()의 파라미터 타입은 항상 PersonDTO 부모 타입 하나뿐이지만, 실제로 배열(ary)에
  담기는 객체는 flag 값에 따라 StudentDTO/TeacherDTO/ManagerDTO 중 하나로 달라짐
  -> "메서드 하나로 여러 하위 타입을 다룬다"는 점에서 오버로딩(overload)과는 다른 다형성 사례
- flag 매개변수를 enum(Flag) 타입으로 받으면, 예전처럼 int(1/2/3)로 받을 때보다 잘못된 값이
  들어올 가능성이 원천 차단됨(컴파일 시점에 Flag.STUDENT/TEACHER/MANAGER 중 하나만 가능)
- 삼항연산자를 중첩해서 "조건에 맞는 DTO를 만들고 그 결과를 PersonDTO 타입 변수에 담는" 방식은
  OopApp의 배열 예제와 마찬가지로 "부모 타입 변수가 자식 객체를 참조"하는 업캐스팅의 연장선
- findPerson()은 이름으로 배열을 순회 탐색하는 단순 검색(선형 탐색) 예시
*/

public class OopService {

    private PersonDTO []    ary ;
    private int             idx ;

    public OopService() {
        ary = new PersonDTO[10];
        idx = 0 ;
    }

    private void setAry(PersonDTO per) {
        ary[idx++] = per ;
    }
    // copy (shallow Copy, deep copy)
    public PersonDTO [] getAry() {
        return ary ;
    }

    /*
    CRUD
    params : flag, name, age, address, comm(ssn, subject, dept)
    flag : 1 -> Student, 2 -> Teacher, 3 -> Mananger
    makePerson() 매개변수로 전달된 값을 가지고 타입에 맞는 객체를 생성하고 배열 담는 역할
    */
    public void makePerson(Flag flag, String name, int age, String address, String comm) {
        System.out.println("debug >>>> enum flag : "+flag);
        System.out.println("debug >>>> enum flag getXXX : "+flag.getFlag());
        /*
        switch (flag.getFlag()) {
            case 1 -> System.out.println("학생");
            case 2 -> System.out.println("강사");
            case 3 -> System.out.println("매니저");
        }
        switch (flag) {
            case STUDENT -> System.out.println("학생");
            case TEACHER -> System.out.println("강사");
            case MANAGER -> System.out.println("매니저");
        }
        */
        PersonDTO per =
            (flag.getFlag() == 1)
            ?
                StudentDTO.builder()
                    .name(name).age(age).address(address)
                    .ssn(comm).build()
            : (flag.getFlag() == 2) ?
                TeacherDTO.builder()
                    .name(name).age(age).address(address)
                    .subject(comm).build()
            :   ManagerDTO.builder()
                    .name(name).age(age).address(address)
                    .dept(comm).build() ;

        setAry(per);
    }


    /*
    params : name
    method : findPerson
    return : PersonDTO
    Q) 이름을 전달받아서 일치하는 이름을 가진 PersonDTO 를 리턴한다.
    */
    public PersonDTO findPerson(String name) {
        PersonDTO result = null ;
        for(PersonDTO person : ary) {
            if(person == null) {
                break ;
            } else {
                if(person.getName().equals(name)) {
                    return person ;
                }
            }
        }
        return result ;
    }

}
