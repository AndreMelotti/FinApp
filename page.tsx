// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="container mx-auto p-8">
//       <header className="bg-blue-600 text-white py-4">
//         <h1 className="text-4xl font-bold text-center">NUARES</h1>
//       </header>

//       <section className="text-center mt-10">
//         <h2 className="text-3xl font-bold mb-4">Apoio a Refugiados</h2>
//         <p className="text-lg mb-6">
//           Ajudamos refugiados a se integrarem à sociedade capixaba através de acolhimento, educação e oportunidades.
//         </p>
//         <Link href="#contact">
//           {/* <a className="bg-blue-600 text-white py-2 px-4 rounded">Entre em contato</a> */}
//           Entre em contato
//         </Link>
//       </section>

//       <footer id="contact" className="bg-gray-800 text-white py-8 mt-10">
//         <div className="text-center">
//           <p>Contato: contato@ongrefugiadoses.org</p>
//         </div>
//       </footer>
//     </main>
//   );
// }
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Globe, HandshakeIcon, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Globe className="h-6 w-6 mr-2" />
          <span className="font-bold">RefugeWork</span>
        </Link>
        <nav className="ml-auto flex gap-8 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#success-stories">
            Success Stories
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connecting Refugees with Meaningful Employment
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  RefugeWork bridges the gap between skilled refugees and employers, creating opportunities for a better future.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="#job-seekers">I'm Looking for Work</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#employers">I'm an Employer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How RefugeWork Helps</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Briefcase className="h-10 w-10 mb-2" />
                  <CardTitle>Job Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  Our AI-powered platform matches refugee skills and experience with suitable job openings.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 mb-2" />
                  <CardTitle>Support Network</CardTitle>
                </CardHeader>
                <CardContent>
                  Access mentorship, language support, and cultural integration resources to ease the transition.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <HandshakeIcon className="h-10 w-10 mb-2" />
                  <CardTitle>Employer Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  We work with socially responsible employers committed to diversity and inclusion.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="success-stories" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Success Stories</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardContent className="pt-6">
                  <blockquote className="italic">
                    "RefugeWork helped me find a job in my field of expertise within weeks of arriving in my new country. I'm grateful for the opportunity to rebuild my career."
                  </blockquote>
                  <p className="mt-2 font-semibold">- Amira, Software Developer</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <blockquote className="italic">
                    "As an employer, RefugeWork made it easy for us to connect with skilled refugees. We've hired several talented individuals who have greatly contributed to our company."
                  </blockquote>
                  <p className="mt-2 font-semibold">- John, HR Manager</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join RefugeWork Today</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Whether you're seeking employment or looking to hire, RefugeWork is here to help. Take the first step towards a brighter future.
                </p>
              </div>
              <div className="space-y-4">
                <Button asChild size="lg" id="job-seekers">
                  <Link href="/register/job-seeker">Register as a Job Seeker</Link>
                </Button>
                <Button asChild variant="outline" size="lg" id="employers">
                  <Link href="/register/employer">Register as an Employer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 RefugeWork. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#contact">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  )
}