import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-5 w-5" fill="white" stroke="black" />
          <span className="text-sm">Created by Yeshaswi 2025</span>
          <Heart className="h-5 w-5" fill="black" stroke="black" />
        </div>
      </div>
    </footer>
  )
}
