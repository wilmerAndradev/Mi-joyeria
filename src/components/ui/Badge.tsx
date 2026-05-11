import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gold text-black shadow hover:bg-gold/80",
        secondary:
          "border-transparent bg-charcoal text-gold hover:bg-charcoal/80",
        gold:
          "border-transparent bg-gold text-black shadow hover:bg-gold/80",
        destructive:
          "border-transparent bg-red-500 text-black shadow hover:bg-red-500/80",
        outline: "text-gold border-gold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
