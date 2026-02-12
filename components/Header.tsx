"use client";

import Link from "next/link";
import { Stethoscope, Search, PlusCircle, User, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Stethoscope className="h-7 w-7" strokeWidth={2} />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            安心照护
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-blue-600 font-medium transition-colors"
          >
            <Search className="h-4 w-4" />
            找看护
          </Link>
          <Link
            href="/publish"
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            发布需求
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <User className="h-4 w-4" />
            个人中心
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="打开菜单"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-2 shadow-sm">
          <Link
            href="/"
            className="py-2 flex items-center gap-2 text-blue-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            <Search className="h-4 w-4" />
            找看护
          </Link>
          <Link
            href="/publish"
            className="py-2 flex items-center gap-2 text-slate-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            <PlusCircle className="h-4 w-4" />
            发布需求
          </Link>
          <Link
            href="/login"
            className="py-2 flex items-center gap-2 text-slate-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            <User className="h-4 w-4" />
            个人中心
          </Link>
        </div>
      )}
    </header>
  );
}
