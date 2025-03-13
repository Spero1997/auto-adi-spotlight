
import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Car, Info, Check, X, Upload, Image as ImageIcon, Link } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImportedVehicle, addImportedVehicles } from '@/utils/vehicleImportService';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Schéma de validation du formulaire
const formSchema = z.object({
  brand: z.string().min(1, { message: "La marque est requise" }),
  model: z.string().min(1, { message: "Le modèle est requis" }),
  year: z.coerce.number().int().min(1900, { message: "L'année doit être supérieure à 1900" }).max(new Date().getFullYear() + 1),
  mileage: z.coerce.number().int().min(0, { message: "Le kilométrage doit être positif" }),
  price: z.coerce.number().int().min(0, { message: "Le prix doit être positif" }),
  fuelType: z.string().min(1, { message: "Le type de carburant est requis" }),
  transmission: z.string().optional(),
  exteriorColor: z.string().optional(),
  interiorColor: z.string().optional(),
  doors: z.coerce.number().int().min(0).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  engine: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const VehicleAddForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialisation du formulaire
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      price: 0,
      fuelType: '',
      transmission: '',
      exteriorColor: '',
      interiorColor: '',
      doors: undefined,
      description: '',
      image: '',
      engine: '',
    },
  });

  // Gestion du changement de fichier image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fichier trop volumineux", {
          description: "La taille maximum est de 5Mo"
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Format non supporté", {
          description: "Veuillez sélectionner une image (JPG, PNG, etc.)"
        });
        return;
      }
      
      setSelectedImage(file);
      
      // Créer une URL pour la prévisualisation
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Mettre à jour le champ du formulaire
      form.setValue('image', objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  // Gérer le clic sur le bouton d'upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      let imageUrl = data.image || '';
      
      // Si une image a été téléchargée via le sélecteur de fichier
      if (selectedImage) {
        try {
          // Convertir l'image en base64 pour le stockage local
          const base64Image = await convertFileToBase64(selectedImage);
          imageUrl = base64Image;
        } catch (error) {
          console.error("Erreur lors de la conversion de l'image:", error);
          toast.error("Erreur avec l'image", {
            description: "Impossible de traiter l'image sélectionnée"
          });
        }
      }
      
      // Créer un objet véhicule au format attendu
      const newVehicle: ImportedVehicle = {
        id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        brand: data.brand,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        price: data.price,
        fuelType: data.fuelType,
        transmission: data.transmission || undefined,
        exteriorColor: data.exteriorColor || undefined,
        interiorColor: data.interiorColor || undefined,
        doors: data.doors,
        description: data.description || undefined,
        image: imageUrl || 'https://via.placeholder.com/400x200?text=No+Image',
        engine: data.engine || undefined,
        features: [],
      };

      // Ajouter le véhicule à la liste
      addImportedVehicles([newVehicle]);
      
      // Réinitialiser le formulaire
      form.reset();
      setSelectedImage(null);
      setPreviewUrl('');
      
      toast.success("Véhicule ajouté avec succès", {
        description: `${data.brand} ${data.model} a été ajouté à votre inventaire.`
      });
      
      // Rediriger vers la page de gestion des véhicules
      setTimeout(() => {
        navigate('/vehicules/gestion');
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
      toast.error("Erreur lors de l'ajout du véhicule", {
        description: "Une erreur est survenue. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convertir un fichier en base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const getFuelTypeOptions = () => [
    { value: 'Essence', label: 'Essence' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Hybride', label: 'Hybride' },
    { value: 'Électrique', label: 'Électrique' },
    { value: 'GPL', label: 'GPL' },
    { value: 'Hydrogène', label: 'Hydrogène' }
  ];

  const getTransmissionOptions = () => [
    { value: 'Manuelle', label: 'Manuelle' },
    { value: 'Automatique', label: 'Automatique' },
    { value: 'Semi-automatique', label: 'Semi-automatique' }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gray-50">
        <CardTitle className="flex items-center">
          <Car className="mr-2 h-6 w-6 text-brand-blue" />
          Ajout manuel d'un véhicule
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Info className="mr-2 h-5 w-5 text-gray-600" />
                  Informations principales
                </h3>
                
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marque *</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Renault" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modèle *</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Clio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kilométrage *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix (€) *</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de carburant *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un carburant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getFuelTypeOptions().map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Section image avec deux méthodes (fichier ou URL) */}
                <div className="space-y-3">
                  <FormLabel>Image du véhicule</FormLabel>
                  
                  <Tabs defaultValue="file" className="w-full" onValueChange={(value) => setUploadMethod(value as 'file' | 'url')}>
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="file" className="flex items-center">
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </TabsTrigger>
                      <TabsTrigger value="url" className="flex items-center">
                        <Link className="mr-2 h-4 w-4" />
                        URL
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="file" className="mt-0 space-y-3">
                      {/* Prévisualisation de l'image */}
                      {previewUrl && (
                        <div className="relative w-full border rounded-md overflow-hidden mb-2">
                          <img 
                            src={previewUrl} 
                            alt="Prévisualisation" 
                            className="w-full h-40 object-contain bg-gray-50" 
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setSelectedImage(null);
                              setPreviewUrl('');
                              form.setValue('image', '');
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      
                      {/* Input file caché */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      
                      {/* Bouton de téléchargement */}
                      {!previewUrl && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleUploadClick}
                          className="w-full h-40 flex flex-col items-center justify-center border-dashed border-2 bg-gray-50"
                        >
                          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-gray-600">Cliquez pour sélectionner une image</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG, etc. (max 5Mo)</span>
                        </Button>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="url" className="mt-0">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Lien direct vers l'image du véhicule
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* Détails techniques */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Info className="mr-2 h-5 w-5 text-gray-600" />
                  Détails supplémentaires
                </h3>
                
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transmission</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une transmission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getTransmissionOptions().map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="exteriorColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Couleur extérieure</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Noir" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interiorColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Couleur intérieure</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Beige" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="doors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de portes</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="engine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Moteur</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 1.5 dCi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description du véhicule..." 
                          className="resize-none min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  setSelectedImage(null);
                  setPreviewUrl('');
                }}
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
              <Button 
                type="submit" 
                className="bg-brand-blue hover:bg-brand-darkBlue"
                disabled={isSubmitting}
              >
                <Check className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enregistrement..." : "Ajouter le véhicule"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleAddForm;
