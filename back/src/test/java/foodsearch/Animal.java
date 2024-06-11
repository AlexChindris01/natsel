package foodsearch;

import java.util.Random;
import java.lang.Math.*;

import static java.lang.Math.PI;

public class Animal {
    Point location;
    double direction;
    double sight;
    double speed;
    double stepSize;
    public Animal(double x, double y) {
        location = new Point(x, y);
        direction = 0;
        sight = 5;
        speed = 8;
    }
    public Animal() {
        location = new Point(0, 0);
        direction = 0;
        sight = 5;
        speed = 8;
    }
    public void searchStep() {
        Random rand = new Random();
        direction += -PI / 2 + PI * rand.nextFloat();
        Point step = new Point(location.x + Math.cos(direction) * speed, location.y + Math.sin(direction) * speed);
        Point testFood = new Point(3, 3);
        Point foodDetectionPoint = CustomMath.line_circle_intersection(location, step, testFood, sight);
        if (foodDetectionPoint == null) {
            location = step;
        }
        else {
            double stepRemainder = CustomMath.dist(foodDetectionPoint, step);
            double ratio = stepRemainder / CustomMath.dist(foodDetectionPoint, testFood);
            if (ratio >= 1) {
                location = testFood;

                // to implement: update amount of food eaten, make the food item disappear etc

            }
            else {
                location = foodDetectionPoint;
                location.x += ratio * (testFood.x - foodDetectionPoint.x);
                location.y += ratio * (testFood.y - foodDetectionPoint.y);
                // to implement: head towards food immediately at the next step
            }
        }
    }
}
