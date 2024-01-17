package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/")
    public String usersList(ModelMap model) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("user", new User());
        return "users_list";
    }

    @PostMapping(value = "/create")
    public String createUser(@ModelAttribute User user, ModelMap model) {
        userService.createUser(user);
        return "redirect:/";
    }

    @GetMapping(value = "/delete")
    public String deleteUser(@RequestParam(value = "id") long id, ModelMap model) {
        userService.deleteUser(id);
        return "redirect:/";
    }

    @GetMapping(value = "/edit")
    public String editUserForm(@RequestParam(value = "id", required=false, defaultValue = "0") long id, ModelMap model) {
        model.addAttribute("user", userService.getUserByID(id));
        return "user_form";
    }

    @PostMapping(value = "/edit")
    public String editUser(@ModelAttribute User user, ModelMap model) {
        userService.editUser(user);
        return "redirect:/";
    }

}
