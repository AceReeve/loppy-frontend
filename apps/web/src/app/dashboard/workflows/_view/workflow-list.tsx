import React, { useState } from "react";
import {
  useEditFolderMutation,
  useGetWorkflowListQuery,
} from "@repo/redux-utils/src/endpoints/workflow.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Form,
  FormField,
  FormItem,
  Input,
  Separator,
  toast,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { workFolders } from "@/src/app/dashboard/workflows/_view/_columns/worklist-folder.tsx";
import { WorkFoldersDataTable } from "@/src/app/dashboard/workflows/_view/_data-table/worklist-folder-data-table.tsx";
import { EditWorkFolderSchema } from "@/src/schemas";

export default function WorkflowList() {
  /*  const workFolderLists = [
    {
      id: 0,
      name: "Developers",
      lastUpdated: "August 25, 2024",
      createdOn: "August 21, 2024",
    },
    {
      id: 1,
      name: "QA",
      lastUpdated: "August 25, 2024",
      createdOn: "August 21, 2024",
    },
    {
      id: 2,
      name: "Front-End",
      lastUpdated: "August 25, 2024",
      createdOn: "August 21, 2024",
    },
  ];*/
  const {
    data: workFolderLists,
    error,
    isLoading,
  } = useGetWorkflowListQuery(undefined);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const HandleOnEdit = (id: string) => {
    form.setValue("id", id);
    setIsEditOpen(true);
  };

  const formSchema = EditWorkFolderSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      folder_name: "",
    },
  });

  const [editWorkFolder] = useEditFolderMutation(undefined);

  const onSubmitEdit = async () => {
    try {
      const response = await editWorkFolder(form.getValues()).unwrap();
      if (response.folder_name) {
        toast({
          title: "Folder renamed successfully",
          variant: "success",
        });
        setIsEditOpen(!isEditOpen);
      } else {
        // Handle submission failure
        toast({
          title: "Folder rename failed",
          variant: "destructive",
        });
      }
    } catch (e: unknown) {
      getErrorMessage(e);
    }
  };

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

  if (isLoading) {
    return (
      <div className="m-auto h-[500px] w-full content-center">
        <div className="m-auto h-[50px] w-[15px] content-center">
          <LoadingSpinner />
        </div>
        <p className="text-center font-nunito text-lg">
          Loading please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  }

  if (!workFolderLists) return null;

  return (
    <div className="space-y-4 p-4">
      <div className="p-4">
        <WorkFoldersDataTable
          columns={workFolders(HandleOnEdit)}
          data={workFolderLists}
          noResultsComponent={NoResultsComponent}
        />
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)}>
              <FormField
                control={form.control}
                name="folder_name"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <DialogTitle className="font-normal">
                        Rename folder
                      </DialogTitle>
                      <Separator />
                      <div className="flex items-center">
                        <p className="w-1/4">Folder Name: </p>
                        <Input {...field} />
                      </div>
                      {/*                          {errors.birthDate ? (
                            <p className="mt-2 text-[0.8rem] font-medium text-error">
                              {errors.birthDate.message}
                            </p>
                          ) : null}*/}
                    </FormItem>
                  );
                }}
              />
              <DialogDescription />

              <div className="flex justify-end">
                <Button className="rounded px-4" type="submit">
                  Rename
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
