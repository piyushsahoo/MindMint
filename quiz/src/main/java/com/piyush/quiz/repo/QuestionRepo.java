package com.piyush.quiz.repo;

import com.piyush.quiz.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<QuizQuestion,Long> {
    List<QuizQuestion> findByCategory(String category);
}
