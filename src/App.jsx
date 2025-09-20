import { useState } from 'react'
import './App.css'
import SongList from './components/SongList/SongList'
import Hobbies from './components/Hobbies/Hobbies'

function App() {
  return (
    <main>
      <h1>Mi Aplicación</h1>

      {/* Lista de canciones */}
      <section>
        <SongList />
      </section>

      {/* Mis hobbies */}
      <section>
        <Hobbies />
      </section>
    </main>
  )
}

export default App

