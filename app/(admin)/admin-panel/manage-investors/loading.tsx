import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      {/* AdminSideNavbar */}
      <div className="w-[200px] hidden sm:block">
        <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-6" />

          {/* Table Header and Refresh Button */}
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-1 sm:p-0">
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead className="bg-gray-200 dark:bg-black">
                <tr>
                  {[...Array(4)].map((_, idx) => (
                    <th
                      key={idx}
                      className="border border-gray-400 p-2 sm:p-3 xl:p-4"
                    >
                      <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border border-gray-400 text-center"
                  >
                    {[...Array(4)].map((_, colIdx) => (
                      <td
                        key={colIdx}
                        className="border border-gray-400 p-2 sm:p-3 xl:p-4"
                      >
                        <Skeleton className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
