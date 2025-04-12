
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  fetchPromotions, 
  addPromotion, 
  updatePromotion, 
  togglePromotionStatus 
} from '@/utils/services/supabaseService';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Calendar, 
  Percent, 
  Search, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

interface Promotion {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  usage_limit?: number;
  usage_count?: number;
  min_order_value?: number;
  applies_to?: 'all' | 'specific';
  vehicle_ids?: string[];
  created_at: string;
}

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Partial<Promotion> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    const loadPromotions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPromotions();
        setPromotions(data);
      } catch (error) {
        console.error('Error loading promotions:', error);
        toast.error('Erreur lors du chargement des promotions');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPromotions();
  }, []);

  const handleAddPromotion = () => {
    setCurrentPromotion({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 10,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      is_active: true,
      usage_limit: 0,
      min_order_value: 0,
      applies_to: 'all'
    });
    setIsDialogOpen(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setCurrentPromotion({
      ...promotion,
      // Format dates for input elements
      start_date: new Date(promotion.start_date).toISOString().split('T')[0],
      end_date: new Date(promotion.end_date).toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleSavePromotion = async () => {
    if (!currentPromotion) return;
    
    try {
      // Convert dates to full ISO strings
      const promotionData = {
        ...currentPromotion,
        start_date: new Date(currentPromotion.start_date as string).toISOString(),
        end_date: new Date(currentPromotion.end_date as string).toISOString()
      };
      
      if (currentPromotion.id) {
        // Update existing promotion
        const updatedPromotion = await updatePromotion(currentPromotion.id, promotionData);
        setPromotions(promotions.map(p => 
          p.id === currentPromotion.id ? updatedPromotion : p
        ));
        toast.success('Promotion mise à jour avec succès');
      } else {
        // Add new promotion
        const newPromotion = await addPromotion(promotionData);
        setPromotions([newPromotion, ...promotions]);
        toast.success('Promotion ajoutée avec succès');
      }
      
      // Close dialog and reset form
      setIsDialogOpen(false);
      setCurrentPromotion(null);
    } catch (error) {
      console.error('Error saving promotion:', error);
      toast.error('Erreur lors de la sauvegarde de la promotion');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await togglePromotionStatus(id, !currentStatus);
      
      // Update local state
      setPromotions(promotions.map(p => 
        p.id === id ? { ...p, is_active: !currentStatus } : p
      ));
      
      toast.success(`Promotion ${!currentStatus ? 'activée' : 'désactivée'}`);
    } catch (error) {
      console.error('Error toggling promotion status:', error);
      toast.error('Erreur lors de la modification du statut');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter promotions
  const filteredPromotions = promotions.filter(promotion => {
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && promotion.is_active) || 
      (statusFilter === 'inactive' && !promotion.is_active);
    
    const matchesSearch = 
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Check if a promotion is currently active based on dates
  const isPromotionActive = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.start_date);
    const endDate = new Date(promotion.end_date);
    
    return promotion.is_active && startDate <= now && endDate >= now;
  };

  return (
    <>
      <Helmet>
        <title>Gestion des promotions | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestion des promotions</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="inactive">Inactives</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleAddPromotion}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une promotion
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Promotions & Offres Spéciales</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredPromotions.length === 0 ? (
              <div className="text-center p-12 border rounded-lg bg-gray-50">
                <Tag className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">Aucune promotion trouvée</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Aucun résultat pour ces critères de recherche."
                    : "Aucune promotion n'a encore été créée."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Remise</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actif</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPromotions.map((promotion) => (
                      <TableRow key={promotion.id}>
                        <TableCell className="font-medium">{promotion.code}</TableCell>
                        <TableCell>{promotion.description}</TableCell>
                        <TableCell>
                          {promotion.discount_type === 'percentage' 
                            ? `${promotion.discount_value}%` 
                            : `${promotion.discount_value}€`}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Début: {new Date(promotion.start_date).toLocaleDateString('fr-FR')}</div>
                            <div>Fin: {new Date(promotion.end_date).toLocaleDateString('fr-FR')}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {isPromotionActive(promotion) 
                            ? <Badge variant="default" className="bg-green-500">En cours</Badge> 
                            : <Badge variant="secondary">Inactif</Badge>}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={promotion.is_active}
                            onCheckedChange={() => handleToggleStatus(promotion.id, promotion.is_active)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditPromotion(promotion)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(promotion.id, promotion.is_active)}
                              >
                                {promotion.is_active 
                                  ? <XCircle className="mr-2 h-4 w-4" /> 
                                  : <CheckCircle className="mr-2 h-4 w-4" />}
                                {promotion.is_active ? 'Désactiver' : 'Activer'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Add/Edit Promotion Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentPromotion?.id ? 'Modifier la promotion' : 'Ajouter une promotion'}
            </DialogTitle>
            <DialogDescription>
              {currentPromotion?.id 
                ? 'Modifier les détails de la promotion existante' 
                : 'Créer une nouvelle promotion pour vos clients'}
            </DialogDescription>
          </DialogHeader>
          
          {currentPromotion && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code promotionnel</Label>
                <Input 
                  id="code" 
                  value={currentPromotion.code || ''} 
                  onChange={(e) => setCurrentPromotion({...currentPromotion, code: e.target.value})}
                  placeholder="SOLDES2025"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={currentPromotion.description || ''} 
                  onChange={(e) => setCurrentPromotion({...currentPromotion, description: e.target.value})}
                  placeholder="Soldes d'été 2025"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount_type">Type de remise</Label>
                  <Select
                    value={currentPromotion.discount_type || 'percentage'}
                    onValueChange={(value) => setCurrentPromotion({
                      ...currentPromotion, 
                      discount_type: value as 'percentage' | 'fixed'
                    })}
                  >
                    <SelectTrigger id="discount_type">
                      <SelectValue placeholder="Type de remise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                      <SelectItem value="fixed">Montant fixe (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount_value">Valeur de la remise</Label>
                  <Input 
                    id="discount_value" 
                    type="number"
                    value={currentPromotion.discount_value || ''} 
                    onChange={(e) => setCurrentPromotion({
                      ...currentPromotion, 
                      discount_value: parseInt(e.target.value)
                    })}
                    placeholder={currentPromotion.discount_type === 'percentage' ? "10" : "100"}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Date de début</Label>
                  <Input 
                    id="start_date" 
                    type="date"
                    value={currentPromotion.start_date || ''} 
                    onChange={(e) => setCurrentPromotion({...currentPromotion, start_date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end_date">Date de fin</Label>
                  <Input 
                    id="end_date" 
                    type="date"
                    value={currentPromotion.end_date || ''} 
                    onChange={(e) => setCurrentPromotion({...currentPromotion, end_date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usage_limit">Limite d'utilisation</Label>
                  <Input 
                    id="usage_limit" 
                    type="number"
                    value={currentPromotion.usage_limit || ''} 
                    onChange={(e) => setCurrentPromotion({
                      ...currentPromotion, 
                      usage_limit: parseInt(e.target.value)
                    })}
                    placeholder="0 = illimité"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min_order_value">Montant minimum</Label>
                  <Input 
                    id="min_order_value" 
                    type="number"
                    value={currentPromotion.min_order_value || ''} 
                    onChange={(e) => setCurrentPromotion({
                      ...currentPromotion, 
                      min_order_value: parseInt(e.target.value)
                    })}
                    placeholder="0 = aucun minimum"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={currentPromotion.is_active || false}
                  onCheckedChange={(checked) => setCurrentPromotion({...currentPromotion, is_active: checked})}
                />
                <Label htmlFor="is_active">Promotion active</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSavePromotion}>
              {currentPromotion?.id ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPromotions;
