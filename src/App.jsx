import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import MoviePage from './pages/Movies/MoviePage'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import AppLayout from './layout/AppLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// 단계적으로 해결
// 홈페이지 /
// 영화를 전체 보여주는 페이지(서치) /movie
// 영화 디테일 페이지 /movie/:id
// 추천영화
// 리뷰 
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={<AppLayout/>}> 
          <Route index element ={<Homepage/>}/>
          <Route path="movies">
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element ={<MovieDetail/>}/>
          </Route>

          {/* <Route path="/movies" element ={<MoviePage/>}/>
          <Route path="/movies/:id" element ={<MovieDetail/>}/> */}
        </Route>


        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>


    </div>
  
      
  );
}

export default App;
