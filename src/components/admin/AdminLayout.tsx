
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, Users, CreditCard, Tag, BarChart2, Award, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import AuthGuard from './AuthGuard';
import { useAuth } from '@/hooks/use-auth';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { name: 'Véhicules', href: '/admin/vehicles', icon: Car },
    { name: 'Témoignages', href: '/admin/testimonials', icon: Users },
    { name: 'Paiements', href: '/admin/payments', icon: CreditCard },
    { name: 'Promotions', href: '/admin/promotions', icon: Tag },
    { name: 'Statistiques', href: '/admin/stats', icon: BarChart2 },
    { name: 'Featured', href: '/admin/featured', icon: Award },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error('Erreur de déconnexion: ' + error.message);
        console.error('Error signing out:', error);
        return;
      }
      
      toast.success('Déconnexion réussie');
      
      // Redirect to login
      navigate('/admin/login');
    } catch (e) {
      console.error('Unexpected error during sign out:', e);
      toast.error('Une erreur inattendue est survenue');
    }
  };

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r">
            <div className="flex flex-col h-0 flex-1">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <h1 className="text-xl font-bold text-gray-900">Auto ADI Admin</h1>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href || 
                      (item.href !== '/admin' && location.pathname.startsWith(item.href));
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 ${
                            isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Button
                  variant="ghost"
                  className="flex-shrink-0 w-full group block"
                  onClick={handleSignOut}
                >
                  <div className="flex items-center">
                    <div>
                      <LogOut className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Déconnexion
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <ScrollArea className="h-[calc(100vh-2rem)]">
                  <Outlet />
                </ScrollArea>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
