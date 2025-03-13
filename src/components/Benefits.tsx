
import { ShieldCheck, Clock, Car, DollarSign } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-brand-blue" />,
      title: "Qualité garantie",
      description: "Tous nos véhicules sont soigneusement inspectés et certifiés pour assurer votre tranquillité d'esprit."
    },
    {
      icon: <Clock className="h-12 w-12 text-brand-blue" />,
      title: "Processus simple",
      description: "Achetez votre voiture en ligne ou en concession, comme vous préférez. Nous nous adaptons à vos besoins."
    },
    {
      icon: <Car className="h-12 w-12 text-brand-blue" />,
      title: "Essai gratuit",
      description: "Testez votre future voiture pendant 7 jours ou 1000 km avec une garantie satisfait ou remboursé."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-brand-blue" />,
      title: "Financement sur mesure",
      description: "Des solutions de financement adaptées à votre budget avec des taux compétitifs."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir Auto Adi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les avantages qui font notre différence et la satisfaction de nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center card-hover"
            >
              <div className="mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
