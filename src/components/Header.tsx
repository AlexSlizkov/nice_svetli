import React from "react";
import { Layers, Briefcase, Calculator, ShieldCheck, Mail, Database } from "lucide-react";

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
  onOpenConsultation: () => void;
  onToggleAdmin: () => void;
  adminOpen: boolean;
  leadsCount: number;
}

export default function Header({ onScrollTo, onOpenConsultation, onToggleAdmin, adminOpen, leadsCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <span className="font-sans font-bold text-lg tracking-tight text-slate-900">Manage<span className="text-indigo-600">Top</span></span>
            <span className="block text-[10px] font-mono leading-none tracking-widest text-slate-500 uppercase">ERP & BPM SYSTEM</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onScrollTo("features")} 
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Возможности
          </button>
          <button 
            onClick={() => onScrollTo("pricing")} 
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Тарифы
          </button>
          <button 
            onClick={() => onScrollTo("calculator")} 
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <Calculator className="h-4 w-4" />
            ИИ-Калькулятор
          </button>
          <button 
            onClick={() => onScrollTo("benefits")} 
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Преимущества РФ
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            id="admin-panel-toggle"
            onClick={onToggleAdmin}
            className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono border transition-all ${
              adminOpen 
                ? "bg-slate-900 text-white border-slate-900" 
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>CRM-Панель ({leadsCount})</span>
            {leadsCount > 2 && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            )}
          </button>

          <button
            id="header-cta-btn"
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Внедрить за 1 день
          </button>
        </div>
      </div>
    </header>
  );
}
