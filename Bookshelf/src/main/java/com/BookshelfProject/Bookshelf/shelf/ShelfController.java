package com.BookshelfProject.Bookshelf.shelf;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/shelves"})
public class ShelfController {
    private final ShelfService shelfService;

    @Autowired
    public ShelfController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }

    @GetMapping
    public List<Shelf> getAllShelves() {
        return shelfService.getAllShelves();
    }

    @GetMapping({"/{id}"})
    public Shelf getShelf(@PathVariable Long id) {
        return shelfService.getById(id);
    }

    @PostMapping
    public Shelf addShelf(@RequestBody Shelf shelf) {
        return shelfService.addShelf(shelf);
    }

    @PutMapping({"/{id}"})
    public Shelf updateShelf(@PathVariable Long id, @RequestBody Shelf shelfDetails) {
        return shelfService.updateShelf(id, shelfDetails);
    }

    @DeleteMapping({"/{id}"})
    public void deleteShelf(@PathVariable Long id) {
        shelfService.delete(id);
    }
}
