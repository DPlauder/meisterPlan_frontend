import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';
//import { menuItemsConfig, type MenuItemConfig } from "../../config/menuConfig"
import {
  menuItemsConfig,
  type MenuItemConfig,
} from '../../../config/menuConfig';

export default function Menu() {
  const [activeItem, setActiveItem] = useState<string>('1');
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const menuRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = (itemId: string) => {
    const newOpenDropdowns = new Set<string>();

    // Wenn das aktuelle Item bereits offen ist, schließe es
    if (!openDropdowns.has(itemId)) {
      newOpenDropdowns.add(itemId);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Close all dropdowns when selecting a main item
    setOpenDropdowns(new Set());
    navigate(menuItemsConfig.find((item) => item.id === itemId)?.path || '/');
  };

  const handleSubItemClick = (subItemId: string, parentId: string) => {
    setActiveItem(subItemId);
    // Close the dropdown when selecting a sub item
    const newOpenDropdowns = new Set(openDropdowns);
    newOpenDropdowns.delete(parentId);
    setOpenDropdowns(newOpenDropdowns);
    navigate(
      menuItemsConfig
        .find((item) => item.id === parentId)
        ?.children?.find((child) => child.id === subItemId)?.path || '/'
    );
  };

  const isItemActive = (itemId: string, children?: MenuItemConfig[]) => {
    if (activeItem === itemId) return true;
    return children?.some((child) => child.id === activeItem) ?? false;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdowns(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav ref={menuRef} className="flex items-center space-x-1">
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
  );
}
