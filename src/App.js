import React ,{useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
const[movies, setMovies] = useState([]);
const[loading, setLoading] = useState(false)

  
  async function fetchMoviesHandler(){
    setLoading(true)
    const response = await fetch('https://react-http-practice-42803-default-rtdb.firebaseio.com/movies.json');
    
    const jsonData = await response.json();

     const transformedData =  jsonData?.results?.map((movieData)=>{
      return{
        id:movieData?.episode_id,
        title: movieData?.title,
        releaseDate:movieData?.release_date,
        openingText:movieData?.opening_crawl
      }


   })
    setMovies (transformedData);
    setLoading(false)
  } 

  useEffect(()=>{
    fetchMoviesHandler();
  }, []);

  async function addMovieHandler(movie){
    const response = await fetch('https://react-http-practice-42803-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json();
    console.log(jsonData);
   

  }

  

  return (
    <React.Fragment>
      <section>
      <AddMovie onAddMovie ={addMovieHandler}/>
      </section>
      <section>
        <button onClick ={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movies} />}
        {!loading && movies.length ===0 && <p> No Movies Found</p>}
        {loading && <p> loading.....</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;
