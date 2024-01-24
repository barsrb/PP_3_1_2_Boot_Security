package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping (value = "/")
    public ModelAndView adminPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin");
        return modelAndView;
    }

    @GetMapping (value = "/getUsers")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping (value = "/getUserDetails")
    public User getUserDetails(@RequestParam(value = "id") long id) {
        return userService.getUserByID(id);
    }

    @PostMapping(value = "/create")
    public User createUser(@RequestBody User user) {
        user.setRoles(Set.of(roleService.getRoleByID(2L)));
        userService.createUser(user);
        return user;
    }

    @GetMapping(value = "/delete")
    public String deleteUser(@RequestParam(value = "id") long id) {
        userService.deleteUser(id);
        return "";
    }

    @PostMapping(value = "/edit")
    public User editUser(@RequestBody User user) {
        userService.editUser(user);
        return user;
    }

}
