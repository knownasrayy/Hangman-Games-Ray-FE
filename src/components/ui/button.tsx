// src/components/ui/button.tsx (CODE FULL REVISI)

import * as React from "react"

// Kita definisikan manual tipe variant agar TypeScript tidak error
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    // Logika styling sederhana pengganti CVA (Class Variance Authority)
    // agar Anda tidak perlu install library tambahan lagi.
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    let variantStyles = "";
    switch (variant) {
        case "destructive":
            variantStyles = "bg-red-500 text-white hover:bg-red-600";
            break;
        case "secondary":
            variantStyles = "bg-gray-100 text-gray-900 hover:bg-gray-200";
            break;
        case "outline":
            variantStyles = "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
            break;
        case "ghost":
            variantStyles = "hover:bg-accent hover:text-accent-foreground";
            break;
        default: // default
            variantStyles = "bg-slate-900 text-white hover:bg-slate-800";
            break;
    }

    let sizeStyles = "h-10 px-4 py-2"; // default size
    
    // Gabungkan semua class
    const finalClass = `${baseStyles} ${variantStyles} ${sizeStyles} ${className || ""}`;

    return (
      <button
        className={finalClass}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }