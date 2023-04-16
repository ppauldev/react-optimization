import { useEffect, useRef, useState } from "react"
import { Info } from "./Info"
import { lorem } from "../constants/text"

export const InBetween = () => {
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
      (event.target as HTMLSpanElement).style.backgroundColor = "rgb(221 214 254)"
    } else {
      (event.target as HTMLSpanElement).style.backgroundColor = "transparent"
    }

    activeRef.current = event.target as HTMLSpanElement
  }

  return (
    <>
      <Info count={info.count} mountTime={info.mountTime} />
      <div id="content-1" className="mt-6 mb-6" data-testid="in-between" key="content-1">
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