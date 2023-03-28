import './App.css';
import { Route, Routes } from 'react-router-dom'; // in order to allow the use of routes
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/Home/Home';
import ErrorPage from './components/PageNotFound/PageNotFound';
import Detail from './components/Detail/Detail';
import FilterBar from './components/Sorting and Filtering/SortingandFiltering';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route exact path='/home' element={<>
          <NavBar />
          <FilterBar />
          <HomePage /></>}
        />
        <Route path='/videogames/:id' element={<Detail/>} />
        <Route path='/createGame' element={<>
          <NavBar />
          <Form /></>}
        />
        <Route path='/*' element={<ErrorPage/>} />
        
      </Routes>
    </div>
  );
}

export default App;
