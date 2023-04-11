import React, { useState } from 'react'
import './App.css'
import { lorem } from './constants/text'

function App() {
  const [mode, setMode] = useState(0)

  return (
    <div className="flex flex-col">
      {/* <!--Tabs navigation--> */}
      <ul
        className="mb-5 flex justify-center list-none flex-row flex-wrap border-b-0 pl-0"
        role="tablist">
        <li role="presentation">
          <span
            className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 hover:text-violet-700 focus:isolate focus:border-transparent cursor-pointer ${mode === 0 ? 'bg-neutral-100' : ''}`}
            role="tab"
            onClick={() => setMode(0)}
          >
            Home
          </span>
        </li>
        <li role="presentation">
          <span
            className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 hover:text-violet-700 focus:isolate focus:border-transparent cursor-pointer ${mode === 1 ? 'bg-neutral-100' : ''}`}
            role="tab"
            onClick={() => setMode(1)}
          >
            Profile
          </span>
        </li>
        <li role="presentation">
          <span
            className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 hover:text-violet-700 focus:isolate focus:border-transparent cursor-pointer ${mode === 2 ? 'bg-neutral-100' : ''}`}
            role="tab"
            onClick={() => setMode(2)}
          >
            Messages
          </span>
        </li>
      </ul>

      {/* <!--Tabs content--> */}
      {mode === 0 && (<Content0 />)}
      {mode === 1 && (<Content1 />)}
      {mode === 2 && (<Content2 />)}
    </div>
  )
}

const Content0 = () => {
  return (
    <div id="content-0" className="mt-6 mb-6">
      {lorem.split("").map((char: string) => <span>{char}</span>)}
    </div>
  )
}

const Content1 = () => {
  return (
    <div id="content-1" className="mt-6 mb-6">
      {lorem.split("").map((char: string) => <>{char}</>)}
    </div>
  )
}

const Content2 = () => {
  return (
    <div id="content-2" className="mt-6 mb-6">
      {lorem}
    </div>
  )
}

export default App
