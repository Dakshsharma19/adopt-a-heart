import { PawPrint, BarChart3, FileText, Users, MessageCircle, Heart, DollarSign } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onChange: (tab: string) => void;
  role?: 'adopter' | 'shelter';
}

export const Sidebar = ({ activeTab, onChange, role = 'adopter' }: SidebarProps) => {
  const adopterTabs = [
    { id: 'apps', label: 'My Applications', icon: FileText },
    { id: 'msgs', label: 'Messages', icon: MessageCircle },
    { id: 'wish', label: 'Wishlist', icon: Heart },
    { id: 'donations', label: 'Donations', icon: DollarSign }
  ];

  const shelterTabs = [
    { id: 'pets', label: 'Pet Inventory', icon: PawPrint },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'apps', label: 'Applications', icon: FileText },
    { id: 'volunteers', label: 'Volunteers', icon: Users },
    { id: 'msgs', label: 'Messages', icon: MessageCircle }
  ];

  const tabs = role === 'shelter' ? shelterTabs : adopterTabs;

  return (
    <div className="bg-card rounded-xl shadow-soft p-6 h-fit">
      <div className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};