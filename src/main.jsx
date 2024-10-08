import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './components/DarkModeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider className='h-full'>
      <main className="h-full"> {/*dark text-foreground bg-background*/}
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </main>
    </NextUIProvider>
  </StrictMode>
)
