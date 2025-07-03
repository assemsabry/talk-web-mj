"use client"

import { useTheme } from "next-themes"
import Image from "next/image"

export default function Loading() {
  const { theme } = useTheme()

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="pulse-logo">
        <Image src="/talk-logo.png" alt="Talk Logo" width={150} height={150} className="rounded-3xl" priority />
      </div>
    </div>
  )
}
