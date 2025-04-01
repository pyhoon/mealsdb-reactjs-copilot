import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Ingredient from './views/Ingredient'
import MealsByIngredient from './views/MealsByIngredient'
import MealDetails from './views/MealDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients" element={<Ingredient />} />
      <Route path="/ingredients/:ingredient" element={<MealsByIngredient />} />
      <Route path="/meal/:id" element={<MealDetails />} />
    </Routes>
  )
}

export default App
