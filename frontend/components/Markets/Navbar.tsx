// import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Trophy, User, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavbarButton, NavbarLogo } from '../ui/resizable-navbar';

const Navbar = () => {
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-[#01333f]  backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <NavbarLogo/>
            </div>
            
          </Link>

          <div className="hidden md:flex items-center gap-6 text-white">
            <Link href="/markets">
            
              <Button
              variant={'ghost'}
                // variant={isActive('/markets') ? 'default' : 'ghost'} 
                className="gap-2" 
              >
                <LayoutGrid className="w-4 h-4" />
                Markets
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button 
              variant={'ghost'}
                // variant={isActive('/leaderboard') ? 'default' : 'ghost'} 
                className="gap-2"
              >
                <Trophy className="w-4 h-4" />
                Leaderboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button 
              variant={'ghost'}
                // variant={isActive('/profile') ? 'default' : 'ghost'} 
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>
          </div>

          {/* <ConnectButton /> */}
          <NavbarButton
                  // onClick={() => setIsMobileMenuOpen(false)}
                  className=""
                >
                  Get Started
                </NavbarButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
