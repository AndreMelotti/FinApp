import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to My Next.js Application
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  A modern web application built with Next.js, React, and Tailwind CSS. Fast, responsive, and
                  user-friendly.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Documentation</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-square">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  alt="App Screenshot"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our application comes with everything you need to build modern web applications.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="p-2 bg-primary/10 rounded-full">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of users who are already using our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 My Next.js App. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Server Components",
    description: "Leverage React Server Components for improved performance and reduced client-side JavaScript.",
    icon: CheckCircle2,
  },
  {
    title: "Fast Refresh",
    description: "See your changes instantly with Next.js Fast Refresh. No more waiting for rebuilds.",
    icon: CheckCircle2,
  },
  {
    title: "API Routes",
    description: "Build API endpoints easily with Next.js API routes. Perfect for backend functionality.",
    icon: CheckCircle2,
  },
  {
    title: "TypeScript Support",
    description: "First-class TypeScript support for type safety and better developer experience.",
    icon: CheckCircle2,
  },
  {
    title: "Image Optimization",
    description: "Automatic image optimization with the Next.js Image component for better performance.",
    icon: CheckCircle2,
  },
  {
    title: "Internationalization",
    description: "Built-in internationalization features to support multiple languages and regions.",
    icon: CheckCircle2,
  },
]
