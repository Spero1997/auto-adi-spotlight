
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Function to check if screen is in mobile mode
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Check immediately when component mounts
    checkMobile()
    
    // Add event listener for screen size changes
    window.addEventListener("resize", checkMobile)
    
    // Cleanup event listener when component unmounts
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
