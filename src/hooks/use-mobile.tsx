
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Fonction pour vérifier si l'écran est en mode mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Vérifier immédiatement au montage du composant
    checkMobile()
    
    // Ajouter un écouteur d'événement pour les changements de taille d'écran
    window.addEventListener("resize", checkMobile)
    
    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
