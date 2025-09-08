package kr.sparta.practical2_starter;

/*
 model
 */
public class Person {

    private String name;
    private int age;
    private String mbti;
    private String food;
    private String color;
    /*Person에 각 객체들을 바인딩*/
    public Person() {}
    public Person(String name, int age, String mbti, String food, String color) {
        this.name = name;
        this.age = age;
        this.mbti = mbti;
        this.food = food;
        this.color = color;
    }
    public String getName() { return name;}
    public int getAge() { return age; }
    public String getMbti() { return mbti; }
    public String getFood() { return food; }
    public String getColor() { return color; }

    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setMbti(String mbti) { this.mbti = mbti; }
    public void setFood(String food) { this.food = food; }
    public void setColor(String color) { this.color = color; }
}
