package backend.Java_practice.oop;

public class Dog extends Animal {

    public Dog(String name) {
        super(name);
    }

    @Override
    public String makeSound() {
        return name + ": 멍멍!";
    }
}
