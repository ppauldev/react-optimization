export const Tab = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => {
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