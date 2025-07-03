import Image from "next/image"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Floating Bubbles Background */}
      <div className="floating-bubbles">
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "15%", left: "15%", animationDelay: "0s" }}
        />
        <div
          className="bubble"
          style={{ width: "120px", height: "120px", top: "25%", right: "20%", animationDelay: "1s" }}
        />
        <div
          className="bubble"
          style={{ width: "60px", height: "60px", top: "65%", left: "25%", animationDelay: "2s" }}
        />
        <div
          className="bubble"
          style={{ width: "140px", height: "140px", bottom: "25%", right: "15%", animationDelay: "3s" }}
        />
        <div
          className="bubble"
          style={{ width: "90px", height: "90px", bottom: "45%", left: "75%", animationDelay: "4s" }}
        />
      </div>

      <div className="flex flex-col items-center gap-8 z-10">
        {/* Logo */}
        <div className="relative">
          <Image
            src="/talk-logo-new.png"
            alt="Talk"
            width={120}
            height={120}
            className="rounded-3xl pulse-logo"
            priority
          />
        </div>

        {/* App Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">Talk</h1>
          <p className="text-muted-foreground text-lg">Connect, Share, Discover</p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
