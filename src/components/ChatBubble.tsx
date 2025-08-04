interface ChatBubbleProps {
  msg: string;
  isOwn: boolean;
  time: string;
}

export const ChatBubble = ({ msg, isOwn, time }: ChatBubbleProps) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
      isOwn 
        ? 'bg-primary text-primary-foreground rounded-br-md' 
        : 'bg-muted text-muted-foreground rounded-bl-md'
    }`}>
      <p className="text-sm">{msg}</p>
      <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>{time}</p>
    </div>
  </div>
);