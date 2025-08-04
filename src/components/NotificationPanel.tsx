import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel = ({ notifications, isOpen, onClose }: NotificationPanelProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-12 right-0 w-80 bg-card rounded-xl shadow-medium border border-accent/20 p-4 z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-card-foreground">Notifications</h3>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-accent rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-start space-x-3 p-2 hover:bg-accent rounded-lg transition-colors">
            <div className={`p-1 rounded-full ${
              notif.type === 'success' ? 'bg-success/10' : 
              notif.type === 'warning' ? 'bg-warning/10' : 'bg-info/10'
            }`}>
              {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-success" />}
              {notif.type === 'warning' && <AlertCircle className="w-4 h-4 text-warning" />}
              {notif.type === 'info' && <Info className="w-4 h-4 text-info" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">{notif.title}</p>
              <p className="text-xs text-muted-foreground">{notif.message}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};