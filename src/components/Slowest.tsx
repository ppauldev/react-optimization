import { useEffect, useState } from "react"
import { Info } from "./Info"
import { lorem } from "../constants/text"

export const Slowest = () => {
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
      <div id="content-0" className="mt-6 mb-6" data-testid="slowest" key="content-0">
        {lorem.split("").map((char: string, i: number) => {
          return (
            <span
              key={`content-0_${i}`}
              onClick={() => active === i ? setActive(null) : setActive(i)}
              style={{ backgroundColor: active === i ? "rgb(221 214 254)" : "transparent" }}
            >
              {char}
            </span>
          )
        })}
      </div>
    </>
  )
}