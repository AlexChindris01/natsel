package foodsearch;


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
        anAnimal.search();
        System.out.println(anAnimal.location.x + " " + anAnimal.location.y + " " + anAnimal.foodEaten);
    }
}