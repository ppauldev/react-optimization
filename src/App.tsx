import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import { lorem } from "./constants/text"

const loremWithLinebreaks = [...lorem].map((char: string, i: number) => i % 72 === 0 ? `${char}\n` : char).join("")

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

const Tab = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => {
  return (
    <li role="presentation">
      <span
        className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 hover:text-violet-700 focus:isolate focus:border-transparent cursor-pointer ${active ? "bg-neutral-100" : ""}`}
        role="tab"
        onClick={onClick}
      >
        {label}
      </span>
    </li>
  )
}

const Info = ({ count, mountTime }: { count: number, mountTime: number }) => {
  return (
    <div className="mb-5 flex flex-row justify-evenly">
      <div>
        {/* Number of total DOM nodes to render the "lorem" text section */}
        DOM Nodes: <b>{count}</b>
      </div>
      <div>
        {/* Time in milliseconds to mount the component */}
        Mount Time: <b>{mountTime}</b> ms
      </div>
    </div>
  )
}

const Slowest = () => {
  const [active, setActive] = useState<number | null>(null)
  const [info, setInfo] = useState({ count: 0, mountTime: Date.now() })

  useEffect(() => {
    setInfo({
      count: document.getElementById("content-0")?.childElementCount ?? 0,
      mountTime: Date.now() - info.mountTime,
    })
  }, [])

  return (
    <>
      <Info count={info.count} mountTime={info.mountTime} />
      <div id="content-0" className="mt-6 mb-6">
        {lorem.split("").map((char: string, i: number) => {
          return (
            <span
              key={`content-0_${i}`}
              onClick={() => active === i ? setActive(null) : setActive(i)}
              style={{ backgroundColor: active === i ? "lightblue" : "transparent" }}
            >
              {char}
            </span>
          )
        })}
      </div>
    </>
  )
}

const InBetween = () => {
  const [info, setInfo] = useState({ count: 0, mountTime: Date.now() })

  const activeRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    setInfo({
      count: document.getElementById("content-1")?.childElementCount ?? 0,
      mountTime: Date.now() - info.mountTime,
    })
  }, [])

  // Note: Processing the click and applying the styling takes between 50-70 ms according to "Performance Insights" in Dev Tools
  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (activeRef.current) {
      (activeRef.current as HTMLSpanElement).style.backgroundColor = "transparent"
    }

    if (activeRef.current !== event.target) {
      (event.target as HTMLSpanElement).style.backgroundColor = "lightblue"
    } else {
      (event.target as HTMLSpanElement).style.backgroundColor = "transparent"
    }

    activeRef.current = event.target as HTMLSpanElement
  }

  return (
    <>
      <Info count={info.count} mountTime={info.mountTime} />
      <div id="content-1" className="mt-6 mb-6">
        {lorem.split("").map((char: string, i: number) => (
          <span
            key={`content-1_${i}`}
            onClick={handleClick}
          >
            {char}
          </span>)
        )}
      </div>
    </>
  )
}

const Fastest = () => {
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [info, setInfo] = useState({ count: 0, mountTime: Date.now() })

  const activeRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    setInfo({
      count: document.getElementById("content-2")?.childElementCount ?? 0,
      mountTime: Date.now() - info.mountTime,
    })
  }, [])

  // Note: Processing the click and applying the styling takes between 50-70 ms according to "Performance Insights" in Dev Tools
  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (activeRef.current) {
      (activeRef.current as HTMLSpanElement).style.backgroundColor = "transparent"
    }

    if (activeRef.current !== event.target) {
      (event.target as HTMLSpanElement).style.backgroundColor = "lightblue"
    } else {
      (event.target as HTMLSpanElement).style.backgroundColor = "transparent"
    }

    activeRef.current = event.target as HTMLSpanElement
  }

  return (
    <>
      <Info count={info.count} mountTime={info.mountTime} />
      <div id="content-2" className="mt-6 mb-6">
        {/* Note: Lines are delimited by newline character in parsed "lorem" data (see top) */}
        {loremWithLinebreaks.split("\n").map((line: string, lineIndex: number) => {
          const lineElement = document.getElementById(`content-2_line${lineIndex}_active`)

          return (
            <>
              {/* Note: Toggle render complexity if user hovers over line OR if a line contains a highlighted character */}
              {activeLine === lineIndex || lineElement?.contains(activeRef.current) ? (
                <span
                  key={`content-2_line${lineIndex}_active`}
                  id={`content-2_line${lineIndex}_active`}
                  onMouseLeave={() => setActiveLine(null)}
                >
                  {line.split("").map((char: string, charIndex: number) => {
                    return (
                      <span
                        key={`content-2_line${lineIndex}_char${charIndex}`}
                        onClick={handleClick}
                      >
                        {/* Note: Each character shall render as separate DOM node to apply click handler */}
                        {char}
                      </span>
                    )
                  })}
                </span>
              ) : (
                <span
                  key={`content-2_line${lineIndex}`}
                  onMouseEnter={() => setActiveLine(lineIndex)}
                >
                  {/* Note: Render lines instead of characters to reduce total DOM nodes */}
                  {line}
                </span>
              )}
            </>
          )
        })}
      </div>
    </>
  )
}

export default App
