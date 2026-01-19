import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Counter() {
  const { count, updateCount } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleIncrement = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/user/count/increment', {
        method: 'POST',
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        updateCount(data.count)
      } else {
        setError(data.error || 'Failed to increment')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-center">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="text-8xl font-bold text-blue-600 mb-8">
        {count}
      </div>

      <button
        onClick={handleIncrement}
        disabled={loading}
        className="px-8 py-4 text-2xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Incrementing...' : 'Increment'}
      </button>
    </div>
  )
}
