import React, { useEffect, useState } from "react";
import {
  useEditFolderMutation,
  // useGetWorkflowListQuery,
  useLazyGetWorkflowListQuery,
} from "@repo/redux-utils/src/endpoints/workflow.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Breadcrumb,
  BreadcrumbList,
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
  BreadcrumbLink,
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
  const [currentPath, setCurrentPath] = useState("");

  /*
  const {
    data: workFolderLists,
    error,
    isLoading,
  } = useGetWorkflowListQuery({ id: "66e13d7740bbc184936f0df3" });
*/

  interface PathProps {
    id: string;
    name: string;
  }
  const [paths, setPaths] = useState<PathProps[]>([
    {
      id: "",
      name: "Home",
    },
  ]);

  const [fetchWorkflowList, { data: workFolderLists, error, isLoading }] =
    useLazyGetWorkflowListQuery();

  useEffect(() => {
    fetchWorkflowList({ id: currentPath })
      .unwrap()
      .then((result) => {
        // console.log("Fetched result:", result);
      })
      .catch((err: unknown) => {
        //console.error("Failed to fetch workflow list:", err);
      });
  }, [currentPath, fetchWorkflowList]); // Dependencies array includes currentPath and fetchWorkflowList

  const [isEditOpen, setIsEditOpen] = useState(false);

  const onRowClickSubmit = (_id: string, _name: string, type: string) => {
    if (type !== "Workflow") {
      setCurrentPath(_id);

      setPaths((currentPaths) => {
        const newPath = {
          id: _id,
          name: _name,
        };
        return [...currentPaths, newPath];
      });
    } else {
      console.log("This is a workflow");
    }
  };

  const HandleOnEdit = (id: string) => {
    form.setValue("id", id);
    setIsEditOpen(true);
  };

  const formSchema = EditWorkFolderSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const [editWorkFolder] = useEditFolderMutation(undefined);

  const onSubmitEdit = async () => {
    try {
      await editWorkFolder(form.getValues()).unwrap();

      // If no errors are thrown, consider it successful
      toast({
        title: "Folder renamed successfully",
        variant: "success",
      });
      setIsEditOpen(false);
    } catch (e: unknown) {
      toast({
        title: "Folder rename failed",
        variant: "destructive",
        description: "An unknown error occurred",
      });
      getErrorMessage(e);
    }
  };

  //const [currentList, setCurrentList] = useState<GetFolderResponse[]>([]);

  /*
  useEffect(() => {
    if (workFolderLists) {
      setCurrentList(workFolderLists);
    }
  }, [workFolderLists, currentPath]);
*/

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
  const handleClickPath = (index: number) => {
    console.log(paths[index].name);
    setCurrentPath(paths[index].id);

    const pathsUpToIndex = paths.filter((_, i) => i <= index);
    console.log("Paths below the index:", pathsUpToIndex);
    setPaths(pathsUpToIndex);

    // If you need to do something with pathsBelowIndex (e.g., update state)
    // setSomeState(pathsBelowIndex);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="p-4">
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, index) => (
              <BreadcrumbLink
                key={path.id}
                className="cursor-pointer"
                onClick={() => {
                  handleClickPath(index);
                }}
              >
                {path.name + " > "}
              </BreadcrumbLink>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <WorkFoldersDataTable
          columns={workFolders(HandleOnEdit)}
          data={workFolderLists}
          noResultsComponent={NoResultsComponent}
          handleRowOnClick={onRowClickSubmit}
        />
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)}>
              <FormField
                control={form.control}
                name="name"
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
