import { useState } from "react"

type SearchBarProps = {
  placeholder?: string
//   onSearch: (value: string) => void
}

export default function SearchBar({
  placeholder = "Search...",
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            // onSearch(e.target.value)
          }}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm text-gray-700"
        />

        <button
          onClick={() => alert(query)}
          className="ml-2 text-indigo-600 text-sm font-medium"
        >
          Search
        </button>
      </div>
    </div>
  )
}
