import { useState } from "react";
import { PawPrint, Menu, X, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationPanel } from "./NotificationPanel";

interface NavigationProps {
  page: string;
  setPage: (page: string) => void;
  loggedIn: boolean;
}

export const Navigation = ({ page, setPage, loggedIn }: NavigationProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'success' as const,
      title: 'Application Approved!',
      message: 'Your application for Priya has been approved.',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info' as const,
      title: 'New Message',
      message: 'Connaught Place Shelter sent you a message.',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'warning' as const,
      title: 'Profile Incomplete',
      message: 'Please complete your profile for faster adoption.',
      time: '1 day ago'
    }
  ];

  return (
    <nav className="bg-background shadow-soft border-b border-accent/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-xl">
              <PawPrint className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Shelter Soul</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['home', 'adopt', 'donate', 'dashboard'].map((item) => (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`font-medium transition-colors capitalize ${
                  page === item ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {loggedIn ? (
              <>
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifs(!showNotifs)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <NotificationPanel 
                    notifications={notifications}
                    isOpen={showNotifs}
                    onClose={() => setShowNotifs(false)}
                  />
                </div>
                
                <Button
                  onClick={() => setPage('dashboard')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Profile</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setPage('auth')}
                variant="hero"
                size="sm"
                className="font-medium"
              >
                Sign In
              </Button>
            )}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-accent/20 py-4">
            <div className="space-y-2">
              {['home', 'adopt', 'donate', 'dashboard'].map((item) => (
                <button
                  key={item}
                  onClick={() => {setPage(item); setMobileMenu(false);}}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors capitalize rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};