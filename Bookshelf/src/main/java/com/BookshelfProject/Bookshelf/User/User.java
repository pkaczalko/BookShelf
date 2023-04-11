package com.BookshelfProject.Bookshelf.User;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class User {
    @Id

    private Long id;
    private String login;
    private String password;
    private String email;

    public User() {
    }

    public User(Long id, String username, String password, String email) {
        this.id = id;
        this.login = username;
        this.password = password;
        this.email = email;
    }

    public User(String username, String password, String email) {
        this.login = username;
        this.password = password;
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + login + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return login;
    }

    public void setUsername(String username) {
        this.login = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
