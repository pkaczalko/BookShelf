package com.BookshelfProject.Bookshelf.User;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
            User user3 = new User(1L, "user3","password3","user3@example.com");
            repository.save(user3);
        };
    }
}