
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ModeToggle } from '@/components/ModeToggle';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const AdminSettings = () => {
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    businessName: 'Auto ADI',
    email: 'contact@auto-adi.fr',
    phone: '01 23 45 67 89',
    address: '123 Rue de Paris, 75001 Paris',
    currencySymbol: '€',
    language: 'fr',
    timezone: 'Europe/Paris',
    emailNotifications: true,
    darkMode: false,
    maintenanceMode: false,
  });

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Set language from language context if available
    if (language) {
      setSettings(prev => ({
        ...prev,
        language: language.toLowerCase()
      }));
    }
  }, [language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleToggle = (name: string, checked: boolean) => {
    setSettings({ ...settings, [name]: checked });
  };

  const handleSelect = (name: string, value: string) => {
    if (name === 'language') {
      // Map language codes to the Language type expected by the context
      const languageMap: Record<string, Language> = {
        'fr': 'FR',
        'en': 'EN',
        'es': 'ES',
        'it': 'IT',
        'pt': 'PT',
        'ro': 'RO',
        'de': 'DE',
        'nl': 'NL',
        'pl': 'PL',
        'ru': 'RU',
      };
      
      // Update the language in the language context
      if (languageMap[value]) {
        setLanguage(languageMap[value]);
      }
    }

    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    // Update language in the context
    const languageMap: Record<string, Language> = {
      'fr': 'FR',
      'en': 'EN',
      'es': 'ES',
      'it': 'IT',
      'pt': 'PT',
      'ro': 'RO',
      'de': 'DE',
      'nl': 'NL',
      'pl': 'PL',
      'ru': 'RU',
    };

    if (languageMap[settings.language]) {
      setLanguage(languageMap[settings.language]);
    }
    
    toast.success('Paramètres sauvegardés avec succès');
  };

  return (
    <>
      <Helmet>
        <title>Paramètres | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Configurez les informations de base de votre entreprise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nom de l'entreprise</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={settings.businessName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currencySymbol">Symbole monétaire</Label>
                    <Input
                      id="currencySymbol"
                      name="currencySymbol"
                      value={settings.currencySymbol}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => handleSelect('language', value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">Anglais</SelectItem>
                        <SelectItem value="es">Espagnol</SelectItem>
                        <SelectItem value="it">Italien</SelectItem>
                        <SelectItem value="pt">Portugais</SelectItem>
                        <SelectItem value="ro">Roumain</SelectItem>
                        <SelectItem value="de">Allemand</SelectItem>
                        <SelectItem value="nl">Néerlandais</SelectItem>
                        <SelectItem value="pl">Polonais</SelectItem>
                        <SelectItem value="ru">Russe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => handleSelect('timezone', value)}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="Europe/Rome">Europe/Rome</SelectItem>
                        <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                        <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                        <SelectItem value="Europe/Brussels">Europe/Brussels</SelectItem>
                        <SelectItem value="Europe/Lisbon">Europe/Lisbon</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Sauvegarder</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de votre tableau de bord
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Mode sombre</Label>
                    <p className="text-sm text-gray-500">
                      Activer le mode sombre pour l'interface
                    </p>
                  </div>
                  <ModeToggle />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                    <p className="text-sm text-gray-500">
                      Activer le mode maintenance pour le site public
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleToggle('maintenanceMode', checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Sauvegarder</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Gérez vos préférences de notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Notifications par email</Label>
                    <p className="text-sm text-gray-500">
                      Recevoir des notifications par email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleToggle('emailNotifications', checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Sauvegarder</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Gérez les paramètres de sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Changer le mot de passe</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminSettings;
