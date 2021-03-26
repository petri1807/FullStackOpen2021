import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Feedback = ({ handlers }) => (
  <div>
    <h1>give feedback</h1>
    <span>
      <Button handleClick={handlers.handleGood} text="Good" />
      <Button handleClick={handlers.handleNeutral} text="Neutral" />
      <Button handleClick={handlers.handleBad} text="Bad" />
    </span>
  </div>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {text === 'positive' && '%'}
    </td>
  </tr>
);

const Statistics = ({ stats, showResults }) => {
  const { good, neutral, bad } = stats;
  const total = good + neutral + bad;
  const average = (good + (bad - bad * 2)) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <div>
      <h1>statistics</h1>
      {showResults ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const hasFeedback = !!good || !!neutral || !!bad; // if any of these returns true, show results

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Feedback handlers={{ handleGood, handleNeutral, handleBad }} />
      <Statistics stats={{ good, neutral, bad }} showResults={hasFeedback} />
    </div>
  );
};

export default App;
