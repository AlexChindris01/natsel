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
//        Animal anAnimal = new Animal();
//        Animal.foodList = new ArrayList<Point>();
//        int i;
//        Random rand = new Random();
//        for (i = 0; i < 10; i++) {
//            Animal.foodList.add(new Point(Animal.MAX_COORD * rand.nextDouble(), Animal.MAX_COORD * rand.nextDouble()));
//        }
//        String foodListJson = new Gson().toJson(Animal.foodList);
//        System.out.println("Initial food list json: \n" + foodListJson);
//        anAnimal.search();
//        System.out.println(anAnimal.location.x + " " + anAnimal.location.y + " " + anAnimal.foodEaten);
//        String searchPathJson = new Gson().toJson(anAnimal.searchPath);
//        foodListJson = new Gson().toJson(Animal.foodList);
//        System.out.println("search path json: \n" + searchPathJson);
//        System.out.println("Final food list json: \n" + foodListJson);
        Animal[] animals = new Animal[10];
        Animal.foodList = new ArrayList<Point>();
        Random rand = new Random();
        int i, j, k, energy = 20, startingFoodQuantity = 20, currentWinner;
        double currentWinningTime;
        for (i = 0; i < animals.length; i++) {
            animals[i] = new Animal();
        }
        for (i = 0; i < startingFoodQuantity; i++) {
            Animal.foodList.add(new Point(Animal.MAX_COORD * rand.nextDouble(), Animal.MAX_COORD * rand.nextDouble()));
        }
        String foodListJson = new Gson().toJson(Animal.foodList);
        System.out.println("Initial food list json: \n" + foodListJson);
        for (i = 0; i < energy; i++) {
            for (j = 0; j < animals.length; j++) {
                animals[j].searchStep();
            }
            for (j = 0; j < Animal.foodList.size(); j++) {
                currentWinningTime = 2;
                currentWinner = -1;
                for (k = 0; k < animals.length; k++) {
                    if (animals[k].contestedFood != null) {
                        if (Animal.foodList.get(j).x == animals[k].contestedFood.x &&
                            Animal.foodList.get(j).y == animals[k].contestedFood.y &&
                            animals[k].timeReachedFoodLocation < currentWinningTime) {
                                currentWinner = k;
                                currentWinningTime = animals[k].timeReachedFoodLocation;
                        }
                    }
                }
                if (currentWinner != -1) {
                    animals[currentWinner].foodEaten++;
                    Animal.foodList.remove(j);
                    j--;
                }
            }
        }
        List<List<TimedLocation>> searchPaths;
        searchPaths = new ArrayList<>();
        for (i = 0; i < animals.length; i++) {
            // System.out.println("Search path " + i + ":\n" + new Gson().toJson(animals[i].searchPath));
            searchPaths.add(animals[i].searchPath);
        }
        String searchPathsJson = new Gson().toJson(searchPaths);
        System.out.println("Search paths json: \n" + searchPathsJson);
        for (i = 0; i < animals.length; i++) {
            System.out.println("food eaten by " + i + ": " + animals[i].foodEaten);
        }
    }
}