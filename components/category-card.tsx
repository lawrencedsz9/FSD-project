import Link from "next/link"
import { Laptop, Shirt, Lamp, Sparkles, Dumbbell, Watch } from "lucide-react"

interface CategoryCardProps {
  title: string
  image: string
  href: string
  icon: string
}

export default function CategoryCard({ title, image, href, icon }: CategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "laptop":
        return <Laptop className="h-6 w-6" />
      case "shirt":
        return <Shirt className="h-6 w-6" />
      case "lamp":
        return <Lamp className="h-6 w-6" />
      case "sparkles":
        return <Sparkles className="h-6 w-6" />
      case "dumbbell":
        return <Dumbbell className="h-6 w-6" />
      case "watch":
        return <Watch className="h-6 w-6" />
      default:
        return null
    }
  }

  return (
    <Link href={href} className="group">
      <div className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-sm transition-all hover:shadow-md text-center">
        <div className="relative h-24 w-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <div className="text-gray-600 group-hover:text-rose-600 transition-colors">{getIcon()}</div>
        </div>
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors">{title}</h3>
      </div>
    </Link>
  )
}
