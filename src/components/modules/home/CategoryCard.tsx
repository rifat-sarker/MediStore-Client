import Link from "next/link";

interface Category {
  id: string;
  name: string;
  imageUrl: string | null;
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link 
      href={`/medicines?category=${category.id}`}
      className="group relative overflow-hidden rounded-2xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-300 block hover:-translate-y-1"
    >
      <div className="aspect-square p-6 flex flex-col items-center justify-center text-center space-y-4">
        {category.imageUrl ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-secondary mb-2 group-hover:scale-110 transition-transform duration-500">
            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
            <span className="text-3xl text-muted-foreground">{category.name.charAt(0)}</span>
          </div>
        )}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
