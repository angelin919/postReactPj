import './App.css'
import ThemeProvider from '../shared/lib/theme/ThemeProvider'
import { RouterProvider } from 'react-router-dom'

import { router } from './providers/router/router'

function App() {


  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider >
  )
}

export default App
