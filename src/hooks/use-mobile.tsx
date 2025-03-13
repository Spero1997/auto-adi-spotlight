
import * as React from "react"

// Lower the mobile breakpoint slightly to better match common mobile devices
const MOBILE_BREAKPOINT = 640 // Changed from 768 to 640 for better mobile detection

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Function to check if screen is in mobile mode
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      console.log(`Mobile check: width=${window.innerWidth}, isMobile=${mobile}`)
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
