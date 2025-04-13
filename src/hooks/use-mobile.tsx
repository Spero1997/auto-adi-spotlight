
import * as React from "react"

// Réduire légèrement le seuil mobile pour mieux correspondre aux appareils mobiles courants
const MOBILE_BREAKPOINT = 640 // Changé de 768 à 640 pour une meilleure détection mobile

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Fonction pour vérifier si l'écran est en mode mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      console.log(`Mobile check: width=${window.innerWidth}, isMobile=${mobile}`)
    }
    
    // Vérifier immédiatement lorsque le composant est monté
    checkMobile()
    
    // Ajouter un écouteur d'événements pour les changements de taille d'écran
    window.addEventListener("resize", checkMobile)
    
    // Nettoyer l'écouteur d'événements lorsque le composant est démonté
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
