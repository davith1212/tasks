import React from 'react';
import List from './components/list'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Task Master</h1>
      <p>Create some tasks!</p>
      <List />
      <button>Add Task</button>
    </div>
  );
}

export default App;
