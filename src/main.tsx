import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css' // Add this line if missing
import App from './App'
import './index.css';

const theme = createTheme({
  fontFamily: 'Inter, "Segoe UI", Roboto, sans-serif',
  colors: {
    // Custom palette
    brand: [
      "#F5EAFE", // lightest shade
      "#E9D1FA",
      "#DDB9F5",
      "#D2A1F0",
      "#C789EB",
      "#BD87D6", // main accent
      "#A16FB8",
      "#85589A",
      "#69417C",
      "#4D2A5E"
    ],
  },
  primaryColor: "brand",
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="light">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>
)