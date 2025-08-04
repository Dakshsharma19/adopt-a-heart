import { useState } from 'react';
import { Heart, Search, MessageCircle, Home, User, DollarSign, ChevronLeft } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { PetCard } from '@/components/PetCard';
import { Button } from '@/components/ui/button';
import { pets, stories, Pet } from '@/data/mockData';

const Index = () => {
  const [page, setPage] = useState('home');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loggedIn, setLoggedIn] = useState(true);

  const toggleWishlist = (petId: number) => {
    setWishlist(prev => 
      prev.includes(petId) ? prev.filter(id => id !== petId) : [...prev, petId]
    );
  };

  const handleViewPet = (id: number) => {
    setSelectedPet(pets.find(p => p.id === id) || null);
    setPage('petProfile');
  };

  return (
    <div className="font-sans">
      <Navigation page={page} setPage={setPage} loggedIn={loggedIn} />
      
      {page === 'home' && (
        <HomePage 
          pets={pets}
          stories={stories}
          wishlist={wishlist}
          setPage={setPage}
          onViewPet={handleViewPet}
          onToggleWishlist={toggleWishlist}
        />
      )}
      
      {page === 'adopt' && (
        <div className="min-h-screen bg-muted py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Find Your New Best Friend</h1>
              <p className="text-muted-foreground text-lg">Browse available pets in Delhi NCR</p>
            </div>

            <div className="bg-card rounded-xl p-6 mb-8 shadow-soft">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, breed..."
                    className="border-0 bg-transparent focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onView={handleViewPet}
                  onWishlist={toggleWishlist}
                  isLiked={wishlist.includes(pet.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 'petProfile' && selectedPet && (
        <div className="min-h-screen bg-muted py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setPage('adopt')}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Adopt</span>
            </button>

            <div className="bg-card rounded-xl shadow-soft overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
                
                <div className="md:w-1/2 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold text-card-foreground">{selectedPet.name}</h1>
                    <button
                      onClick={() => toggleWishlist(selectedPet.id)}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        wishlist.includes(selectedPet.id)
                          ? 'bg-destructive text-destructive-foreground scale-110'
                          : 'bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:scale-110'
                      }`}
                    >
                      <Heart className="w-6 h-6" fill={wishlist.includes(selectedPet.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-accent">
                      <span className="text-muted-foreground">Breed</span>
                      <span className="font-medium text-card-foreground">{selectedPet.breed}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-accent">
                      <span className="text-muted-foreground">Age</span>
                      <span className="font-medium text-card-foreground">{selectedPet.age}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-accent">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium text-card-foreground">{selectedPet.size}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-card-foreground">{selectedPet.location}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-card-foreground mb-2">About {selectedPet.name}</h3>
                    <p className="text-muted-foreground">{selectedPet.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPet.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Apply to Adopt
                    </Button>
                    <Button
                      onClick={() => setPage('chat')}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                      size="lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Message Shelter</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-accent md:hidden z-40">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'adopt', icon: Search, label: 'Adopt' },
            { id: 'donate', icon: DollarSign, label: 'Donate' },
            { id: 'dashboard', icon: User, label: 'Profile' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  page === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
