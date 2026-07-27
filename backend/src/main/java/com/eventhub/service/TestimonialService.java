package com.eventhub.service;

import com.eventhub.dto.TestimonialRequest;
import com.eventhub.dto.TestimonialResponse;
import com.eventhub.model.Testimonial;
import com.eventhub.model.User;
import com.eventhub.repository.TestimonialRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestimonialService {

    private static final int MAX_RESULTS = 12;

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<TestimonialResponse> getLatest() {
        return testimonialRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .limit(MAX_RESULTS)
                .map(TestimonialResponse::from)
                .collect(Collectors.toList());
    }

    public TestimonialResponse create(User user, TestimonialRequest req) {
        Testimonial t = new Testimonial(user, req.getQuote(), req.getRating());
        return TestimonialResponse.from(testimonialRepository.save(t));
    }
}
