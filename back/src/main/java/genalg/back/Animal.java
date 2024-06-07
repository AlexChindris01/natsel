package genalg.back;

public class Animal {
    int sight;
    int speed;
    int size;
    public int getSight() {
        return sight;
    }
    public int getSpeed() {
        return speed;
    }
    public int getSize() {
        return size;
    }
    public void setSight(int sight) {
        this.sight = sight;
    }
    public void setSpeed(int speed) {
        this.speed = speed;
    }
    public void setSize(int size) {
        this.size = size;
    }
    public Animal() {
        this.sight = 1;
        this.speed = 1;
        this.size = 1;
    }
    public Animal(int sight, int speed, int size) {
        this.sight = sight;
        this.speed = speed;
        this.size = size;
    }
}
