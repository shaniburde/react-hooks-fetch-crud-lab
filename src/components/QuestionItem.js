import React from "react";

function QuestionItem({ question, onQuestionDelete, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => onQuestionDelete(question))
  }

  function handleChange(e){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ correctIndex: e.target.value}),
    })
      .then((r) => r.json())
      .then(onChangeAnswer)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
