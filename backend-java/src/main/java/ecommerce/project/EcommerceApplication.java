package ecommerce.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import java.util.Arrays;

@SpringBootApplication
@EnableWebSecurity
public class EcommerceApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(EcommerceApplication.class, args);
		Environment env = context.getEnvironment();
		System.out.println("Active profile: " + Arrays.toString(env.getActiveProfiles()));
	}

}
