import { DropdownMenuItem } from "@repo/ui/components/ui";

interface EditActionCellProps {
  id: string;
}
export default function EditActionCell(prop: EditActionCellProps) {
  return (
    <div className="inline flex h-8 flex-col items-end">
      <DropdownMenuItem className="h-full w-full cursor-pointer">
        <p>Edit</p>
        {/* <p>Cancel</p> {isLoading ? <LoadingSpinner /> : null}*/}
      </DropdownMenuItem>
    </div>
  );
}
