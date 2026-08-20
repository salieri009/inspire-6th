package backend.lecture0820;

import java.util.ArrayList;
import java.util.List;

import backend.lecture0820.features.generics.ResponseTemplate;
import backend.lecture0820.features.oop.sub.ManagerDTO;
import backend.lecture0820.features.oop.sub.StudentDTO;
import backend.lecture0820.features.oop.sub.TeacherDTO;
import backend.lecture0820.features.oop.sup.PersonDTO;

public class GenericsApp {

    public static void main(String[] args) {
        
        System.out.println();
        System.out.println("debug >>>> Generics App "); 

        // generic wildcard : extends vs super 
        // 메서드의 매개변수 타입선언 및 리턴타입 지정할 때 자주 사용되는 문법
        // extends : 읽기전용(T 하위타입)
        // super   : 쓰기전용(T 상위타입)
        
        List<PersonDTO> personList = new ArrayList<PersonDTO>();
        // List<? extends PersonDTO> personList = new ArrayList<PersonDTO>();
        // List<? super PersonDTO> personList = new ArrayList<PersonDTO>();
        StudentDTO student = StudentDTO.builder()
                                .name("inspire").build();
        TeacherDTO teacher = TeacherDTO.builder()
                                .name("jslim").build();
        ManagerDTO manager = ManagerDTO.builder()
                                .name("lgcns").build();
        personList.add(student); 
        personList.add(teacher); 
        personList.add(manager);

        // 입력성공 : 201, CREATED, xxxDTO
        // ResponseTemplate<PersonDTO> response = 
        //     new ResponseTemplate<PersonDTO>(201, "CREATED", student) ; 
         
        // 목록조회 : 200, OK, list 
        ResponseTemplate<List<PersonDTO>> response = 
            new ResponseTemplate<List<PersonDTO>>(200, "OK", personList) ; 
        
        List<PersonDTO> lst = response.getData();
        for(int idx=0 ; idx < lst.size() ; idx++) {
            PersonDTO person = lst.get(idx); 
            System.out.println( ((PersonDTO)person).personInfo() );
        }



    }

}