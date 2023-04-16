import React, { useState } from "react"
import "./App.css"
import { Slowest } from "./components/Slowest"
import { InBetween } from "./components/InBetween"
import { Fastest } from "./components/Fastest"
import { Tab } from "./components/Tab"

const App = () => {
  const [mode, setMode] = useState(0)

  return (
    <div className="flex flex-col">
      <div className="mb-10">Comparison: Three components implementing a text character highlighting mechanism.</div>

      {/* Tabs navigation */}
      <ul
        className="mb-5 flex justify-center list-none flex-row flex-wrap border-b-0 pl-0"
        role="tablist">
        <Tab active={mode === 0} label={"Slowest"} onClick={() => setMode(0)} />
        <Tab active={mode === 1} label={"In-Between"} onClick={() => setMode(1)} />
        <Tab active={mode === 2} label={"Fastest"} onClick={() => setMode(2)} />
      </ul>

      {/* Tabs content */}
      {mode === 0 && (<Slowest />)}
      {mode === 1 && (<InBetween />)}
      {mode === 2 && (<Fastest />)}
    </div>
  )
}

export default App
