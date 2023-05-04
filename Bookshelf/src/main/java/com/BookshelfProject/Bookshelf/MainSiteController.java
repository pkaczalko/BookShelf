package com.BookshelfProject.Bookshelf;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class MainSiteController {
    @RequestMapping("/")
    public String hello(){
        return "<img src='https://kaczalko.pl/Bookshelf.webp' alt = 'Bookshelf lol' style='display: block; margin: 5vh auto;'>";
    }
}
