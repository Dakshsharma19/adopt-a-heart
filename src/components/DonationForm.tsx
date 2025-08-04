import { useState } from 'react';
import { Button } from './ui/button';

interface DonationFormProps {
  onSubmit: (data: { amount: string; recurring: boolean; pet: string }) => void;
}

export const DonationForm = ({ onSubmit }: DonationFormProps) => {
  const [amount, setAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [pet, setPet] = useState('');

  const handleSubmit = () => {
    onSubmit({ amount, recurring, pet });
  };

  return (
    <div className="bg-card rounded-xl shadow-soft p-6">
      <h3 className="text-xl font-semibold text-card-foreground mb-6">Make a Donation</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-3">Select Amount (₹)</label>
          <div className="grid grid-cols-3 gap-3">
            {['500', '1000', '2000'].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`p-3 rounded-lg border text-center font-medium transition-colors ${
                  amount === val 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border hover:border-accent-foreground'
                }`}
              >
                ₹{val}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Custom Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Sponsor a Pet</label>
          <select
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          >
            <option value="">General Fund</option>
            <option value="priya">Priya - Golden Retriever</option>
            <option value="arjun">Arjun - Indie Mix</option>
            <option value="sakshi">Sakshi - Labrador Mix</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="recurring"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <label htmlFor="recurring" className="text-sm font-medium text-foreground">
            Make this monthly
          </label>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
        >
          Donate ₹{amount || '0'}
        </Button>
      </div>
    </div>
  );
};