package com.BookshelfProject.Bookshelf.genre;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/genres")
public class GenreController {
    private final GenreService genreService;

    @Autowired
    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }

    @GetMapping({"/{id}"})
    public Genre getGenre(@PathVariable Long id) {
        return genreService.getById(id);
    }

    @PostMapping
    public Genre addGenre(@RequestBody Genre genre) {
        return genreService.addGenre(genre);
    }

    @PutMapping({"/{id}"})
    public Genre updateGenre(@PathVariable Long id, @RequestBody Genre genreDetails) {
        return genreService.updateGenre(id, genreDetails);
    }

    @DeleteMapping({"/{id}"})
    public void deleteGenre(@PathVariable Long id) {
        genreService.delete(id);
    }
}
