import { PawPrint, DollarSign, Zap, MessageCircle, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PetCard } from "./PetCard";

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

interface Story {
  id: number;
  petName: string;
  adopter: string;
  image: string;
  story: string;
}

interface HomePageProps {
  pets: Pet[];
  stories: Story[];
  wishlist: number[];
  setPage: (page: string) => void;
  onViewPet: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export const HomePage = ({ pets, stories, wishlist, setPage, onViewPet, onToggleWishlist }: HomePageProps) => (
  <div className="min-h-screen bg-gradient-hero">
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Find Your Perfect
          <span className="text-primary"> Companion</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Connect with loving pets in Delhi NCR. Our smart matching helps you find the perfect furry friend.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={() => setPage('adopt')}
            variant="hero"
            size="xl"
            className="flex items-center space-x-2"
          >
            <PawPrint className="w-5 h-5" />
            <span>Adopt Now</span>
          </Button>
          <Button variant="secondary" size="xl">
            Foster
          </Button>
          <Button
            onClick={() => setPage('donate')}
            variant="warning"
            size="xl"
            className="flex items-center space-x-2"
          >
            <DollarSign className="w-5 h-5" />
            <span>Donate</span>
          </Button>
          <Button variant="warm" size="xl">
            Volunteer
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Smart Matching</h3>
            <p className="text-muted-foreground text-sm">AI matches you with compatible pets in Delhi</p>
          </div>
          <div className="text-center group">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
              <MessageCircle className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Real-time Chat</h3>
            <p className="text-muted-foreground text-sm">Connect instantly with Delhi shelters</p>
          </div>
          <div className="text-center group">
            <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-warning/20 transition-colors">
              <Shield className="w-8 h-8 text-warning" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Transparent Donations</h3>
            <p className="text-muted-foreground text-sm">Track how your rupees help pets</p>
          </div>
          <div className="text-center group">
            <div className="bg-info/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-info/20 transition-colors">
              <Users className="w-8 h-8 text-info" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Volunteer Network</h3>
            <p className="text-muted-foreground text-sm">Join Delhi's animal lover community</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Pets</h2>
          <p className="text-muted-foreground text-lg">Meet amazing animals in Delhi looking for homes</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onView={onViewPet}
              onWishlist={onToggleWishlist}
              isLiked={wishlist.includes(pet.id)}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 bg-gradient-warm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-muted-foreground text-lg">Heartwarming Delhi adoption tales</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-start space-x-4">
                <img
                  src={story.image}
                  alt={story.petName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">
                    {story.petName} & {story.adopter}
                  </h3>
                  <p className="text-muted-foreground italic">"{story.story}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);