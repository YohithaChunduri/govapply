import React, { useState, useRef, useEffect } from "react";
import {
  Briefcase,
  FileText,
  FolderOpen,
  CheckCircle2,
  Bell,
  User,
  LogOut,
  HelpCircle,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApplications } from "../../context/ApplicationContext";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout, loginWithDemo } = useAuth();
  const { applications, notifications, markNotificationRead } = useApplications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Jobs & Exams", path: "/jobs", icon: <Briefcase className="w-4 h-4" /> },
    {
      label: "My Applications",
      path: "/applications",
      icon: <FileText className="w-4 h-4" />,
      badge: applications.length > 0 ? applications.length : undefined,
    },
    {
      label: "Document Vault",
      path: "/documents",
      icon: <FolderOpen className="w-4 h-4" />,
      badge: user ? user.documents.length : undefined,
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar (Realistic public service notice) */}
      <div className="bg-[#07192F] text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              GovApply Citizen Portal
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              Assisted Public Job Application Utility (Standard Service Charge: ₹40 per draft)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] ml-auto">
            <span className="text-slate-400 hidden sm:inline">Toll-Free Helpline: 1800-572-8921</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onNavigate("/help")}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3 h-3" />
              Help Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="flex items-center gap-3 text-left focus-visible:outline-none group cursor-pointer"
          >
            {/* Emblem badge */}
            <div className="w-10 h-10 rounded bg-[#0B2546] text-white flex flex-col items-center justify-center font-bold tracking-tight border border-[#081B33]">
              <span className="text-xs leading-none text-amber-400 font-semibold">GOV</span>
              <span className="text-[11px] leading-none text-slate-100 font-medium">APPLY</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-[#0B2546]">
                  GovApply
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  National
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-tight">
                Government Job Application Platform
              </p>
            </div>
          </button>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#0B2546] bg-slate-100 border border-slate-200 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? "bg-[#0B2546] text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5">
            {/* Notification Bell */}
            <div className="relative" ref={notifMenuRef}>
              <button
                type="button"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer focus-visible:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-md shadow-lg py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Official Notifications & Updates
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {notifications.length} Notices
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-xs text-slate-500 text-center">No notifications at this time.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                            !n.read ? "bg-blue-50/40" : ""
                          }`}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) {
                              onNavigate(n.link);
                              setNotifDropdownOpen(false);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-semibold text-slate-900 line-clamp-1">{n.title}</span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Profile Area */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer focus-visible:outline-none"
                >
                  <div className="w-7 h-7 rounded bg-[#0B2546] text-white flex items-center justify-center text-xs font-semibold uppercase">
                    {user.fullName.slice(0, 2)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-slate-900 line-clamp-1 leading-tight">{user.fullName}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {user.category} • {user.profileCompletionPercentage}% Complete
                    </p>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
                      <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                      <p className="text-[11px] text-slate-500">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Dossier Completion</span>
                        <span className="font-semibold text-emerald-700">{user.profileCompletionPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-emerald-600 h-1.5 rounded-full"
                          style={{ width: `${user.profileCompletionPercentage}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigate("/profile");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      Candidate Profile & Dossier
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigate("/documents");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 text-left cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4 text-slate-500" />
                      Document Vault ({user.documents.length} Files)
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigate("/applications");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 text-left cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-slate-500" />
                      Application History ({applications.length})
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        onNavigate("/");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-700 hover:bg-rose-50 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      Sign Out Session
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate("/signup")}
                >
                  Register
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    loginWithDemo();
                    onNavigate("/dashboard");
                  }}
                  className="hidden sm:inline-flex text-xs bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                >
                  ⚡ Demo Login
                </Button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 bg-white space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded ${
                  currentPath === item.path ? "bg-slate-100 text-[#0B2546] font-semibold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            {!isAuthenticated && (
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    loginWithDemo();
                    setMobileMenuOpen(false);
                    onNavigate("/dashboard");
                  }}
                  className="w-full"
                >
                  ⚡ Instant Demo Login
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
