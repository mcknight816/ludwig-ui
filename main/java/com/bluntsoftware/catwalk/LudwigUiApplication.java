package com.bluntsoftware.catwalk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class LudwigUiApplication {
	public static void main(String[] args) {
		SpringApplication.run(LudwigUiApplication.class, args);
	}
}
