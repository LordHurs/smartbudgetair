'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-brand-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-brand-700 group-hover:text-brand-800 transition-colors">
              SmartBudget<span className="text-brand-500">Air</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-brand-600 font-medium text-sm transition-colors">
              Accueil
            </Link>
            <Link href="/#destinations" className="text-gray-600 hover:text-brand-600 font-medium text-sm transition-colors">
              Destinations
            </Link>
            <Link href="/#comment-ca-marche" className="text-gray-600 hover:text-brand-600 font-medium text-sm transition-colors">
              Comment ça marche
            </Link>
            <Link href="/" className="btn-primary text-sm py-2 px-5">
              Rechercher un vol
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-brand-600 font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
              Accueil
            </Link>
            <Link href="/#destinations" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-brand-600 font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
              Destinations
            </Link>
            <Link href="/#comment-ca-marche" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-brand-600 font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
              Comment ça marche
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
