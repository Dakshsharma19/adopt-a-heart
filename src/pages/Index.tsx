import { useState } from 'react';
import { Heart, Search, MessageCircle, Home, User, DollarSign, ChevronLeft, Award } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { PetCard } from '@/components/PetCard';
import { DonationForm } from '@/components/DonationForm';
import { Sidebar } from '@/components/Sidebar';
import { ChatBubble } from '@/components/ChatBubble';
import { Button } from '@/components/ui/button';
import { pets, stories, Pet } from '@/data/mockData';

const Index = () => {
  const [page, setPage] = useState('home');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('apps');

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

      {page === 'donate' && (
        <div className="min-h-screen bg-muted py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Make a Difference</h1>
              <p className="text-muted-foreground text-lg">Help provide food, medical care for Delhi street animals</p>
            </div>

            <div className="lg:flex lg:space-x-8">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <DonationForm onSubmit={(data) => console.log('Donation:', data)} />
              </div>

              <div className="lg:w-1/2 space-y-6">
                <div className="bg-card rounded-xl shadow-soft p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">Your Impact</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">₹500 provides</span>
                      <span className="font-semibold text-card-foreground">1 week of food</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">₹1000 provides</span>
                      <span className="font-semibold text-card-foreground">Basic medical checkup</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">₹2000 provides</span>
                      <span className="font-semibold text-card-foreground">Vaccination & treatment</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-soft p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">Top Donors This Month</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Arun Sharma', amount: '₹10,000' },
                      { name: 'Priya Gupta', amount: '₹7,500' },
                      { name: 'Rahul Singh', amount: '₹5,000' }
                    ].map((donor, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-warning" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-card-foreground">{donor.name}</p>
                        </div>
                        <span className="text-muted-foreground font-medium">{donor.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === 'dashboard' && (
        <div className="min-h-screen bg-muted py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your pet adoption journey</p>
            </div>

            <div className="lg:flex lg:space-x-8">
              <div className="lg:w-1/4 mb-8 lg:mb-0">
                <Sidebar activeTab={activeTab} onChange={setActiveTab} role="adopter" />
              </div>

              <div className="lg:w-3/4">
                {activeTab === 'apps' && (
                  <div className="bg-card rounded-xl shadow-soft p-6">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-6">My Applications</h2>
                    <div className="space-y-4">
                      {[1, 2].map((app) => (
                        <div key={app} className="border border-border rounded-lg p-4 flex items-center space-x-4">
                          <img
                            src={`https://images.unsplash.com/photo-${app === 1 ? '1552053831-71594a27632d' : '1583337130417-3346a1be7dee'}?w=100`}
                            alt="Pet"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground">{app === 1 ? 'Priya' : 'Arjun'}</h3>
                            <p className="text-muted-foreground text-sm">Applied 3 days ago</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              app === 1 ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                            }`}>
                              {app === 1 ? 'Under Review' : 'Approved'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'wish' && (
                  <div className="bg-card rounded-xl shadow-soft p-6">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-6">My Wishlist</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {pets.filter(pet => wishlist.includes(pet.id)).map((pet) => (
                        <PetCard
                          key={pet.id}
                          pet={pet}
                          onView={handleViewPet}
                          onWishlist={toggleWishlist}
                          isLiked={true}
                        />
                      ))}
                      {wishlist.length === 0 && (
                        <div className="col-span-2 text-center py-12">
                          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No pets in wishlist</h3>
                          <p className="text-muted-foreground mb-4">Start adding pets you're interested in!</p>
                          <Button
                            onClick={() => setPage('adopt')}
                            variant="outline"
                          >
                            Browse Pets
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'msgs' && (
                  <div className="bg-card rounded-xl shadow-soft p-6">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-6">Messages</h2>
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <Home className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground">Connaught Place Shelter</h3>
                            <p className="text-muted-foreground text-sm">Your application for Priya has been approved!</p>
                          </div>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'donations' && (
                  <div className="bg-card rounded-xl shadow-soft p-6">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-6">My Donations</h2>
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-card-foreground">₹1,000</h3>
                            <p className="text-muted-foreground text-sm">General Fund</p>
                          </div>
                          <span className="text-xs text-muted-foreground">Jan 15, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {page === 'chat' && (
        <div className="min-h-screen bg-muted">
          <div className="max-w-4xl mx-auto bg-card shadow-soft">
            <div className="border-b border-border p-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setPage('petProfile')}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">Connaught Place Shelter</h2>
                  <p className="text-sm text-muted-foreground">Usually responds within an hour</p>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4">
              <ChatBubble msg="Hi! I'm interested in adopting Priya. Can you tell me more?" isOwn={true} time="2:30 PM" />
              <ChatBubble msg="Hello! Priya is wonderful with children. Would you like to visit?" isOwn={false} time="2:32 PM" />
              <ChatBubble msg="That sounds perfect! What times work best?" isOwn={true} time="2:35 PM" />
              <ChatBubble msg="Saturday 10 AM or Sunday 11 AM work well. Which suits you?" isOwn={false} time="2:37 PM" />
            </div>

            <div className="border-t border-border p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
                <Button>
                  Send
                </Button>
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
