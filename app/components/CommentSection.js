'use client';

import { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, inputValue]);
    setInputValue('');
  };

  return (
    <div>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <label>
          Add Comment:
          <input value={inputValue} onChange={handleInputChange} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;
