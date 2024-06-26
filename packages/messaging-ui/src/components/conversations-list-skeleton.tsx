import { Skeleton } from "@repo/ui/components/ui";

export default function ConversationsListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
        <div className="flex items-center space-x-4" key={index}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
