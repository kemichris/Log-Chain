import './App.css';
import { Navbar } from './components/Navbar';
import { Main } from './components/Main';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Navbar/>
        <Main/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
