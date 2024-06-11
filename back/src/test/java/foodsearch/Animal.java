package foodsearch;

import java.util.Random;
import java.lang.Math.*;

import static java.lang.Math.PI;

public class Animal {
    double x, y;
    double direction;
    double stepSize;
    public Animal(double x, double y) {
        this.x = x;
        this.y = y;
        direction = 0;
    }
    public Animal() {
        x = 0;
        y = 0;
        direction = 0;
    }
    public void searchStep() {
        Random rand = new Random();
        direction += -PI / 2 + PI * rand.nextFloat();
        x += Math.cos(direction);
        y += Math.sin(direction);
    }
}
