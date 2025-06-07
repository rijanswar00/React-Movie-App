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
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                console.log(popularMovies)
            } catch (err) {
                console.log(err);
                setError("Faild to load movies...")
            } finally {
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true);

        try {
            const searchResult = await searchMovies(searchQuery);
            setMovies(searchResult);
            setError(null);
        } catch {
            setError("Failed to search movies...")
        } finally {
            setLoading(false);
        }

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

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie, index) => (
                        <MovieCard movie={movie} key={index} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
