import type React from "react"

interface SubMenuItemProps {
  label: string
  active?: boolean
  onClick?: () => void
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-2 text-sm transition-all duration-200
        ${
          active
            ? "bg-blue-500/20 text-blue-300 border-r-2 border-blue-400"
            : "text-slate-300 hover:text-white hover:bg-slate-700/50"
        }
      `}
    >
      {label}
    </button>
  )
}

export default SubMenuItem
