package com.BookshelfProject.Bookshelf.shelf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ShelfService {
    private final ShelfRepository shelfRepository;

    @Autowired
    public ShelfService(ShelfRepository shelfRepository) {
        this.shelfRepository = shelfRepository;
    }

    public List<Shelf> getAllShelves() {
        return shelfRepository.findAll();
    }

    public Shelf getById(Long id) {
        return shelfRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Shelf not found with id " + id));
    }

    public Shelf addShelf(Shelf shelf) {
        return shelfRepository.save(shelf);
    }

    public Shelf updateShelf(Long id, Shelf shelfDetails) {
        Shelf shelf = getById(id);
        shelf.setName(shelfDetails.getName());
        return shelfRepository.save(shelf);
    }

    public void delete(Long id) {
        shelfRepository.deleteById(id);
    }
}
