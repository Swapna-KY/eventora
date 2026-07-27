package com.eventhub.service;

import com.eventhub.dto.ProfileUpdateRequest;
import com.eventhub.model.User;
import com.eventhub.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User updateProfile(User user, ProfileUpdateRequest req) {
        if (req.getName() != null && !req.getName().isBlank()) user.setName(req.getName());
        if (req.getCity() != null) user.setCity(req.getCity());
        if (req.getPhotoUrl() != null) user.setPhotoUrl(req.getPhotoUrl());
        return userRepository.save(user);
    }
}
