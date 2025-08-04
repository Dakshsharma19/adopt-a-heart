import { Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  image: string;
  desc: string;
  location: string;
  urgent: boolean;
  tags: string[];
}

interface PetCardProps {
  pet: Pet;
  onView: (id: number) => void;
  onWishlist: (id: number) => void;
  isLiked?: boolean;
}

export const PetCard = ({ pet, onView, onWishlist, isLiked = false }: PetCardProps) => (
  <div className="bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-accent/20 hover:border-primary/20 group">
    <div className="relative">
      <img 
        src={pet.image} 
        alt={pet.name} 
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      {pet.urgent && (
        <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-lg text-xs font-medium animate-pulse-soft">
          Urgent
        </div>
      )}
      <button
        onClick={() => onWishlist(pet.id)}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
          isLiked 
            ? 'bg-destructive text-destructive-foreground scale-110' 
            : 'bg-background/80 backdrop-blur-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:scale-110'
        }`}
      >
        <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
      </button>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
          {pet.name}
        </h3>
        <span className="text-sm text-muted-foreground">{pet.age}</span>
      </div>
      
      <p className="text-muted-foreground text-sm mb-2">{pet.breed}</p>
      <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{pet.desc}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {pet.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-lg">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-muted-foreground text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          {pet.location}
        </div>
        <Button
          onClick={() => onView(pet.id)}
          size="sm"
          className="text-sm font-medium"
        >
          View Profile
        </Button>
      </div>
    </div>
  </div>
);