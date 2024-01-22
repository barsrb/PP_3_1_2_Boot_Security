package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.model.User;

@Controller
public class HomeController {

    @GetMapping(value = "/")
    public String homePage(@AuthenticationPrincipal User authUser) {
        if (authUser.getRoles().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            return "redirect:/admin/";
        }
        return "redirect:/user/";
    }
}
