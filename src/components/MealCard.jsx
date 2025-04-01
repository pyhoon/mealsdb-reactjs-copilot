import React from 'react'

export default function MealCard({ meal, onClick }) {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 border border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded" />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{meal.strMeal}</h3>
        <p className="text-gray-400 text-base">
          {meal.strInstructions?.slice(0, 100)}...
        </p>
      </div>
    </div>
  )
}