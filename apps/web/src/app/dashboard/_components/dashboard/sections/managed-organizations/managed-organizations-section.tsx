import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui";
import { organizationsMockData } from "@/src/app/dashboard/_components/dashboard/sections/managed-organizations/managed-organizations-mock-data.ts";
import { DataTable } from "@/src/components/data-table";
import { managedOrganizationsColumns } from "@/src/app/dashboard/_components/dashboard/sections/managed-organizations/managed-organizations-columns.tsx";

const NoResultsComponent = (
  <div className="flex w-full flex-col items-center justify-center px-4 py-28">
    <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
      Time to get organized
    </div>
    <div className="mt-4 max-w-[641px] text-center font-nunito text-sm font-normal leading-normal text-gray-700">
      Start by giving Cuboid data to work with, like contacts. After, you can
      sort search, and filter to find to find what you need and hide what you
      don’t.
    </div>
    <img
      className="h-[149px] w-[126px]"
      src="/assets/icons/icon-no-data-contacts.svg"
      alt=""
    />
  </div>
);

export default function ManagedOrganizationsSection() {
  // const [isLoading, setIsLoading] = useState(false);

  // if (isLoading) {
  //   return (
  //     <div className="m-auto h-[500px] w-full content-center">
  //       <div className="m-auto h-[50px] w-[15px] content-center">
  //         <LoadingSpinner />
  //       </div>
  //       <p className="text-center font-nunito text-lg">
  //         Loading please wait...
  //       </p>
  //     </div>
  //   );
  // }

  // if (error) {
  //     return (
  //         <Alert variant="destructive">
  //             <AlertCircle className="h-4 w-4" />
  //             <AlertTitle>Error</AlertTitle>
  //             <AlertDescription>{getErrorMessage(error)}</AlertDescription>
  //         </Alert>
  //     );
  // }

  // if (!data) return null;
  return (
    <Card className="relative col-span-full">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Managed Organizations</CardTitle>

        <Button className="w-[100px]" variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="flex gap-4">
        <DataTable
          columns={managedOrganizationsColumns}
          data={organizationsMockData} // Just use 'contacts' directly
          noResultsComponent={NoResultsComponent}
          enablePagination={false}
        />
      </CardContent>
    </Card>
  );
}
