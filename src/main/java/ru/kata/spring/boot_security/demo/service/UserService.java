package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();

    void createUser(User user);

    void editUser(User user);

    void deleteUser(long id);

    User getUserByID(long id);
}
