
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { fetchTestimonials, approveTestimonial, deleteTestimonial } from '@/utils/services/supabaseService';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Star, Trash2, Loader2, ThumbsUp, User2 } from 'lucide-react';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  client_name: string;
  client_photo?: string;
  rating: number;
  comment: string;
  vehicle_id?: string;
  is_approved: boolean;
  featured: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      try {
        // Get all testimonials, including not approved ones
        const data = await fetchTestimonials(false);
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        toast.error('Erreur lors du chargement des témoignages');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTestimonials();
  }, []);

  const handleApproveToggle = async (id: string, currentStatus: boolean) => {
    try {
      await approveTestimonial(id, !currentStatus);
      
      // Update local state
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, is_approved: !currentStatus } : t
      ));
      
      toast.success(`Témoignage ${!currentStatus ? 'approuvé' : 'désapprouvé'}`);
    } catch (error) {
      console.error('Error toggling testimonial approval:', error);
      toast.error('Erreur lors de la mise à jour du témoignage');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      try {
        await deleteTestimonial(id);
        
        // Update local state
        setTestimonials(testimonials.filter(t => t.id !== id));
        
        toast.success('Témoignage supprimé avec succès');
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Erreur lors de la suppression du témoignage');
      }
    }
  };

  // Filter testimonials based on active tab
  const filteredTestimonials = testimonials.filter(testimonial => {
    if (activeTab === 'pending') {
      return !testimonial.is_approved;
    } else if (activeTab === 'approved') {
      return testimonial.is_approved;
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Gestion des témoignages | Admin Auto ADI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des témoignages</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="approved">Approuvés</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
            <ThumbsUp className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">Aucun témoignage trouvé</h3>
            <p className="mt-1 text-gray-500">
              {activeTab === 'pending' 
                ? "Il n'y a aucun témoignage en attente d'approbation." 
                : activeTab === 'approved'
                  ? "Il n'y a aucun témoignage approuvé."
                  : "Aucun témoignage n'a encore été ajouté."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className={`overflow-hidden ${!testimonial.is_approved ? 'border-orange-300' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {testimonial.client_photo ? (
                          <img
                            src={testimonial.client_photo}
                            alt={testimonial.client_name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User2 className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{testimonial.client_name}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {!testimonial.is_approved && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        En attente
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-700">{testimonial.comment}</p>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    Ajouté le {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`approve-${testimonial.id}`}
                      checked={testimonial.is_approved}
                      onCheckedChange={() => handleApproveToggle(testimonial.id, testimonial.is_approved)}
                    />
                    <Label htmlFor={`approve-${testimonial.id}`}>
                      {testimonial.is_approved ? 'Approuvé' : 'Approuver'}
                    </Label>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminTestimonials;
