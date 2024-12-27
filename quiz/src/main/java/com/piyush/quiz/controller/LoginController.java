package com.piyush.quiz.controller;

import com.piyush.quiz.dto.LoginRequest;
import com.piyush.quiz.dto.UserAnswer;
import com.piyush.quiz.entity.QuizQuestion;
import com.piyush.quiz.repo.QuestionRepo;
import com.piyush.quiz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private QuestionService questionService;

    private final String USERNAME = "root";
    private final String PASSWORD = "12345";

//    @GetMapping("/questions")
//    public List<QuizQuestion> getQuestions() {
//        return questionService.getAllQuestions();
//    }
    @GetMapping("/questions/{category}")
    public List<QuizQuestion> getQuestionsByCategory(@PathVariable String category) {
        return questionService.getQuestionsByCategory(category);
    }

    @PostMapping("/save")
    public QuizQuestion saveQuestion(@RequestBody QuizQuestion question) {
        return questionService.saveQuestion(question);
    }
}
