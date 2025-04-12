
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
    DE: string;
    NL: string;
    PL: string;
    RU: string;
  };
  rating: number;
  location: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
    DE: string;
    NL: string;
    PL: string;
    RU: string;
  };
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jean Dupont",
    role: "Client",
    content: {
      FR: "J'ai acheté ma voiture chez Auto Adi et je suis très satisfait. Le processus a été simple, le prix était compétitif, et la voiture est exactement ce que je cherchais. Le service client était exceptionnel.",
      EN: "I bought my car from Auto Adi and I'm very satisfied. The process was simple, the price was competitive, and the car is exactly what I was looking for. Customer service was exceptional.",
      ES: "Compré mi auto en Auto Adi y estoy muy satisfecho. El proceso fue simple, el precio fue competitivo, y el auto es exactamente lo que estaba buscando. El servicio al cliente fue excepcional.",
      IT: "Ho acquistato la mia auto da Auto Adi e sono molto soddisfatto. Il processo è stato semplice, il prezzo era competitivo e l'auto è esattamente ciò che stavo cercando. Il servizio clienti è stato eccezionale.",
      PT: "Comprei o meu carro na Auto Adi e estou muito satisfeito. O processo foi simples, o preço foi competitivo e o carro é exatamente o que eu estava procurando. O atendimento ao cliente foi excepcional.",
      RO: "Mi-am cumpărat mașina de la Auto Adi și sunt foarte mulțumit. Procesul a fost simplu, prețul a fost competitiv, iar mașina este exact ceea ce căutam. Serviciul pentru clienți a fost excepțional.",
      DE: "Ich habe mein Auto bei Auto Adi gekauft und bin sehr zufrieden. Der Prozess war einfach, der Preis war wettbewerbsfähig und das Auto ist genau das, was ich gesucht habe. Der Kundenservice war außergewöhnlich.",
      NL: "Ik heb mijn auto bij Auto Adi gekocht en ben erg tevreden. Het proces was eenvoudig, de prijs was concurrerend en de auto is precies wat ik zocht. De klantenservice was uitzonderlijk.",
      PL: "Kupiłem samochód w Auto Adi i jestem bardzo zadowolony. Proces był prosty, cena była konkurencyjna, a samochód jest dokładnie tym, czego szukałem. Obsługa klienta była wyjątkowa.",
      RU: "Я купил свою машину в Auto Adi и очень доволен. Процесс был простым, цена была конкурентоспособной, а автомобиль - именно то, что я искал. Обслуживание клиентов было исключительным."
    },
    rating: 5,
    location: {
      FR: "Paris, France",
      EN: "Paris, France",
      ES: "París, Francia",
      IT: "Parigi, Francia",
      PT: "Paris, França",
      RO: "Paris, Franța",
      DE: "Paris, Frankreich",
      NL: "Parijs, Frankrijk",
      PL: "Paryż, Francja",
      RU: "Париж, Франция"
    },
    date: "15/02/2024"
  },
  {
    id: 2,
    name: "Maria Rossi",
    role: "Client",
    content: {
      FR: "Le service de financement d'Auto Adi m'a permis d'acheter la voiture de mes rêves sans stress financier. Les taux étaient excellents et le processus transparent. Je recommande vivement !",
      EN: "Auto Adi's financing service allowed me to buy the car of my dreams without financial stress. The rates were excellent and the process transparent. I highly recommend!",
      ES: "El servicio de financiamiento de Auto Adi me permitió comprar el auto de mis sueños sin estrés financiero. Las tasas eran excelentes y el proceso transparente. ¡Lo recomiendo encarecidamente!",
      IT: "Il servizio di finanziamento di Auto Adi mi ha permesso di acquistare l'auto dei miei sogni senza stress finanziario. I tassi erano eccellenti e il processo trasparente. Consiglio vivamente!",
      PT: "O serviço de financiamento da Auto Adi permitiu-me comprar o carro dos meus sonhos sem stress financeiro. As taxas eram excelentes e o processo transparente. Recomendo vivamente!",
      RO: "Serviciul de finanțare Auto Adi mi-a permis să cumpăr mașina visurilor mele fără stres financiar. Ratele au fost excelente și procesul transparent. Recomand cu căldură!",
      DE: "Der Finanzierungsservice von Auto Adi ermöglichte es mir, das Auto meiner Träume ohne finanziellen Stress zu kaufen. Die Zinssätze waren ausgezeichnet und der Prozess transparent. Ich empfehle es sehr!",
      NL: "De financieringsservice van Auto Adi stelde me in staat om de auto van mijn dromen te kopen zonder financiële stress. De tarieven waren uitstekend en het proces transparant. Ik raad het ten zeerste aan!",
      PL: "Usługa finansowania Auto Adi pozwoliła mi kupić samochód moich marzeń bez stresu finansowego. Stawki były doskonałe, a proces przejrzysty. Gorąco polecam!",
      RU: "Услуга финансирования Auto Adi позволила мне купить автомобиль моей мечты без финансового стресса. Ставки были отличными, а процесс прозрачным. Я настоятельно рекомендую!"
    },
    rating: 5,
    location: {
      FR: "Milan, Italie",
      EN: "Milan, Italy",
      ES: "Milán, Italia",
      IT: "Milano, Italia",
      PT: "Milão, Itália",
      RO: "Milano, Italia",
      DE: "Mailand, Italien",
      NL: "Milaan, Italië",
      PL: "Mediolan, Włochy",
      RU: "Милан, Италия"
    },
    date: "03/01/2024"
  },
  {
    id: 3,
    name: "Thomas Schmidt",
    role: "Client",
    content: {
      FR: "J'ai repris ma voiture chez Auto Adi et j'ai obtenu un prix bien supérieur à ce que d'autres concessionnaires m'avaient proposé. Le processus a été simple et rapide. Je suis très satisfait de leur service.",
      EN: "I traded in my car at Auto Adi and got a price much higher than what other dealers had offered me. The process was simple and quick. I am very satisfied with their service.",
      ES: "Cambié mi auto en Auto Adi y conseguí un precio mucho más alto de lo que otros concesionarios me habían ofrecido. El proceso fue simple y rápido. Estoy muy satisfecho con su servicio.",
      IT: "Ho permutato la mia auto presso Auto Adi e ho ottenuto un prezzo molto più alto rispetto a quello offerto da altri concessionari. Il processo è stato semplice e veloce. Sono molto soddisfatto del loro servizio.",
      PT: "Troquei o meu carro na Auto Adi e consegui um preço muito superior ao que outros concessionários me tinham oferecido. O processo foi simples e rápido. Estou muito satisfeito com o serviço deles.",
      RO: "Mi-am dat mașina la schimb la Auto Adi și am obținut un preț mult mai mare decât ceea ce îmi oferiseră alți dealeri. Procesul a fost simplu și rapid. Sunt foarte mulțumit de serviciul lor.",
      DE: "Ich habe mein Auto bei Auto Adi eingetauscht und einen viel höheren Preis bekommen als andere Händler mir angeboten hatten. Der Prozess war einfach und schnell. Ich bin mit ihrem Service sehr zufrieden.",
      NL: "Ik heb mijn auto ingeruild bij Auto Adi en kreeg een veel hogere prijs dan wat andere dealers mij hadden aangeboden. Het proces was eenvoudig en snel. Ik ben zeer tevreden over hun service.",
      PL: "Wymieniłem swój samochód w Auto Adi i otrzymałem cenę znacznie wyższą niż ta, którą zaoferowali mi inni dealerzy. Proces był prosty i szybki. Jestem bardzo zadowolony z ich usług.",
      RU: "Я обменял свою машину в Auto Adi и получил цену намного выше, чем предлагали другие дилеры. Процесс был простым и быстрым. Я очень доволен их обслуживанием."
    },
    rating: 5,
    location: {
      FR: "Berlin, Allemagne",
      EN: "Berlin, Germany",
      ES: "Berlín, Alemania",
      IT: "Berlino, Germania",
      PT: "Berlim, Alemanha",
      RO: "Berlin, Germania",
      DE: "Berlin, Deutschland",
      NL: "Berlijn, Duitsland",
      PL: "Berlin, Niemcy",
      RU: "Берлин, Германия"
    },
    date: "20/12/2023"
  },
  {
    id: 4,
    name: "Ana Petrescu",
    role: "Client",
    content: {
      FR: "Excellente expérience d'achat avec Auto Adi. La voiture était en parfait état, exactement comme décrite. Le service après-vente est impeccable. Je n'hésiterai pas à revenir pour mon prochain achat.",
      EN: "Excellent buying experience with Auto Adi. The car was in perfect condition, exactly as described. The after-sales service is impeccable. I won't hesitate to come back for my next purchase.",
      ES: "Excelente experiencia de compra con Auto Adi. El auto estaba en perfectas condiciones, exactamente como se describió. El servicio postventa es impecable. No dudaré en volver para mi próxima compra.",
      IT: "Eccellente esperienza di acquisto con Auto Adi. L'auto era in perfette condizioni, esattamente come descritto. Il servizio post-vendita è impeccabile. Non esiterò a tornare per il mio prossimo acquisto.",
      PT: "Excelente experiência de compra com a Auto Adi. O carro estava em perfeitas condições, exatamente como descrito. O serviço pós-venda é impecável. Não hesitarei em voltar para a minha próxima compra.",
      RO: "Experiență excelentă de cumpărare cu Auto Adi. Mașina era în stare perfectă, exact așa cum a fost descrisă. Serviciul post-vânzare este impecabil. Nu voi ezita să revin pentru următoarea achiziție.",
      DE: "Ausgezeichnetes Kauferlebnis mit Auto Adi. Das Auto war in einwandfreiem Zustand, genau wie beschrieben. Der Kundendienst ist einwandfrei. Ich werde nicht zögern, für meinen nächsten Kauf zurückzukommen.",
      NL: "Uitstekende koopervaring bij Auto Adi. De auto was in perfecte staat, precies zoals beschreven. De after-sales service is onberispelijk. Ik zal niet aarzelen om terug te komen voor mijn volgende aankoop.",
      PL: "Doskonałe doświadczenie zakupowe z Auto Adi. Samochód był w idealnym stanie, dokładnie tak jak opisano. Obsługa posprzedażowa jest nienaganna. Nie zawaham się wrócić po następny zakup.",
      RU: "Отличный опыт покупки в Auto Adi. Автомобиль был в отличном состоянии, точно как описано. Послепродажное обслуживание безупречно. Я без колебаний вернусь за следующей покупкой."
    },
    rating: 5,
    location: {
      FR: "Bucarest, Roumanie",
      EN: "Bucharest, Romania",
      ES: "Bucarest, Rumania",
      IT: "Bucarest, Romania",
      PT: "Bucareste, Roménia",
      RO: "București, România",
      DE: "Bukarest, Rumänien",
      NL: "Boekarest, Roemenië",
      PL: "Bukareszt, Rumunia",
      RU: "Бухарест, Румыния"
    },
    date: "05/11/2023"
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, translate } = useLanguage();

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const sectionTitle = {
    FR: "Ce que nos clients disent",
    EN: "What our customers say",
    ES: "Lo que dicen nuestros clientes",
    IT: "Cosa dicono i nostri clienti",
    PT: "O que dizem os nossos clientes",
    RO: "Ce spun clienții noștri",
    DE: "Was unsere Kunden sagen",
    NL: "Wat onze klanten zeggen",
    PL: "Co mówią nasi klienci",
    RU: "Что говорят наши клиенты"
  };

  const sectionSubtitle = {
    FR: "Des avis authentiques de clients satisfaits",
    EN: "Authentic reviews from satisfied customers",
    ES: "Opiniones auténticas de clientes satisfechos",
    IT: "Recensioni autentiche di clienti soddisfatti",
    PT: "Avaliações autênticas de clientes satisfeitos",
    RO: "Recenzii autentice de la clienți mulțumiți",
    DE: "Authentische Bewertungen von zufriedenen Kunden",
    NL: "Authentieke beoordelingen van tevreden klanten",
    PL: "Autentyczne recenzje od zadowolonych klientów",
    RU: "Подлинные отзывы от довольных клиентов"
  };

  const viewAllText = {
    FR: "Voir tous les avis",
    EN: "View all reviews",
    ES: "Ver todas las opiniones",
    IT: "Visualizza tutte le recensioni",
    PT: "Ver todas as avaliações",
    RO: "Vezi toate recenziile",
    DE: "Alle Bewertungen anzeigen",
    NL: "Bekijk alle beoordelingen",
    PL: "Zobacz wszystkie recenzje",
    RU: "Посмотреть все отзывы"
  };

  const clientText = {
    FR: "Client",
    EN: "Customer",
    ES: "Cliente",
    IT: "Cliente",
    PT: "Cliente",
    RO: "Client",
    DE: "Kunde",
    NL: "Klant",
    PL: "Klient",
    RU: "Клиент"
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {translate('testimonialTitle', sectionTitle)}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {translate('testimonialSubtitle', sectionSubtitle)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className={`overflow-hidden shadow-md transition-shadow hover:shadow-lg ${currentIndex === index ? 'ring-2 ring-brand-blue' : ''}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{translate('client', clientText)}</p>
                  </div>
                  <Quote className="text-brand-blue h-6 w-6 flex-shrink-0" />
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-4">
                  {testimonial.content[language]}
                </p>
                
                <div className="mt-auto">
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{testimonial.location[language]}</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full w-8 h-8 p-0 ${currentIndex === index ? 'bg-brand-blue text-white' : 'text-gray-400'}`}
            >
              {index + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors">
            {translate('viewAllReviews', viewAllText)}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
