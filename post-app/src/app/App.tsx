import './App.css'
import ThemeProvider from '../shared/lib/theme/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux' // Импортируем Provider

import { router } from './providers/router/router'
import { store } from './providers/store'

function App() {


  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider >
    </Provider>
  )
}

export default App
