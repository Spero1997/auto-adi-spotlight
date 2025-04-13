
const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ils nous ont fait confiance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-500 font-bold text-xl">JD</span>
              </div>
              <div>
                <h4 className="font-bold">Jean Dupont</h4>
                <p className="text-gray-600">Zurich, Suisse</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "J'ai acheté une Mercedes CLA depuis la France et elle a été livrée en Suisse en parfait état. Toutes les démarches douanières ont été prises en charge. Service impeccable !"
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-500 font-bold text-xl">MM</span>
              </div>
              <div>
                <h4 className="font-bold">Maria Müller</h4>
                <p className="text-gray-600">Berlin, Allemagne</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Livraison rapide et sérieuse de mon Audi Q5. Le suivi en temps réel m'a permis d'être informée à chaque étape. Je recommande vivement."
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-500 font-bold text-xl">AR</span>
              </div>
              <div>
                <h4 className="font-bold">Antonio Rodriguez</h4>
                <p className="text-gray-600">Barcelone, Espagne</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Service premium avec la livraison en camion fermé. Le véhicule est arrivé en parfait état et toute la documentation était prête pour l'immatriculation en Espagne."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
