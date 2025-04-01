import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import MealCard from '../components/MealCard'
import LoadingIndicator from '../components/LoadingIndicator'

export default function MealsByIngredient() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const { ingredient } = useParams()
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMealsByIngredient = async () => {
    try {
      setError('')
      setLoading(true)
      const url = `${apiBaseUrl}/filter.php?i=${ingredient}`
      const response = await fetch(url)
      const data = await response.json()
      setMeals(data.meals || [])
    } catch (error) {
      console.error('Error fetching meals:', error)
      setError('Failed to fetch meals. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMealsByIngredient()
  }, [ingredient])

  const handleMealClick = (mealId) => {
    navigate(`/meal/${mealId}`)
  }

  return (
    <MainLayout>
      <div className="p-4">
        {error && <p className="text-center py-2 text-red-500">{error}</p>}
        <h1 className="text-2xl font-bold mb-4">Meals with "{ingredient}"</h1>
        {loading && <LoadingIndicator />}
        {!loading && meals.length === 0 && !error && (
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
