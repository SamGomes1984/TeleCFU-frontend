import React, { useState, useEffect } from 'react';
import { authenticate, fetchFiles } from './services/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (window.TelegramLoginWidget) {
      window.TelegramLoginWidget.callback = async (response) => {
        const res = await authenticate(response);
        if (res.data.success) setUser(response);
      };
    }
  }, []);

  const loadFiles = async () => {
    const data = await fetchFiles(user.id);
    setFiles(data);
  };

  useEffect(() => {
    if (user) loadFiles();
  }, [user]);

  return (
    <div>
      {!user ? (
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?11"
          data-telegram-login="your_bot_username"
          data-size="large"
          data-auth-url="http://localhost:3001/api/auth"
          data-request-access="write"
        ></script>
      ) : (
        <div>
          <h1>Welcome, {user.first_name}!</h1>
          <button onClick={loadFiles}>Refresh Files</button>
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>
                <a href={`https://t.me/your_bot_username?start=${file.fileId}`} target="_blank" rel="noopener noreferrer">
                  {file.fileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
