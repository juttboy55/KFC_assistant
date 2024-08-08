import React, { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import './VoiceBot.css';

const VoiceBot = ({ publicKey, assistantId }) => {
  const [vapi, setVapi] = useState(null);
  const [isTalking, setIsTalking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(publicKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      console.log('Call has started');
      setIsConnected(true);
      setIsConnecting(false);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call has stopped');
      setIsTalking(false);
      setIsConnected(false);
    });

    vapiInstance.on('message', (message) => {
      console.log(message);
    });

    vapiInstance.on('error', (e) => {
      console.error(e);
      setIsConnecting(false);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant speech has started.');
      setIsTalking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant speech has ended.');
      setIsTalking(false);
    });

    return () => {
      vapiInstance.stop();
    };
  }, [publicKey]);

  const startCall = () => {
    setIsConnecting(true);
    vapi.start(assistantId);
  };

  const stopCall = () => {
    vapi.stop();
    setIsTalking(false);
    setIsConnected(false);
  };

  return (
    <div className="voice-bot">
      <div className="card">
        {!isConnected ? (
          <div>
            {isConnecting ? (
              <p>Connecting...</p>
            ) : (
              <button onClick={startCall}>Start Call</button>
            )}
          </div>
        ) : (
          <div>
            {isTalking ? (
              <video 
                src={'./avatar-speaking.mp4'}
                autoPlay 
                loop 
                muted 
                className="avatar"
              />
            ) : (
              <img 
                src={'./avatar-closed.png'}
                alt="Avatar" 
                className="avatar"
              />
            )}
          </div>
        )}
      </div>
      {isConnected && (
        <button onClick={stopCall} className="stop-button">Stop Call</button>
      )}
    </div>
  );
};

export default VoiceBot;

