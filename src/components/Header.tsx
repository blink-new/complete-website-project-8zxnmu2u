import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  Menu, 
  ShoppingCart, 
  User, 
  LogOut, 
  Settings, 
  Package, 
  Shield,
  UserCircle,
  Building
} from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, signOut, isAdmin, loading } = useAuth();
  const { getItemCount, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleAuthAction = (action: 'login' | 'signup') => {
    navigate(`/?mode=${action}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const cartItemCount = getItemCount();

  return (
    <header className=\"bg-white shadow-sm border-b sticky top-0 z-50\">
      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
        <div className=\"flex justify-between items-center h-16\">
          {/* Logo */}\n          <div className=\"flex items-center\">
            <Link to=\"/\" className=\"flex items-center space-x-2\">
              <div className=\"w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center\">
                <span className=\"text-white font-bold text-sm\">JJ</span>\n              </div>
              <span className=\"font-bold text-xl text-gray-900\">JJ-P1114 STUDIO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}\n          <nav className=\"hidden md:flex space-x-8\">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${\n                  location.pathname === item.href\n                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'\n                    : 'text-gray-700'\n                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}\n          <div className=\"flex items-center space-x-4\">
            {/* Cart */}\n            <Button
              variant=\"ghost\"
              size=\"sm\"
              onClick={toggleCart}
              className=\"relative\"
            >
              <ShoppingCart className=\"h-5 w-5\" />
              {cartItemCount > 0 && (
                <Badge className=\"absolute -top-2 -right-2 bg-purple-600 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full\">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Authentication */}\n            {loading ? (
              <div className=\"w-8 h-8 bg-gray-200 rounded-full animate-pulse\" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant=\"ghost\" className=\"relative h-8 w-8 rounded-full\">
                    <Avatar className=\"h-8 w-8\">
                      <AvatarFallback className=\"bg-purple-100 text-purple-600 text-sm font-medium\">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=\"w-56\" align=\"end\" forceMount>
                  <DropdownMenuLabel className=\"font-normal\">
                    <div className=\"flex flex-col space-y-1\">
                      <p className=\"text-sm font-medium leading-none\">
                        {profile?.full_name || 'Utilisateur'}
                      </p>
                      <p className=\"text-xs leading-none text-muted-foreground\">
                        {user?.email}
                      </p>
                      {profile?.company_name && (
                        <p className=\"text-xs leading-none text-muted-foreground flex items-center mt-1\">
                          <Building className=\"w-3 h-3 mr-1\" />
                          {profile.company_name}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => navigate('/client-portal')}>
                    <UserCircle className=\"mr-2 h-4 w-4\" />
                    <span>Portail Client</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate('/client-portal?tab=orders')}>
                    <Package className=\"mr-2 h-4 w-4\" />
                    <span>Mes Commandes</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate('/client-portal?tab=profile')}>
                    <Settings className=\"mr-2 h-4 w-4\" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>

                  {isAdmin() && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Shield className=\"mr-2 h-4 w-4\" />
                        <span>Administration</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className=\"mr-2 h-4 w-4\" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className=\"flex items-center space-x-2\">
                <Button
                  variant=\"ghost\"
                  size=\"sm\"
                  onClick={() => handleAuthAction('login')}
                >
                  Connexion
                </Button>
                <Button
                  size=\"sm\"
                  onClick={() => handleAuthAction('signup')}
                  className=\"bg-purple-600 hover:bg-purple-700\"
                >
                  Inscription
                </Button>
              </div>
            )}

            {/* Mobile menu button */}\n            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant=\"ghost\" size=\"sm\" className=\"md:hidden\">
                  <Menu className=\"h-5 w-5\" />
                </Button>
              </SheetTrigger>
              <SheetContent side=\"right\" className=\"w-[300px] sm:w-[400px]\">
                <div className=\"flex flex-col space-y-4 mt-6\">
                  {/* User info in mobile */}\n                  {isAuthenticated && (
                    <div className=\"flex items-center space-x-3 p-4 bg-gray-50 rounded-lg\">
                      <Avatar className=\"h-10 w-10\">
                        <AvatarFallback className=\"bg-purple-100 text-purple-600\">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className=\"flex-1\">
                        <p className=\"text-sm font-medium\">
                          {profile?.full_name || 'Utilisateur'}
                        </p>
                        <p className=\"text-xs text-gray-500\">{user?.email}</p>
                        {profile?.company_name && (
                          <p className=\"text-xs text-gray-500 flex items-center mt-1\">
                            <Building className=\"w-3 h-3 mr-1\" />
                            {profile.company_name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}\n                  <nav className=\"flex flex-col space-y-2\">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${\n                          location.pathname === item.href\n                            ? 'bg-purple-100 text-purple-600'\n                            : 'text-gray-700 hover:bg-gray-100'\n                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile user actions */}\n                  {isAuthenticated ? (
                    <div className=\"flex flex-col space-y-2 pt-4 border-t\">
                      <Button
                        variant=\"ghost\"
                        className=\"justify-start\"
                        onClick={() => {
                          navigate('/client-portal');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <UserCircle className=\"mr-2 h-4 w-4\" />
                        Portail Client
                      </Button>
                      
                      <Button
                        variant=\"ghost\"
                        className=\"justify-start\"
                        onClick={() => {
                          navigate('/client-portal?tab=orders');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Package className=\"mr-2 h-4 w-4\" />
                        Mes Commandes
                      </Button>

                      {isAdmin() && (
                        <Button
                          variant=\"ghost\"
                          className=\"justify-start\"
                          onClick={() => {
                            navigate('/admin');
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Shield className=\"mr-2 h-4 w-4\" />
                          Administration
                        </Button>
                      )}
                      
                      <Button
                        variant=\"ghost\"
                        className=\"justify-start text-red-600 hover:text-red-700 hover:bg-red-50\"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className=\"mr-2 h-4 w-4\" />
                        Déconnexion
                      </Button>
                    </div>
                  ) : (
                    <div className=\"flex flex-col space-y-2 pt-4 border-t\">
                      <Button
                        variant=\"ghost\"
                        className=\"justify-start\"
                        onClick={() => {
                          handleAuthAction('login');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User className=\"mr-2 h-4 w-4\" />
                        Connexion
                      </Button>
                      <Button
                        className=\"justify-start bg-purple-600 hover:bg-purple-700\"
                        onClick={() => {
                          handleAuthAction('signup');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User className=\"mr-2 h-4 w-4\" />
                        Inscription
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;