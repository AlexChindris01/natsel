package genalg.back;

import org.springframework.web.bind.annotation.*;
import com.google.gson.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class Chromosome {
	double sight;
	double speed;
	Chromosome(double sight, double speed) {
		this.sight = sight;
		this.speed = speed;
	}
}


@RestController
public class Controller {
	Animal[] nextGen = new Animal[10];
	Animal[] gen;
	String stringGen;
	String foodListJson = "";
	String searchPathsJson = "";
	String populationGenesJson = "";
	String generationDataJson = "";
	static boolean startedEvolution = false;
	String template = "Populația curentă (vedere, viteză): ";
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/load")
	public String load () {
		System.out.println("==== loading population ====");
		int i;
		stringGen = "";
		for (i = 0; i < nextGen.length; i++) {
			nextGen[i] = new Animal();
			stringGen += nextGen[i].sight + " ";
			stringGen += nextGen[i].speed + " | ";
			// stringGen += gen[i].size + " | ";
		}
		Animal.foodList = new ArrayList<Point>();
		return template + stringGen;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/getfoodandpaths")
	public String getfoodandpaths() {
		System.out.println("sent food and paths to front");
		return generationDataJson;
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
		List<Chromosome> populationGenes = new ArrayList<>();
		Random rand = new Random();
		int i, j, k, energy = 20, startingFoodQuantity = 50, currentWinner, foodListSize;
        double currentWinningTime;
		gen = nextGen;
		stringGen = "";
		for (i = 0; i < gen.length; i++) {
			// gen[i] = new Animal();
			populationGenes.add(new Chromosome(gen[i].sight, gen[i].speed));
			stringGen += String.format("%.2f", gen[i].sight) + ", ";
			stringGen += String.format("%.2f", gen[i].speed) + " | ";
			// stringGen += gen[i].size + " | ";
		}

		populationGenesJson = new Gson().toJson(populationGenes);
		foodListSize = Animal.foodList.size();
		for (i = foodListSize; i < startingFoodQuantity; i++) {
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
		generationDataJson = foodListJson + ";" + searchPathsJson + ";" + populationGenesJson;

		int nextGenSize = 0, count = 0;
		for (i = 0; i < gen.length; i++) {
			if (gen[i].foodEaten >=2) {
				nextGenSize += 2;
			}
			else {
				nextGenSize += gen[i].foodEaten;
			}

		}
		nextGen = new Animal[nextGenSize];
		for (i = 0; i < gen.length; i++) {
			if (gen[i].foodEaten == 1) {
				nextGen[count] = new Animal(gen[i].location.x, gen[i].location.y, gen[i].sight - 0.5 + rand.nextDouble()); // will edit here to create the new animal based on the parent
				count++;
			}
			else if (gen[i].foodEaten >= 2) {
				nextGen[count] = new Animal(gen[i].location.x, gen[i].location.y, gen[i].sight - 0.5 + rand.nextDouble());
				nextGen[count + 1] = new Animal(gen[i].location.x, gen[i].location.y, gen[i].sight - 0.5 + rand.nextDouble());
				count += 2;
			}
		}

		return template + stringGen + ";" + generationDataJson;
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