import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface QuickActionButtonProps {
  href: string
  icon: ReactNode
  label: string
}

export function QuickActionButton({ href, icon, label }: QuickActionButtonProps) {
  return (
    <Button variant="outline" className="w-full justify-start" asChild>
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  )
}
