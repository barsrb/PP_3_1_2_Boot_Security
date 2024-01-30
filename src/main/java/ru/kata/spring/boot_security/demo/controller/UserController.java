package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user/")
public class UserController {

    @GetMapping(value = "/getDetails")
    public User userDetails(@AuthenticationPrincipal User authUser) {
        return authUser;
    }



    @GetMapping (value = "/")
    public ModelAndView userPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user");
        return modelAndView;
    }

    @GetMapping (value = "/getAllowedPages")
    public Map<String, String> getAllowedPages(@AuthenticationPrincipal User authUser) {
        Map<String, String> pages = new HashMap<>();
        authUser.getAuthorities().forEach(role -> {
            if (role.getAuthority().equals("ROLE_ADMIN")) {
                pages.put("/admin/", "Admin page");
            } else if (role.getAuthority().equals("ROLE_USER")) {
                pages.put("/user/", "User page");
            }
        });
        return pages;
    }
}
