'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Logo from '../common/logo';
import { navItems, bottomNavItems } from './constants';

const Sidebar = () => {
  const [active, setActive] = useState('/admin');

  return (
    <aside className="min-h-screen w-64 bg-[#0B3B2E] text-white flex flex-col fixed">
     
      <div className="flex-1 overflow-y-auto custom-scrollbar">
     
        <div className="px-6 text-2xl font-bold flex items-center space-x-2">
          <Link href="/">
            <Logo />
          </Link>
        </div>

       
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setActive(item.path)}
                className={clsx(
                  'flex items-center space-x-3 px-6 py-3 hover:bg-white/10 transition-colors duration-200',
                  active === item.path && 'bg-white/10'
                )}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

 
      <div className="space-y-1 p-4 border-t border-white/20">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={() => setActive(item.path)}
              className={clsx(
                'flex items-center space-x-3 px-2 py-3 hover:bg-white/10 transition-colors duration-200',
                active === item.path && 'bg-white/10'
              )}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
