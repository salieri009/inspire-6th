package backend.lecture0813.features.oop.sub;

import backend.lecture0813.features.oop.sup.PersonDTO;

public class ManagerDTO extends PersonDTO {
    
    private String dept ;

    public ManagerDTO() {
    }
    public ManagerDTO(String name, int age, String address, String dept) {
        super(name, age, address);
        this.dept = dept;
    }
    public String getDept() {
        return dept;
    }
    public void setDept(String dept) {
        this.dept = dept;
    }

    @Override
    public String personInfo() {
        return super.personInfo()+", dept=" + dept ;
    }
    public String managerInfo() {
        return super.personInfo()+", dept=" + dept ;
    }


}
