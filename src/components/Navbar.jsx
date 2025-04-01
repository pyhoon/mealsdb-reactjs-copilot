import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      {/* <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Meal App</div>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">About</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div> */}
      <h1 className="text-white text-2xl">MealSearch</h1>
    </nav>
  )
}
