import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import { MenuIcon, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
    navigate(menuItemsConfig.find((item) => item.id === itemId)?.path || '/');
  };

  const handleSubItemClick = (subItemId: string, parentId: string) => {
    setActiveItem(subItemId);
    // Close the dropdown when selecting a sub item
    const newOpenDropdowns = new Set(openDropdowns);
    newOpenDropdowns.delete(parentId);
    setOpenDropdowns(newOpenDropdowns);
    setIsMobileMenuOpen(false);
    // Navigate to the sub item path
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
    <>
      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center space-x-1">
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
            {item.children?.map((child) => (
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

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="
            p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50
            transition-all duration-200 ease-in-out
          "
          aria-label="Menü öffnen"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`
          lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50
          bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="
              p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50
              transition-all duration-200 ease-in-out
            "
            aria-label="Menü schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {menuItemsConfig.map((item: MenuItemConfig) => (
            <div key={item.id} className="space-y-1">
              {/* Main Menu Item */}
              <button
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    toggleDropdown(item.id);
                  } else {
                    handleItemClick(item.id);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                  transition-all duration-200 ease-in-out text-left
                  ${
                    isItemActive(item.id, item.children)
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                {item.icon && (
                  <span
                    className={`transition-transform duration-200 ${isItemActive(item.id, item.children) ? 'scale-110' : ''}`}
                  >
                    {React.createElement(item.icon)}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.children && item.children.length > 0 && (
                  <span
                    className={`transition-transform duration-200 ${openDropdowns.has(item.id) ? 'rotate-180' : ''}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                )}
              </button>

              {/* Sub Menu Items */}
              {item.children &&
                item.children.length > 0 &&
                openDropdowns.has(item.id) && (
                  <div className="ml-4 space-y-1 border-l-2 border-slate-600/50 pl-4">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleSubItemClick(child.id, item.id)}
                        className={`
                        w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-200
                        ${
                          activeItem === child.id
                            ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                        }
                      `}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
