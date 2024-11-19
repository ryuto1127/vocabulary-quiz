"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Label from '../../components/ui/Label';
import Button from '../../components/ui/Button';


export default function VocabularyQuiz() {
  const [level, setLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false); // Initialize the isQuizComplete state
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestions = async (selectedLevel) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/generateQuestions', {
        params: { level: selectedLevel },
      });
      setQuestions(response.data.questions);
      resetQuiz();
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLevelChange = (newLevel) => {
    console.log("Selected Level:", newLevel);  // Log the selected level
    setLevel(newLevel);
    fetchQuestions(newLevel);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setIncorrectAnswers([]);
    setIsQuizComplete(false); // Reset the quiz complete state
  };

  const handleAnswerSubmit = () => {
    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestionIndex].correct) {
      // Handle correct answer
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestionIndex]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      setIsQuizComplete(true); // Mark the quiz as complete when all questions are answered
    }
  };
  
    return (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Vocabulary Quiz for English Learners</CardTitle>
            <CardDescription>Test and improve your English vocabulary</CardDescription>
          </CardHeader>
          <CardContent className={!level || isLoading ? "py-6" : "min-h-[300px]"}>
            {!level ? (
              <div className="space-y-4 max-w-sm mx-auto">
                <Label htmlFor="level" className="text-lg font-medium">Select your English proficiency level:</Label>
                <Select onValueChange={handleLevelChange}>
                  <SelectTrigger id="level" className="p-2 border rounded bg-white">
                    <SelectValue placeholder="Choose a level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border rounded shadow-md">
                    <SelectItem value="beginner" className="p-2 cursor-pointer hover:bg-gray-200">Beginner</SelectItem>
                    <SelectItem value="intermediate" className="p-2 cursor-pointer hover:bg-gray-200">Intermediate</SelectItem>
                    <SelectItem value="advanced" className="p-2 cursor-pointer hover:bg-gray-200">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : isLoading ? (
              <p className="text-center text-lg">Loading questions...</p>
            ) : questions.length === 0 ? (
              <p className="text-center text-lg">No questions available.</p>
            ) : isQuizComplete && !isReviewMode ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Quiz Completed!</h2>
                <p className="text-lg">Your final score: {score}/{questions.length}</p>
                {incorrectAnswers.length > 0 ? (
                  <p className="text-lg">You got {incorrectAnswers.length} questions wrong.</p>
                ) : (
                  <p className="text-lg">Great job! You got all questions correct.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                  <p className="text-lg font-medium">Score: {score}/{questions.length}</p>
                </div>
                <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full" />
                <p className="text-lg">What does "{currentQuestion.word}" mean?</p>
                {!showFeedback ? (
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="I don't know" id="option-dont-know" />
                      <Label htmlFor="option-dont-know">I don't know</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    <p className="font-semibold">
                      {selectedAnswer === currentQuestion.correct ? "Correct!" : "Incorrect."}
                    </p>
                    <p>The correct answer is: {currentQuestion.correct}</p>
                    <p>Definition: {currentQuestion.definition}</p>
                    <p>Example: {currentQuestion.example}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          {level && !isQuizComplete && !isLoading && (
            <CardFooter className="flex justify-center">
              <Button
                onClick={showFeedback ? handleNextQuestion : handleAnswerSubmit}
                disabled={!selectedAnswer && !showFeedback}
              >
                {showFeedback ? "Next Question" : "Submit Answer"}
              </Button>
            </CardFooter>
          )}
          {isQuizComplete && (
            <CardFooter className="flex justify-center">
              <div className="space-x-4">
                <Button onClick={resetQuiz}>Start New Quiz</Button>
                {incorrectAnswers.length > 0 && !isReviewMode && (
                  <Button onClick={handleReviewIncorrectAnswers}>Review Incorrect Answers</Button>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      );      
  }