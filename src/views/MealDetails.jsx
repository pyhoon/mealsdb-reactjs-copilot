import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoadingIndicator from '../components/LoadingIndicator'

export default function MealDetails() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const { id } = useParams()
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                setError('')
                setLoading(true)
                const response = await fetch(`${apiBaseUrl}/lookup.php?i=${id}`)
                const data = await response.json()
                setMeal(data.meals ? data.meals[0] : null)
            } catch (error) {
                console.error('Error fetching meal details:', error)
                setError('Failed to fetch meal details. Please try again.')
            } finally {
                setLoading(false)
            }
        }
        fetchMealDetails()
    }, [id, apiBaseUrl])

    const extractIngredientsAndMeasures = (meal) => {
        const ingredients = []
        const measures = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            if (ingredient) {
                ingredients.push(ingredient)
                measures.push(measure)
            }
        }
        return { ingredients, measures }
    }

    const renderMealDetails = () => {
        if (!meal) return null
        const { ingredients, measures } = extractIngredientsAndMeasures(meal)

        return (
            <>
                <Link to={`/meal/${id}`}>
                    <img
                        src={meal.strMealThumb || ''}
                        alt={meal.strMeal || 'Meal'}
                        className="w-full max-w-lg mx-auto rounded mb-4"
                    />
                </Link>
                <div className="flex justify-between text-gray-400 mb-4">
                    <span>Category: {meal.strCategory || 'N/A'}</span>
                    <span>Area: {meal.strArea || 'N/A'}</span>
                    <span>Tags: {meal.strTags || 'N/A'}</span>
                </div>
                <p className="mb-4">{meal.strInstructions || 'No instructions available.'}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-bold mb-2">Ingredients</h2>
                        <ul className="list-disc list-inside">
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold mb-2">Measures</h2>
                        <ul className="list-disc list-inside">
                            {measures.map((measure, index) => (
                                <li key={index}>{measure}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 bg-indigo-600 text-white text-center py-2 rounded hover:bg-indigo-700"
                >
                    Watch on YouTube
                </a>
            </>
        )
    }

    return (
        <MainLayout>
            <div className="p-4">
                {error && <p className="text-center py-2 text-red-500">{error}</p>}
                {loading && <LoadingIndicator />}
                {!loading && !error && (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{meal?.strMeal || 'Meal Details'}</h1>
                        {!meal ? (
                            <p className="text-center py-8 text-gray-400">No meals found</p>
                        ) : (
                            renderMealDetails()
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    )
}
