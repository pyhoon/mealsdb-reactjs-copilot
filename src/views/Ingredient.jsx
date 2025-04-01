import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import IngredientCard from '../components/IngredientCard'
import LoadingIndicator from '../components/LoadingIndicator'

export default function Ingredient() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchIngredients = async () => {
    try {
      setError('')
      setLoading(true)
      const url = `${apiBaseUrl}/list.php?i=list`
      const response = await fetch(url)
      const data = await response.json()
      setIngredients(data.meals || [])
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      setError('Failed to fetch ingredients. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIngredients()
  }, [])

  return (
    <MainLayout>
      <div className="p-4">
        {error && <p className="text-center py-2 text-red-500">{error}</p>}
        <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
        {loading && <LoadingIndicator />}
        {!loading && ingredients.length === 0 && !error && (
          <p className="text-center py-8 text-gray-400">No ingredients found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.idIngredient}
              onClick={() => navigate(`/ingredients/${ingredient.strIngredient}`)}
              className="cursor-pointer"
            >
              <IngredientCard>
                <h2>{ingredient.strIngredient}</h2>
              </IngredientCard>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
