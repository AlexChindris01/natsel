package foodsearch;

import java.util.Random;
import java.lang.Math.*;

import static java.lang.Math.PI;

class Animal {
    Point location;
    static Point testFood = new Point(3, 3);
    double direction;
    double sight;
    double speed;
    int energy;
    int foodEaten;
    Point chasedFood;
    public static final int MIN_COORD = 0;
    public static final int MAX_COORD = 500;
    public Animal(double x, double y) {
        location = new Point(x, y);
        direction = 0;
        sight = 5;
        speed = 8;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
    }
    public Animal() {
        location = new Point(0, 0);
        direction = 0;
        sight = 5;
        speed = 8;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
    }
    void searchStep() {
        if (chasedFood != null) {
            double ratio = speed / CustomMath.dist(location, chasedFood);
            if (ratio >= 1) {
                location = chasedFood;
                foodEaten++;
                testFood.x += 10;
                testFood.y += 10;
                chasedFood = null;
                // to implement: make the food item disappear etc
            }
            else {
                location.x += ratio * (chasedFood.x - location.x);
                location.y += ratio * (chasedFood.y - location.y);
            }
        }
        else {
            Random rand = new Random();
            Point step;
            double newDirection;
            do {
                // System.out.println("huh");
                newDirection = direction;
                newDirection += -PI / 2 + PI * rand.nextFloat();
                step = new Point(location.x + Math.cos(newDirection) * speed, location.y + Math.sin(newDirection) * speed);
            } while (step.x < MIN_COORD || step.x > MAX_COORD || step.y < MIN_COORD || step.y > MAX_COORD);
            direction = newDirection;
            Point foodDetectionPoint = CustomMath.segment_circle_intersection(location, step, testFood, sight);
            if (foodDetectionPoint == null) {
                location = step;
            }
            else {
                double stepRemainder = CustomMath.dist(foodDetectionPoint, step);
                double ratio = stepRemainder / sight;
                if (ratio >= 1) {
                    location.copy(testFood);
                    foodEaten++;
                    testFood.x += 10;
                    testFood.y += 10;
                    // to implement: make the food item disappear etc
                }
                else {
                    chasedFood = new Point(testFood.x, testFood.y);
                    location.copy(foodDetectionPoint);
                    location.x += ratio * (testFood.x - location.x);
                    location.y += ratio * (testFood.y - location.y);
                }
            }
        }
    }
    void search() {
        int i;
        for (i = 0; i < energy; i++) {
            System.out.println(i + " " + foodEaten + " " + location.x + " " + location.y);
            searchStep();
        }
    }
}
