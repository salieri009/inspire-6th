package backend.Java_practice;


public class Student {
    private String name;
    private int age;
    private String major;

    //private 으로 선언된 필드에 접근하기 위해 public getter와 setter 메서드를 제공합니다.
    //

    public Student(String name, int age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
    }
    // constructor 를 통해서 객체를 생성할 때 필드값을 초기화 할 수 있다.
    // 호출불가

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Major: " + major);
    } /// 이렇게 해도 되고, 혹은
    // getter setter 를 통해서 필드값을 가져오고, 수정할 수 있다.
    // return getAge() + " " + getName() + " " + getMajor(); 의 양식으로
}


