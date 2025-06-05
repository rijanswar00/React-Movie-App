import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api"

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                console.log(popularMovies)
            } catch(err){
                console.log(err);
                setError("Faild to load movies...")
            } finally{
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        alert(searchQuery);
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }} />
                <button type="submit" className="search-button" >Search</button>
            </form>
            <div className="movies-grid">
                {movies.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Home
