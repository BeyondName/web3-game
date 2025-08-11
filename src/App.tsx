import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setDark(!dark)}
        className="rounded bg-gray-200 p-2 dark:bg-gray-800"
      >
        {dark ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6" />}
      </motion.button>
    </div>
  )
}

export default App
