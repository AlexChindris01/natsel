package foodsearch;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.lang.Math.*;

import static java.lang.Math.PI;

class TimedLocation extends Point {
    double moveTime; // time needed to reach this location from the previous one.
    // from 0 to 1? (1 would mean the time required for a full step). consider that different animals
    // may have different speeds
    public TimedLocation(double x, double y, double moveTime) {
        super(x, y);
        this.moveTime = moveTime;
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
    static List<Point> foodList;
    public static final int MIN_COORD = 0;
    public static final int MAX_COORD = 500;
    public Animal(double x, double y) {
        location = new Point(x, y);
        direction = 0;
        sight = 15;
        speed = 24;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
        searchPath = new ArrayList<TimedLocation>();
    }
    public Animal() {
        location = new Point(0, 0);
        direction = 0;
        sight = 15;
        speed = 24;
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
                time = 1 / ratio;
                searchPath.add(new TimedLocation(location.x, location.y, time));
                System.out.println("Added to search path: " + location.x + " " + location.y + " " + time);
                searchPath.add(new TimedLocation(location.x, location.y, 1 - time));
                foodEaten++;
                foodList.remove(chasedFood);
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
                newDirection += -PI / 2 + PI * rand.nextDouble();
                step = new Point(location.x + Math.cos(newDirection) * speed, location.y + Math.sin(newDirection) * speed);
            } while (step.x < MIN_COORD || step.x > MAX_COORD || step.y < MIN_COORD || step.y > MAX_COORD);
            direction = newDirection;
            Point foodDetectionPoint = null;
            Point fdpCandidate;
            for (int i = 0; i < foodList.size(); i++) {
                fdpCandidate = CustomMath.segment_circle_intersection(location, step, foodList.get(i), sight);
                if (fdpCandidate != null) {
                    if (foodDetectionPoint == null) {
                        foodDetectionPoint = fdpCandidate;
                        chasedFood = foodList.get(i);
                    }
                    else if (CustomMath.dist(location, fdpCandidate) < CustomMath.dist(location, foodDetectionPoint)) {
                        foodDetectionPoint = fdpCandidate;
                        chasedFood = foodList.get(i);
                    }
                }
            }
            if (foodDetectionPoint == null) {
                location = step;
                searchPath.add(new TimedLocation(location.x, location.y, 1));
            }
            else {
                time = CustomMath.dist(location, foodDetectionPoint) / speed;
                location.copy(foodDetectionPoint);
                searchPath.add(new TimedLocation(location.x, location.y, time));
                double stepRemainder = CustomMath.dist(foodDetectionPoint, step);
                double ratio = stepRemainder / sight;
                if (ratio >= 1) {
                    location.copy(chasedFood);
                    searchPath.add(new TimedLocation(location.x, location.y, sight / speed));
                    searchPath.add(new TimedLocation(location.x, location.y, 1 - time - sight / speed));
                    foodEaten++;
                    foodList.remove(chasedFood);
                    chasedFood = null; // to replace with awarding the food to the first animal that gets to it

                    // to implement: make the food item disappear etc
                }
                else {
                    location.x += ratio * (chasedFood.x - location.x);
                    location.y += ratio * (chasedFood.y - location.y);
                    searchPath.add(new TimedLocation(location.x, location.y, 1 - time));
                    // System.out.println("added to search path: " + location.x + " " + location.y + " " + time);
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
            System.out.println(searchPath.get(i).x + " " + searchPath.get(i).y + " " + searchPath.get(i).moveTime);
        }
    }
}
