import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 pt-24 text-foreground font-rubik">
      <div className="w-full max-w-3xl rounded-lg bg-card/80 p-8 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
        {/* Title */}
        <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-6" />

        {/* Table of Contents */}
        <div className="mb-8 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-3" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div key={idx} className="scroll-mt-20">
              <Skeleton className="h-6 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-3" />
              <Skeleton className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700 mb-2" />
              <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-2" />
              {idx % 2 === 0 && (
                <div className="my-2 space-y-2 pl-6">
                  {[1, 2, 3].map((_, subIdx) => (
                    <Skeleton
                      key={subIdx}
                      className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
