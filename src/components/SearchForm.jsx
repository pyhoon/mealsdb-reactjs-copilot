import React, { useEffect, useRef } from 'react'

export default function SearchForm({search, setSearch, handleSearch}) {
    // const [search, setSearch] = useState('')
    const inputRef = useRef(null)
    const onSearch = (e) => {
        e.preventDefault()
        handleSearch(search)
      }
    // useEffect(() => {
    //     console.log('component mounted')
    //     if (inputRef.current) {
    //         inputRef.current.focus()
    //     }
    // }, [search])

    return (
        <form onSubmit={onSearch} className="flex items-center my-4">
            {/* {search} */}
            <input
                type="text"
                name="search"
                ref={inputRef}
                value={search}
                onInput={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded mr-2 flex-1"
            />
            <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Search
            </button>
        </form>
    )
}
