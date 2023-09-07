import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath('https://unpkg.com/@esri/calcite-components/dist/calcite/assets');
import './main.css';

import App from './components/App';
import { store } from './store/storeConfiguration';
import { fetchQuestions } from './services/questions/questionsLoader';

store.dispatch(fetchQuestions());

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ReduxProvider store={store}>
    <App></App>
  </ReduxProvider>
);
