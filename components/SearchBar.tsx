"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { Doctor } from "@/lib/types"

interface SearchBarProps {
  doctors: Doctor[]
  searchQuery: string
  onSearch: (query: string) => void
}

export default function SearchBar({ doctors, searchQuery, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const getSuggestions = () => {
    if (!inputValue.trim()) return []

    const suggestions = doctors
      .filter((doctor) => doctor.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map((doctor) => doctor.name)
      .slice(0, 3) 

    return [...new Set(suggestions)] 
  }

  const suggestions = getSuggestions()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(inputValue)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(inputValue)
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          data-testid="autocomplete-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search doctors by name..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-1 rounded-md"
        >
          Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
