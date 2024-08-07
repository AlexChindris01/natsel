package genalg.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackApplication {
    @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/evolve-javaconfig").allowedOrigins("http://localhost:5173");
				registry.addMapping("/reducefood-javaconfig").allowedOrigins("http://localhost:5173");
				registry.addMapping("/increasefood-javaconfig").allowedOrigins("http://localhost:5173");
				registry.addMapping("/load-javaconfig").allowedOrigins("http://localhost:5173");
				registry.addMapping("/getfoodandpaths-javaconfig").allowedOrigins("http://localhost:5173");
				registry.addMapping("/getfoodmap-javaconfig").allowedOrigins("http://localhost:5173");
			}
		};
	}
    public static void main(String[] args) {
	SpringApplication.run(BackApplication.class, args); }

}
