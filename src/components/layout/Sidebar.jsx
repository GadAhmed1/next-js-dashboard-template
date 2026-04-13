"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  TrendingUp,
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Rocket,
  ChevronDown,
  FileText, 
  Image as ImageIcon,
  Shield, 
  Settings, 
  HelpCircle 
} from "lucide-react";

// ==========================================
// 1. الداتا (استخدمنا مراجع الأيقونات بدل كود الـ SVG للحفاظ على الذاكرة)
// ==========================================
const sidebarData = [
  {
    groupTitle: "MAIN MENU",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        subItems: [
          { label: "Analytics", href: "/" },
          { label: "Sales", href: "/sales" },
        ],
      },
      {
        label: "Calendar",
        icon: Calendar,
        href: "/calendar",
      },
    ],
  },
  {
    groupTitle: "OTHERS",
    items: [
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ],
  },
];

// ==========================================
// 2. المكونات الفرعية (Sub-Components)
// ==========================================

// اللوجو - استخدمنا memo عشان ميتعملوش Re-render بدون داعي
const SidebarLogo = memo(() => (
  <div className="relative pr-4 pb-5 border-b border-gray-100">
    <Link href="/" className="flex items-center gap-2" aria-label="Go to Home">
      <Rocket className="text-blue-600" size={24} aria-hidden="true" />
      <span className="text-xl font-bold text-blue-600">AdminPro</span>
    </Link>
  </div>
));
SidebarLogo.displayName = "SidebarLogo";

// زر اللينك العادي (بدون قائمة منسدلة)
const SidebarItem = ({ item, isActive }) => {
  const Icon = item.icon;
  
  return (
    <li>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined} // ممتاز للـ SEO
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200
          ${isActive 
            ? "bg-blue-50 text-blue-600" 
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
      >
        <Icon size={18} className="shrink-0" aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    </li>
  );
};

// زر القائمة المنسدلة (Submenu)
const SidebarDropdown = ({ item, pathname, isOpen, toggleMenu }) => {
  const Icon = item.icon;
  const isChildActive = item.subItems.some((sub) => sub.href === pathname);
  
  return (
    <li>
      <button
        onClick={() => toggleMenu(item.label)}
        aria-expanded={isOpen} // للـ Accessibility والـ SEO
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 
          ${isChildActive || isOpen 
            ? "bg-blue-50 text-blue-600" 
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
      >
        <Icon size={18} className="shrink-0" aria-hidden="true" />
        <span>{item.label}</span>
        
        <ChevronDown 
          size={16} 
          className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul className="mt-1 space-y-1 pl-10 pr-2">
          {item.subItems.map((sub, index) => {
            const isSubActive = pathname === sub.href;
            return (
              <li key={index}>
                <Link
                  href={sub.href}
                  aria-current={isSubActive ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-xs font-medium transition-colors
                    ${isSubActive 
                      ? "text-blue-600 bg-blue-50/50" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {sub.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

// مجموعة الروابط (MAIN MENU, OTHERS, etc)
const SidebarGroup = ({ group, pathname, openMenus, toggleMenu }) => (
  <div className="mb-6">
    <h2 className="mb-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
      {group.groupTitle}
    </h2>
    <ul className="space-y-1">
      {group.items.map((item, index) => {
        if (item.subItems) {
          return (
            <SidebarDropdown
              key={index}
              item={item}
              pathname={pathname}
              isOpen={openMenus[item.label]}
              toggleMenu={toggleMenu}
            />
          );
        }
        return (
          <SidebarItem
            key={index}
            item={item}
            isActive={pathname === item.href}
          />
        );
      })}
    </ul>
  </div>
);

// ==========================================
// 3. المكون الأساسي (Main Sidebar Component)
// ==========================================
export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  // استخدمنا useCallback عشان الدالة متتعملش من جديد كل ما السايدبار يتحدث (أداء أسرع)
  const toggleMenu = useCallback((label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  return (
    <aside className="w-[260px] border-r border-gray-200 bg-white hidden md:block shrink-0">
      <div className="flex h-full flex-col py-6 pl-5 pr-4">
        
        <SidebarLogo />

        {/* استخدمنا وسوم <nav> و <ul> لدعم محركات البحث والـ SEO بشكل سليم */}
        <nav aria-label="Sidebar Navigation" className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-2">
          {sidebarData.map((group, index) => (
            <SidebarGroup
              key={index}
              group={group}
              pathname={pathname}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
            />
          ))}
        </nav>
        
      </div>
    </aside>
  );
}