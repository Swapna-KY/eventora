package com.eventhub.controller;

import com.eventhub.dto.ProfileUpdateRequest;
import com.eventhub.model.User;
import com.eventhub.security.CurrentUserService;
import com.eventhub.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final CurrentUserService currentUserService;

    public UserController(UserService userService, CurrentUserService currentUserService) {
        this.userService = userService;
        this.currentUserService = currentUserService;
    }

    @GetMapping("/me")
    public User getMe() {
        return currentUserService.getCurrentUser();
    }

    @PutMapping("/me")
    public User updateMe(@RequestBody ProfileUpdateRequest request) {
        User user = currentUserService.getCurrentUser();
        return userService.updateProfile(user, request);
    }
}
