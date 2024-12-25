// src/app/page.tsx
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"



export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold">Qontext</h1>
          <p className="mt-4">Create personalized resumes tailored to each job application</p>
        </div>
      </main>
    );
  }
