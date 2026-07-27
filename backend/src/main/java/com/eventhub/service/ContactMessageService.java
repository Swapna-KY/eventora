package com.eventhub.service;

import com.eventhub.dto.ContactMessageRequest;
import com.eventhub.model.ContactMessage;
import com.eventhub.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage create(ContactMessageRequest req) {
        ContactMessage m = new ContactMessage();
        m.setName(req.getName());
        m.setEmail(req.getEmail());
        m.setSubject(req.getSubject());
        m.setMessage(req.getMessage());
        return contactMessageRepository.save(m);
    }

    public List<ContactMessage> getAll() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public void markRead(Long id) {
        contactMessageRepository.findById(id).ifPresent(m -> {
            m.setIsRead(true);
            contactMessageRepository.save(m);
        });
    }
}
