import type React from "react"
import { ChevronDown } from "lucide-react"

interface MenuItemProps {
  label: string
  icon?: React.ReactNode
  active?: boolean
  hasChildren?: boolean
  isOpen?: boolean
  onClick?: () => void
  onToggle?: () => void
  children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  active,
  hasChildren,
  isOpen,
  onClick,
  onToggle,
  children,
}) => {
  return (
    <div className="relative">
      <button
        onClick={hasChildren ? onToggle : onClick}
        className={`
          group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
          transition-all duration-200 ease-in-out
          ${
            active
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/20"
              : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-md"
          }
        `}
      >
        {icon && (
          <span className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-105"}`}>
            {icon}
          </span>
        )}
        <span className="hidden sm:inline-block">{label}</span>

        {hasChildren && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        )}

        {/* Active indicator */}
        {active && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
        )}
      </button>

      {/* Dropdown Menu */}
      {hasChildren && isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl z-50">
          <div className="py-2">{children}</div>
        </div>
      )}
    </div>
  )
}

export default MenuItem