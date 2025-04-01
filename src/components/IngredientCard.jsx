export default function IngredientCard({children}) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-gray-800 border border-gray-700">
            {children}
        </div>
    )
}