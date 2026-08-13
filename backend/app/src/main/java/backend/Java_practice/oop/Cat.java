package backend.Java_practice.oop;

public class Cat extends Animal {

    public Cat(String name) {
        super(name);
    }

    @Override
    public String makeSound() {
        return name + ": 야옹!";
    }
}
