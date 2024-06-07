package genalg.back;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

	private static final String template = "Hello %s!";
	public static int sense = 1;
	Animal[] gen = new Animal[5];
	String stringGen;
	static boolean startedEvolution = false;
	private final AtomicLong counter = new AtomicLong();


	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/load")
	public String load () {
		System.out.println("==== loading population ====");
		int i;
		stringGen = "";
		for (i = 0; i < 5; i++) {
			gen[i] = new Animal();
			stringGen += gen[i].getSight() + " ";
			stringGen += gen[i].getSpeed() + " ";
			stringGen += gen[i].getSize() + " | ";
		}
		return "Current population:\n" + stringGen;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/start")
	public String start () {
		startedEvolution = true;
		System.out.println("==== starting evolution ====");
		int i;
		gen = new Animal[5];
		stringGen = "";
		for (i = 0; i < 5; i++) {
			gen[i] = new Animal(3, 2, 4);
			stringGen += gen[i].getSight() + " ";
			stringGen += gen[i].getSpeed() + " ";
			stringGen += gen[i].getSize() + " | ";
		}
		return "Current population:" + stringGen;
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/reducefood")
	public String reducefood () {
		if (startedEvolution) {
			System.out.println("==== reducing amount of available food ====");
			int i;
			gen = new Animal[5];
			stringGen = "";
			for (i = 0; i < 5; i++) {
				gen[i] = new Animal(8, 7, 2);
				stringGen += gen[i].getSight() + " ";
				stringGen += gen[i].getSpeed() + " ";
				stringGen += gen[i].getSize() + " | ";
			}
			return "Current population: " + stringGen;
		}
		else return "Current population: " + stringGen + " Start evolution first";
	}
}