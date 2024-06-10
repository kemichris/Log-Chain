import './App.css';
import { Navbar } from './components/Navbar';
import { Main } from './components/Main';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Navbar link= "Sign in as Admin"/>
        <Main/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
