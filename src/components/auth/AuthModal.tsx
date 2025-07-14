import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

const AuthModal = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { signIn, signUp, resetPassword, loading, isAuthenticated } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  
  const [resetForm, setResetForm] = useState({
    email: ''
  });

  // Check URL params for auth modal
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'login' || mode === 'signup' || mode === 'reset') {
      setActiveTab(mode);
      setIsOpen(true);
    }
  }, [searchParams]);

  // Close modal when authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      handleClose();
    }
  }, [isAuthenticated, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setSuccess(null);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('mode');
      return newParams;
    });
    
    // Redirect if specified
    const redirect = searchParams.get('redirect');
    if (redirect && isAuthenticated) {
      navigate(redirect);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data, error } = await signIn(loginForm.email, loginForm.password);
    
    if (error) {
      setError(getErrorMessage(error.message));
    } else if (data?.user) {
      setSuccess('Connexion réussie !');
      setTimeout(handleClose, 1000);
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    const { data, error } = await signUp(
      signupForm.email, 
      signupForm.password, 
      signupForm.fullName
    );
    
    if (error) {
      setError(getErrorMessage(error.message));
    } else if (data?.user) {
      setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      setActiveTab('login');
      setLoginForm({ email: signupForm.email, password: '' });
    }
    
    setIsLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await resetPassword(resetForm.email);
    
    if (error) {
      setError(getErrorMessage(error.message));
    } else {
      setSuccess('Un email de réinitialisation a été envoyé à votre adresse.');
    }
    
    setIsLoading(false);
  };

  const getErrorMessage = (error: string) => {
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': 'Email ou mot de passe incorrect',
      'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter',
      'User already registered': 'Un compte existe déjà avec cet email',
      'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
      'Invalid email': 'Format d\'email invalide',
      'Signup is disabled': 'Les inscriptions sont temporairement désactivées',
      'Email rate limit exceeded': 'Trop de tentatives, veuillez réessayer plus tard'
    };
    
    return errorMessages[error] || error;
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'reset') => {
    setActiveTab(mode);
    setIsOpen(true);
    setError(null);
    setSuccess(null);
  };

  // Expose function globally for other components
  useEffect(() => {
    (window as any).openAuthModal = openAuthModal;
    return () => {
      delete (window as any).openAuthModal;
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=\"sm:max-w-md\">
        <DialogHeader>
          <DialogTitle className=\"text-center text-2xl font-bold\">
            {activeTab === 'login' && 'Connexion'}
            {activeTab === 'signup' && 'Créer un compte'}
            {activeTab === 'reset' && 'Réinitialiser le mot de passe'}
          </DialogTitle>
          <DialogDescription className=\"text-center\">
            {activeTab === 'login' && 'Connectez-vous à votre compte JJ-P1114 STUDIO'}
            {activeTab === 'signup' && 'Créez votre compte pour accéder à nos services'}
            {activeTab === 'reset' && 'Entrez votre email pour réinitialiser votre mot de passe'}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant=\"destructive\">
            <AlertCircle className=\"h-4 w-4\" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className=\"border-green-200 bg-green-50\">
            <CheckCircle className=\"h-4 w-4 text-green-600\" />
            <AlertDescription className=\"text-green-800\">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className=\"w-full\">
          <TabsList className=\"grid w-full grid-cols-2\">
            <TabsTrigger value=\"login\">Connexion</TabsTrigger>
            <TabsTrigger value=\"signup\">Inscription</TabsTrigger>
          </TabsList>

          {/* Login Tab */}\n          <TabsContent value=\"login\" className=\"space-y-4\">
            <form onSubmit={handleLogin} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <Label htmlFor=\"login-email\">Email</Label>
                <div className=\"relative\">
                  <Mail className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"login-email\"
                    type=\"email\"
                    placeholder=\"votre@email.com\"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className=\"pl-10\"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"login-password\">Mot de passe</Label>
                <div className=\"relative\">
                  <Lock className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"login-password\"
                    type={showPassword ? \"text\" : \"password\"}
                    placeholder=\"Votre mot de passe\"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className=\"pl-10 pr-10\"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type=\"button\"
                    onClick={() => setShowPassword(!showPassword)}
                    className=\"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600\"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}
                  </button>
                </div>
              </div>

              <Button
                type=\"button\"
                variant=\"link\"
                className=\"p-0 h-auto text-sm text-purple-600 hover:text-purple-700\"
                onClick={() => setActiveTab('reset')}
                disabled={isLoading}
              >
                Mot de passe oublié ?
              </Button>

              <Button type=\"submit\" className=\"w-full\" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value=\"signup\" className=\"space-y-4\">
            <form onSubmit={handleSignup} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <Label htmlFor=\"signup-name\">Nom complet</Label>
                <div className=\"relative\">
                  <User className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"signup-name\"
                    type=\"text\"
                    placeholder=\"Votre nom complet\"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className=\"pl-10\"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"signup-email\">Email</Label>
                <div className=\"relative\">
                  <Mail className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"signup-email\"
                    type=\"email\"
                    placeholder=\"votre@email.com\"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                    className=\"pl-10\"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"signup-password\">Mot de passe</Label>
                <div className=\"relative\">
                  <Lock className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"signup-password\"
                    type={showPassword ? \"text\" : \"password\"}
                    placeholder=\"Minimum 6 caractères\"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                    className=\"pl-10 pr-10\"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type=\"button\"
                    onClick={() => setShowPassword(!showPassword)}
                    className=\"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600\"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}
                  </button>
                </div>
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"signup-confirm-password\">Confirmer le mot de passe</Label>
                <div className=\"relative\">
                  <Lock className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"signup-confirm-password\"
                    type={showConfirmPassword ? \"text\" : \"password\"}
                    placeholder=\"Confirmez votre mot de passe\"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className=\"pl-10 pr-10\"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type=\"button\"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className=\"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600\"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}
                  </button>
                </div>
              </div>

              <Button type=\"submit\" className=\"w-full\" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                    Création...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Reset Password Form */}
        {activeTab === 'reset' && (
          <div className=\"space-y-4\">
            <form onSubmit={handleReset} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <Label htmlFor=\"reset-email\">Email</Label>
                <div className=\"relative\">
                  <Mail className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                  <Input
                    id=\"reset-email\"
                    type=\"email\"
                    placeholder=\"votre@email.com\"
                    value={resetForm.email}
                    onChange={(e) => setResetForm(prev => ({ ...prev, email: e.target.value }))}
                    className=\"pl-10\"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type=\"submit\" className=\"w-full\" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                    Envoi...
                  </>
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </Button>
            </form>

            <Separator />

            <Button
              type=\"button\"
              variant=\"outline\"
              className=\"w-full\"
              onClick={() => setActiveTab('login')}
              disabled={isLoading}
            >
              Retour à la connexion
            </Button>
          </div>
        )}

        <div className=\"text-center text-sm text-gray-500\">
          En vous connectant, vous acceptez nos{' '}
          <a href=\"/terms\" className=\"text-purple-600 hover:underline\">
            conditions d'utilisation
          </a>{' '}
          et notre{' '}
          <a href=\"/privacy\" className=\"text-purple-600 hover:underline\">
            politique de confidentialité
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;