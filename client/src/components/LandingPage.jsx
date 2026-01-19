import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function LandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/main')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Counter App</h1>
          <p className="mt-2 text-gray-600">Login or register to track your count</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <LoginForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
