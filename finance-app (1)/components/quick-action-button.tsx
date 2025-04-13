import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface QuickActionButtonProps {
  href: string
  icon: ReactNode
  label: string
}

export function QuickActionButton({ href, icon, label }: QuickActionButtonProps) {
  return (
    <Link href={href}>
      <Button variant="outline" className="w-full">
        {icon}
        {label}
      </Button>
    </Link>
  )
}
