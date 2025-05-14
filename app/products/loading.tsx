export default function ProductsLoading() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-4 md:mb-0" />
          <div className="flex gap-4">
            <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card p-4">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-white/10 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 