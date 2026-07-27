package com.eventhub.repository;

import com.eventhub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByFeaturedTrue();

    List<Event> findByCategoryIgnoreCase(String category);

    List<Event> findByCityIgnoreCase(String city);

    @Query("SELECT e FROM Event e WHERE " +
           "(:keyword IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:city IS NULL OR LOWER(e.city) = LOWER(:city))")
    List<Event> search(@Param("keyword") String keyword, @Param("city") String city);
}
