package genalg.back;



import java.util.ArrayList;
import java.util.List;
import java.util.Random;


import static java.lang.Math.PI;

class TimedLocation extends Point {
    double moveTime; // time needed to reach this location from the previous one.
    // from 0 to 1. (1 would mean the time required for a "full" step, the imaginary time between
    // two consecutive searchStep() calls by the same Animal instance).
    public TimedLocation(double x, double y, double moveTime) {
        super(x, y);
        this.moveTime = moveTime;
    }
}

class Animal {
    Point location;
    List<TimedLocation> searchPath;
    double direction;
    double sight;
    double speed;
    int energy;
    int foodEaten;
    Point chasedFood;
    Point contestedFood;
    double timeReachedFoodLocation; // time between starting the latest searchStep and reaching the location of food
    static List<Point> foodList;
    public static final int MIN_COORD = 0;
    public static final int MAX_COORD = 500;
    public Animal(double x, double y, double sight) {
        location = new Point(x, y);
        direction = 0;
        this.sight = sight;
        speed = 39 - 0.5 * sight;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
        searchPath = new ArrayList<TimedLocation>();
        searchPath.add(new TimedLocation(location.x, location.y, 0));
    }
    public Animal() {
        location = new Point(0, 0);
        direction = 0;
        sight = 15;
        speed = 39 - 0.5 * sight;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
        searchPath = new ArrayList<TimedLocation>();
        searchPath.add(new TimedLocation(location.x, location.y, 0));
    }

    public Animal(double sight) {
        location = new Point(0, 0);
        direction = 0;
        this.sight = sight;
        speed = 39 - 0.5 * sight;
        chasedFood = null;
        foodEaten = 0;
        energy = 20;
        searchPath = new ArrayList<TimedLocation>();
        searchPath.add(new TimedLocation(location.x, location.y, 0));
    }

    void searchStep() {
        timeReachedFoodLocation = -1;
        contestedFood = null;
        double time = 0;
        if (chasedFood != null) {
           // System.out.println("in chasing food");
            double ratio = speed / CustomMath.dist(location, chasedFood);
            if (ratio >= 1) {
                location.copy(chasedFood);
                time = 1 / ratio;
                searchPath.add(new TimedLocation(location.x, location.y, time));
                // System.out.println("Added to search path: " + location.x + " " + location.y + " " + time);
                searchPath.add(new TimedLocation(location.x, location.y, 1 - time));
                timeReachedFoodLocation = time;
                contestedFood = new Point(location.x, location.y);
                // foodEaten++;
                // foodList.remove(chasedFood);
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
            Point spottedFood = null;
            Point spottedFoodCandidate;
            for (int i = 0; i < foodList.size(); i++) {
                if (CustomMath.dist(location, foodList.get(i)) < sight) {
                    spottedFoodCandidate = foodList.get(i);
                    if (spottedFood == null) {
                        spottedFood = spottedFoodCandidate;
                    }
                    else if (CustomMath.dist(location, spottedFoodCandidate) < CustomMath.dist(location, spottedFood)) {
                        spottedFood = spottedFoodCandidate;
                    }
                }

            }
            if (spottedFood != null) {
                Point oldLoc = new Point(location.x, location.y);
                chasedFood = new Point(spottedFood.x, spottedFood.y);
                double ratio = speed / CustomMath.dist(location, chasedFood);
                if (ratio >= 1) {
                    if (1 / ratio == 0) {
                        System.out.println("time 0; location before copy: " + location.x + " " + location.y
                        + "\nlocation before assignment: " + oldLoc.x + " " + oldLoc.y);
                    }
                    location.copy(chasedFood);
                    searchPath.add(new TimedLocation(location.x, location.y, 1 / ratio));
                    if (1 / ratio == 0) {
                        System.out.println("warning: time 0; ratio is " + ratio + "; location is " + location.x + " " + location.y);
                    }
                    searchPath.add(new TimedLocation(location.x, location.y, 1 - 1 / ratio));
                    timeReachedFoodLocation = 1 / ratio;
                    contestedFood = new Point(location.x, location.y);
                    chasedFood = null;
                }
                else {
                    location.x += ratio * (chasedFood.x - location.x);
                    location.y += ratio * (chasedFood.y - location.y);
                    searchPath.add(new TimedLocation(location.x, location.y, 1));
                }
            }
            else {
                //System.out.println("not chasing food");
                Random rand = new Random();
                Point step;
                double newDirection;
                int dircount = 0;
                do {
                    dircount++;

                    // System.out.println("huh" + dircount + " " + location.x + " " + location.y);
                    newDirection = direction;
                    if (dircount > 100) {
                        newDirection += PI;
                    }
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
                    location.copy(step);
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
                        timeReachedFoodLocation = time + sight / speed;
                        contestedFood = new Point(location.x, location.y);
                        // foodEaten++;
                        // foodList.remove(chasedFood);
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

