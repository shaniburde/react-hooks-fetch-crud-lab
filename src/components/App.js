import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((r) => r.json())
      .then(setQuestions)
  }, [])

  function handleAddQuestion(newQ){
    setQuestions([...questions, newQ])
  }

  function handleDeleteQuestion(questionToDelete){
    const updatedQuestions = questions.filter((question) => question.id !== questionToDelete.id)
    setQuestions(updatedQuestions)
  }

  function handleChangeAnswer(changedQuestion){
    const updatedQuestions = questions.map((question) => {
      if(question.id === changedQuestion.id) {
        return changedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} setQuestions={setQuestions} onQuestionDelete={handleDeleteQuestion} onChangeAnswer={handleChangeAnswer} />}
    </main>
  );
}

export default App;
