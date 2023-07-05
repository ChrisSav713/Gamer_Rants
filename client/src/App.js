import React, { useState, useMemo, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Connect from './components/Connect'
import Search from './components/Search'
import Detail from './components/Detail'
import { useSessionStorage } from './components/useStorage'

export const GameContext = createContext()

function App() {
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

  return (
    <GameContext.Provider value={providerValue}>
      <div className='App'>
        <Navbar />
        <BrowserRouter>
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
