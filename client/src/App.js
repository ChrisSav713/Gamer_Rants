import React, { useState, useMemo, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Connect from './components/Connect'
import Search from './components/Search'
import Detail from './components/Detail'
import { useTheme } from './hooks/useTheme'
import ThemeSelector from './components/ThemeSelector'
import { useSessionStorage } from './components/useStorage'
import './App.css'
export const GameContext = createContext()

function App({ Component, pageProps }) {
  const [proxyInfo, setProxyInfo, removeProxyInfo] = useSessionStorage(
    'proxy',
    {
      client_id: process.env.REACT_APP_CLIENT_ID, //'x4rniov57q0741nf6ptq41ohvlvrfs',
      client_secret: process.env.REACT_APP_CLIENT_SECRET, //'huuyqcxyj40thirl0z9f3iawyhj9yk',
      grant_type: 'client_credentials'
    }
  )

  const providerValue = useMemo(
    () => ({
      proxyInfo,
      setProxyInfo,
      removeProxyInfo
    }),
    [proxyInfo, setProxyInfo, removeProxyInfo]
  )

  const { color, mode } = useTheme()
  document.body.style.background = color

  return (
    <GameContext.Provider value={providerValue}>
      <div className={`App ${mode}`}>
        <Navbar />
        <BrowserRouter>
          <ThemeSelector />
          <Routes>
            <Route path='/connect' element={<Connect />} />
            <Route path='/search' element={<Search />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/' default element={<Connect />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GameContext.Provider>
  )
}

export default App
