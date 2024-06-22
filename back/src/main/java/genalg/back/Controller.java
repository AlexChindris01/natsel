package genalg.back;

import org.springframework.web.bind.annotation.*;
import com.google.gson.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class Controller {
	Animal[] gen = new Animal[10];
	String stringGen;
	String foodListJson = "";
	String searchPathsJson = "";
	static boolean startedEvolution = false;
	String template = "Current population (sight, speed, size):";
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/load")
	public String load () {
		System.out.println("==== loading population ====");
		int i;
		stringGen = "";
		for (i = 0; i < gen.length; i++) {
			gen[i] = new Animal();
			stringGen += gen[i].sight + " ";
			stringGen += gen[i].speed + " | ";
			// stringGen += gen[i].size + " | ";
		}
		return template + stringGen;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/getpaths")
	public String getpaths() {
		System.out.println("sent paths to front");
		return searchPathsJson;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/getfoodmap")
	public String getfoodmap() {
		System.out.println("sent food map to front");
		return foodListJson;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/evolve")
	public String evolve () {
		startedEvolution = true;
		System.out.println("==== evolving ====");
		Animal.foodList = new ArrayList<Point>();
		Random rand = new Random();
		int i, j, k, energy = 20, startingFoodQuantity = 20, currentWinner;
        double currentWinningTime;
		gen = new Animal[10];
		stringGen = "";
		for (i = 0; i < gen.length; i++) {
			gen[i] = new Animal();
			stringGen += gen[i].sight + " ";
			stringGen += gen[i].speed + " | ";
			// stringGen += gen[i].size + " | ";
		}



		for (i = 0; i < startingFoodQuantity; i++) {
            Animal.foodList.add(new Point(Animal.MAX_COORD * rand.nextDouble(), Animal.MAX_COORD * rand.nextDouble()));
        }
        foodListJson = new Gson().toJson(Animal.foodList);
        System.out.println("Initial food list json: \n" + foodListJson);
        for (i = 0; i < energy; i++) {
            for (j = 0; j < gen.length; j++) {
                gen[j].searchStep();
            }
            for (j = 0; j < Animal.foodList.size(); j++) {
                currentWinningTime = 2;
                currentWinner = -1;
                for (k = 0; k < gen.length; k++) {
                    if (gen[k].contestedFood != null) {
                        if (Animal.foodList.get(j).x == gen[k].contestedFood.x &&
                            Animal.foodList.get(j).y == gen[k].contestedFood.y &&
                            gen[k].timeReachedFoodLocation < currentWinningTime) {
                                currentWinner = k;
                                currentWinningTime = gen[k].timeReachedFoodLocation;
                        }
                    }
                }
                if (currentWinner != -1) {
                    gen[currentWinner].foodEaten++;
                    Animal.foodList.remove(j);
                    j--;
                }
            }
        }
        List<List<TimedLocation>> searchPaths;
        searchPaths = new ArrayList<>();
        for (i = 0; i < gen.length; i++) {
            // System.out.println("Search path " + i + ":\n" + new Gson().toJson(animals[i].searchPath));
            searchPaths.add(gen[i].searchPath);
        }
        searchPathsJson = new Gson().toJson(searchPaths);
        System.out.println("Search paths json: \n" + searchPathsJson);
        for (i = 0; i < gen.length; i++) {
            System.out.println("food eaten by " + i + ": " + gen[i].foodEaten);
        }



		return template + stringGen;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/reducefood")
	public String reducefood () {
		if (startedEvolution) {
			System.out.println("==== reducing amount of available food ====");
			int i;
			gen = new Animal[10];
			stringGen = "";
			for (i = 0; i < gen.length; i++) {
				gen[i] = new Animal();
				stringGen += gen[i].sight + " ";
				stringGen += gen[i].speed + " | ";
				// stringGen += gen[i].size + " | ";
			}
			return template + stringGen;
		}
		else return "";
	}
}