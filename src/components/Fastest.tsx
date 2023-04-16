import { useEffect, useRef, useState } from "react"
import { Info } from "./Info"
import { lorem } from "../constants/text"

const loremWithLinebreaks = [...lorem].map((char: string, i: number) => i % 72 === 0 ? `${char}\n` : char).join("")

export const Fastest = () => {
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
      (event.target as HTMLSpanElement).style.backgroundColor = "rgb(221 214 254)"
    } else {
      (event.target as HTMLSpanElement).style.backgroundColor = "transparent"
    }

    activeRef.current = event.target as HTMLSpanElement
  }

  return (
    <>
      <Info count={info.count} mountTime={info.mountTime} />
      <div id="content-2" className="mt-6 mb-6" data-testid="fastest" key="content-2">
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