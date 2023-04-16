export const Info = ({ count, mountTime }: { count: number, mountTime: number }) => {
  return (
    <div className="mb-5 flex flex-row justify-evenly" data-testid="info">
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