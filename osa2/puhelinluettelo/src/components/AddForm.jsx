import React from 'react';

export const AddForm = ({ inputHandler, numberHandler, submitHandler }) => {
  return (
    <form>
      <h2>Add a new contact</h2>
      <div>
        name: <input type="text" onChange={inputHandler} />
      </div>
      <div>
        number: <input type="text" onChange={numberHandler} />
      </div>
      <div>
        <button type="submit" onClick={submitHandler}>
          add
        </button>
      </div>
    </form>
  );
};
