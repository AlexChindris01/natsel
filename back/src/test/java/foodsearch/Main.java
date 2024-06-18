package foodsearch;
import com.google.gson.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class Sim {
    void world(int maxGen, int maxSteps) {
        Animal[] gen = new Animal[10];
        int i, j, k;
        for (i = 0; i < maxGen; i++) {

            // replace old gen with new gen here

            for (j = 0; j < maxSteps; j++) {
                for (k = 0; k < 10; k++) {
                    gen[k].searchStep();
                }
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Animal anAnimal = new Animal();
        Animal.foodList = new ArrayList<Point>();
        int i;
        Random rand = new Random();
        for (i = 0; i < 10; i++) {
            Animal.foodList.add(new Point(Animal.MAX_COORD * rand.nextDouble(), Animal.MAX_COORD * rand.nextDouble()));
        }
        String foodListJson = new Gson().toJson(Animal.foodList);
        System.out.println("Initial food list json: \n" + foodListJson);
        anAnimal.search();
        System.out.println(anAnimal.location.x + " " + anAnimal.location.y + " " + anAnimal.foodEaten);
        String searchPathJson = new Gson().toJson(anAnimal.searchPath);
        foodListJson = new Gson().toJson(Animal.foodList);
        System.out.println("search path json: \n" + searchPathJson);
        System.out.println("Final food list json: \n" + foodListJson);
    }
}