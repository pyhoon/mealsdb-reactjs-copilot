import { useState, useEffect } from 'react'
import MealCard from '../components/MealCard'
import MainLayout from '../layouts/MainLayout'
import SearchForm from '../components/SearchForm'
import LoadingIndicator from '../components/LoadingIndicator'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const [search, setSearch] = useState('')
    const [meals, setMeals] = useState([])
    const [error, setError] = useState('')
    const [heading, setHeading] = useState('Random Meals')
    const [loading, setLoading] = useState(false) // New state for loading
    const navigate = useNavigate()

    const handleSearch = async (query) => {
        console.log('search query:', query)

        if (!query) {
            setHeading('Random Meals')
            fetchMeals()
            return
        }

        try {
            setError('')
            setMeals([])
            setHeading('') // Clear heading during search
            setLoading(true) // Start loading
            const url = `${apiBaseUrl}/search.php?s=${query}`
            const response = await fetch(url)
            const data = await response.json()
            setHeading(`Search Results for "${query}"`)
            setMeals(data.meals || [])
        } catch (error) {
            console.error('Error fetching data:', error)
            setError('Failed to fetch search results. Please try again.')
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const fetchMeals = async () => {
        try {
            setError('')
            setLoading(true) // Start loading
            const url = `${apiBaseUrl}/random.php`
            const promises = Array.from({ length: 6 }, () => fetch(url).then((response) => response.json()))
            const results = await Promise.all(promises)
            const fetchedMeals = results.map((result) => result.meals[0])
            setMeals(fetchedMeals)
        } catch (error) {
            console.error('Error fetching meals:', error)
            setError('Failed to fetch random meals. Please try again.')
        } finally {
            setLoading(false) // Stop loading
        }
    }

    useEffect(() => {
        fetchMeals()
    }, [])

    const handleMealClick = (mealId) => {
        navigate(`/meal/${mealId}`)
    }

    return (
        <MainLayout>
            <div className="p-4">
                {error && <p className="text-center py-2 text-red-500">{error}</p>}
                <div className="flex justify-center my-4">
                    <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
                </div>
                <h1 className="text-2xl font-bold mb-4">{heading}</h1>
                {loading && <LoadingIndicator />} {/* Show loading indicator */}
                {meals.length === 0 && !loading && !error && (
                    <p className="text-center py-8 text-gray-400">No meals found</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {meals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} onClick={() => handleMealClick(meal.idMeal)} />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
