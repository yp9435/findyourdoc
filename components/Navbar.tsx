import Link from "next/link"
import { Heart } from "lucide-react"

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          <Link href="/doctors" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-black" fill="black" strokeWidth={1} />
            <span className="text-xl font-bold">FindyourDoc</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
