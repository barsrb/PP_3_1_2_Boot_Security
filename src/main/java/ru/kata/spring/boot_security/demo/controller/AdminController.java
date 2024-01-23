package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/")
    public String usersList(@AuthenticationPrincipal User authUser, ModelMap model) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("user", new User());
        model.addAttribute("authUser", authUser);
        return "users_list";
    }

    @PostMapping(value = "/create")
    public String createUser(@ModelAttribute User user, ModelMap model) {
        user.setRoles(Set.of(roleService.getRoleByID(2L)));
        userService.createUser(user);
        return "redirect:/";
    }

    @GetMapping(value = "/delete")
    public String deleteUser(@RequestParam(value = "id") long id, ModelMap model) {
        userService.deleteUser(id);
        return "redirect:/";
    }

    @GetMapping(value = "/edit")
    public String editUserForm(@RequestParam(value = "id") long id,
                               @AuthenticationPrincipal User authUser,
                               ModelMap model) {
        model.addAttribute("user", userService.getUserByID(id));
        model.addAttribute("authUser", authUser);
        return "user_form";
    }

    @PostMapping(value = "/edit")
    public String editUser(@ModelAttribute User user, ModelMap model) {
        userService.editUser(user);
        return "redirect:/";
    }

}
