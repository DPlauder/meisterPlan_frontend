import React from "react"
import { useState } from "react"
import MenuItem from "./MenuItem"
import SubMenuItem from "./SubMenuItem"
//import { menuItemsConfig, type MenuItemConfig } from "../../config/menuConfig"
import { menuItemsConfig, type MenuItemConfig } from "../../../config/menuConfig"

export default function Menu() {
  const [activeItem, setActiveItem] = useState<string>("1")
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())

  const toggleDropdown = (itemId: string) => {
    const newOpenDropdowns = new Set<string>()

    // Wenn das aktuelle Item bereits offen ist, schließe es
    if (openDropdowns.has(itemId)) {
      // Alle Dropdowns schließen (Set bleibt leer)
    } else {
      // Nur das neue Item öffnen, alle anderen schließen
      newOpenDropdowns.add(itemId)
    }

    setOpenDropdowns(newOpenDropdowns)
  }

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
    // Close all dropdowns when selecting a main item
    setOpenDropdowns(new Set())
  }

  const handleSubItemClick = (subItemId: string, parentId: string) => {
    setActiveItem(subItemId)
    // Close the dropdown when selecting a sub item
    const newOpenDropdowns = new Set(openDropdowns)
    newOpenDropdowns.delete(parentId)
    setOpenDropdowns(newOpenDropdowns)
  }

  const isItemActive = (itemId: string, children?: MenuItemConfig[]) => {
    if (activeItem === itemId) return true
    if (children) {
      return children.some((child) => child.id === activeItem)
    }
    return false
  }

  return (
    <nav className="flex items-center space-x-1">
      {menuItemsConfig.map((item: MenuItemConfig) => (
        <MenuItem
          key={item.id}
          label={item.label}
          icon={item.icon ? React.createElement(item.icon) : undefined}
          active={isItemActive(item.id, item.children)}
          hasChildren={!!item.children && item.children.length > 0}
          isOpen={openDropdowns.has(item.id)}
          onClick={() => handleItemClick(item.id)}
          onToggle={() => toggleDropdown(item.id)}
        >
          {item.children?.map((child: MenuItemConfig) => (
            <SubMenuItem
              key={child.id}
              label={child.label}
              active={activeItem === child.id}
              onClick={() => handleSubItemClick(child.id, item.id)}
            />
          ))}
        </MenuItem>
      ))}
    </nav>
  )
}
