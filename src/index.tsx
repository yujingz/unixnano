import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const rootElement = document.getElementById('root') || document.createElement('div');
ReactDOM.createRoot(rootElement).render(<App />);
