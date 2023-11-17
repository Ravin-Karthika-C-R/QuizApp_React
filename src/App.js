import './App.css';
import { Route,Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import QuizApp from './Components/QuizApp';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<QuizApp></QuizApp>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
