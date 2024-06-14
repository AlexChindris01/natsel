package foodsearch;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.lang.Math.*;

import static java.lang.Math.PI;

class TimedLocation extends Point {
    double time; // time needed to reach this location from the previous one.
    // from 0 to 1? (1 would mean the time required for a full step). consider that different animals
    // may have different speeds
    public TimedLocation(double x, double y, double time) {
        super(x, y);
        this.time = time;
    }
}

class Animal {
    Point location;
    List<TimedLocation> searchPath;
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
        searchPath = new ArrayList<TimedLocation>();
    }
    public Animal() {
        location = new Point(0, 0);
        direction = 0;
        sight = 5;
        speed = 8;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
        searchPath = new ArrayList<TimedLocation>();
    }
    void searchStep() {
        double time = 0;
        if (chasedFood != null) {
            double ratio = speed / CustomMath.dist(location, chasedFood);
            if (ratio >= 1) {
                location = chasedFood;
                searchPath.add(new TimedLocation(location.x, location.y, 1)); // should be changed, maybe try
                // to change it so that animals don't slow down and don't take breaks
                foodEaten++;
                testFood.x += 10;
                testFood.y += 10;
                chasedFood = null;
                // to implement: make the food item disappear etc
            }
            else {
                location.x += ratio * (chasedFood.x - location.x);
                location.y += ratio * (chasedFood.y - location.y);
                searchPath.add(new TimedLocation(location.x, location.y, 1));
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
                searchPath.add(new TimedLocation(location.x, location.y, 1));
            }
            else {
                time = CustomMath.dist(location, foodDetectionPoint) / speed;
                location.copy(foodDetectionPoint);
                searchPath.add(new TimedLocation(location.x, location.y, time));
                time = 1 - time;
                double stepRemainder = CustomMath.dist(foodDetectionPoint, step);
                double ratio = stepRemainder / sight;
                if (ratio >= 1) {
                    location.copy(testFood);
                    searchPath.add(new TimedLocation(location.x, location.y, time)); // time should be adjusted
                    // here to make animals move without breaks or slowing down
                    foodEaten++;
                    testFood.x += 10;
                    testFood.y += 10;
                    // to implement: make the food item disappear etc
                }
                else {
                    chasedFood = new Point(testFood.x, testFood.y);
                    location.x += ratio * (testFood.x - location.x);
                    location.y += ratio * (testFood.y - location.y);
                    searchPath.add(new TimedLocation(location.x, location.y, time));
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
        System.out.println("Search path:");
        for (i = 0; i < searchPath.size(); i++) {
            System.out.println(searchPath.get(i).x + " " + searchPath.get(i).y + " " + searchPath.get(i).time);
        }
    }
}
