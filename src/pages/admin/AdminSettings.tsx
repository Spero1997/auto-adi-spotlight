
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [salesAlerts, setSalesAlerts] = useState(true);
  const [leadNotifications, setLeadNotifications] = useState(true);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Mot de passe mis à jour avec succès');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour du mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Paramètres | Admin Auto ADI</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-gray-500 mt-2">
            Gérez les paramètres de votre compte et de l'application.
          </p>
        </div>

        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations de compte.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input id="name" placeholder="Votre nom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Votre email" />
                    </div>
                  </div>
                  
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
                <CardDescription>
                  Mettez à jour votre mot de passe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Changer le mot de passe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>
                  Choisissez comment vous souhaitez être notifié.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">
                        Notifications par email
                      </Label>
                      <p className="text-sm text-gray-500">
                        Recevez des emails concernant les activités de votre compte.
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sales-alerts" className="font-medium">
                        Alertes de ventes
                      </Label>
                      <p className="text-sm text-gray-500">
                        Recevez des notifications lorsqu'une vente est effectuée.
                      </p>
                    </div>
                    <Switch
                      id="sales-alerts"
                      checked={salesAlerts}
                      onCheckedChange={setSalesAlerts}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lead-notifications" className="font-medium">
                        Demandes de contact
                      </Label>
                      <p className="text-sm text-gray-500">
                        Recevez des notifications lorsqu'un client fait une demande de contact.
                      </p>
                    </div>
                    <Switch
                      id="lead-notifications"
                      checked={leadNotifications}
                      onCheckedChange={setLeadNotifications}
                    />
                  </div>
                </div>
                
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer les préférences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'interface d'administration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex items-center gap-2 cursor-pointer bg-white text-black">
                      <div className="h-4 w-4 rounded-full bg-black"></div>
                      <span>Clair</span>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-2 cursor-pointer bg-gray-900 text-white">
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                      <span>Sombre</span>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-2 cursor-pointer">
                      <div className="h-4 w-4 rounded-full bg-gray-400"></div>
                      <span>Système</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Densité d'affichage</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex items-center gap-2 cursor-pointer">
                      <span>Compacte</span>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-2 cursor-pointer bg-gray-100">
                      <span>Standard</span>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-2 cursor-pointer">
                      <span>Confortable</span>
                    </div>
                  </div>
                </div>
                
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer les préférences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminSettings;
