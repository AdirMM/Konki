import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { CategoryProvider } from './context/CategoryContext.jsx'
import { UIProvider } from './context/UIContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>
      <TaskProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </TaskProvider>
    </CategoryProvider>
  </StrictMode>
)
