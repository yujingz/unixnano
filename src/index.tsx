import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.css';

const rootElement = document.getElementById('root') || document.createElement('div');
ReactDOM.createRoot(rootElement).render(<App />);
