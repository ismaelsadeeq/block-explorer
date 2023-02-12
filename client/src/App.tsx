import { ThemeProvider } from '@emotion/react';
import Router from './routes';
import { myTheme } from './styles/Theme';

function App() {
  return (
    <ThemeProvider theme={myTheme}>
       <Router />
    </ThemeProvider>
  );
}

export default App;
