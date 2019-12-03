import React from 'react';
import List from './components/list'
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="section-wrapper">
        <h1>Things to do..</h1>
        <p>Let's create some tasks!</p>
        <List />
      </section>
    </div>
  );
}

export default App;
