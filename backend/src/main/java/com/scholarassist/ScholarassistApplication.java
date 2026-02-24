package com.scholarassist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ScholarassistApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScholarassistApplication.class, args);
	}

}