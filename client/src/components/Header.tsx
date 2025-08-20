import { LanguageToggle } from './LanguageToggle';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3" data-testid="brand-logo">
            <div className="w-9 h-9 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DB</span>
            </div>
            <span className="text-xl font-bold text-brand-text">Delivery Booster</span>
          </div>
          
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
};
