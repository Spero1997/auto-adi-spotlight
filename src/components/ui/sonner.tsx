
import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  // Utilisation sécurisée du hook useTheme avec une valeur par défaut
  const { theme = "system" } = useTheme() || { theme: "system" };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black/90 group-[.toaster]:backdrop-blur-lg group-[.toaster]:text-white group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-brand-orange group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-700 group-[.toast]:text-white",
        },
        duration: 5000,
      }}
      {...props}
    />
  )
}

export { Toaster }
