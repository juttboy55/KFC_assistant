import React from 'react';
import './App.css';
import VoiceBot from './components/VoiceBot';

const App = () => {
  const publicKey = '';
  const assistantId = '';

  return (
    <div className="App">
      <h1>KFC Voice Assistant</h1>
      <VoiceBot publicKey={publicKey} assistantId={assistantId} />
    </div>
  );
};

export default App;
