import React, { useEffect, useMemo, useState } from "react";
import {
  useCreateWorkflowFolderMutation,
  useCreateWorkflowMutation,
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
  DialogTrigger,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { workFolders } from "@/src/app/dashboard/workflows/_view/_columns/worklist-folder.tsx";
import { WorkFoldersDataTable } from "@/src/app/dashboard/workflows/_view/_data-table/worklist-folder-data-table.tsx";
import { CreateWorkFolderSchema, EditWorkFolderSchema } from "@/src/schemas";
import WorkflowTemplate from "@/src/app/dashboard/workflows/_components/_cards/workflow-template-card.tsx";
import { useRouter } from "next/navigation";
import type { WorkflowProp } from "@/src/app/dashboard/workflows/_tabs/workflow.tsx";
interface WorkflowListProp {
  switchToWorkflowView: (workflowData: WorkflowProp) => void;
}
export default function WorkflowList({
  switchToWorkflowView,
}: WorkflowListProp) {
  const [currentPath, setCurrentPath] = useState("");

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

  const templates = [
    {
      id: 1,
      title: "Scratch ",
      description: "Build everything from scratch",
    },
    {
      id: 2,
      title: "SMS Template",
      description:
        "A concise and efficient SMS template crafted to simplify your text messaging. This template is designed to help you quickly create clear and impactful messages, ideal for promotions, reminders, or personalized updates.",
    },
    {
      id: 3,
      title: "Email Template",
      description:
        ' "A customizable email template designed to streamline your communication. This template allows you to easily craft professional and consistent emails, with predefined layouts and styling that can be tailored to fit various messaging needs.',
    },
    /*    {
      id: 4,
      title: "Email Template",
      description:
        ' "A customizable email template designed to streamline your communication. This template allows you to easily craft professional and consistent emails, with predefined layouts and styling that can be tailored to fit various messaging needs.',
    },
    {
      id: 5,
      title: "Email Template",
      description:
        ' "A customizable email template designed to streamline your communication. This template allows you to easily craft professional and consistent emails, with predefined layouts and styling that can be tailored to fit various messaging needs.',
    },*/
  ];

  const createFlow = async (template: string) => {
    const response = await createWorkflow({
      id: currentPath,
      template_id: template,
    }).unwrap();
    if (response.name) {
      const workflowData = data(response._id, response.name);
      switchToWorkflowView(workflowData);
      //  console.log(currentPath, template);
    }
  };

  const onSubmit = async () => {
    try {
      createForm.setValue("id", currentPath);
      const response = await createFolder(createForm.getValues()).unwrap();
      if ((response as { created_at: string }).created_at) {
        // Handle successful submission
        toast({
          title: "Workflow Folder Created Successfully",
          description: "New workflow has been created.",
          variant: "success",
        });
        form.reset();
      } else {
        // Handle submission failure
        toast({
          title: "Creation of Workflow Failed",
          description: "Failed to create workflow",
          variant: "destructive",
        });
      }
      setOpen(!open);
    } catch (error) {
      toast({
        title: "Create Workflow Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const [createFolder] = useCreateWorkflowFolderMutation();

  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  //const [displayedTemplates, setdisplayedTemplates] = useState(templates);
  const displayedTemplates = templates;

  const filteredTemplates = useMemo(() => {
    return displayedTemplates.filter((template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, displayedTemplates]);

  const createForm = useForm<z.infer<typeof CreateWorkFolderSchema>>({
    resolver: zodResolver(CreateWorkFolderSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  /*  const [currentPath, setCurrentPath] = useState<string>(
      "66e13d7740bbc184936f0df3",
  );*/

  const [createWorkflow] = useCreateWorkflowMutation();

  const [fetchWorkflowList, { data: workFolderLists, error, isLoading }] =
    useLazyGetWorkflowListQuery();

  const data = (_id: string, _name: string): WorkflowProp => {
    return {
      workflowID: _id,
      workflowName: _name,
    };
  };

  useEffect(() => {
    fetchWorkflowList({ id: currentPath })
      .unwrap()

      .catch(() => {
        //console.error("Failed to fetch workflow list:", err);
      });
  }, [currentPath, fetchWorkflowList]); // Dependencies array includes currentPath and fetchWorkflowList

  const [isEditOpen, setIsEditOpen] = useState(false);

  const router = useRouter();
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
      //const workflowData = data(_id, _name);
      //switchToWorkflowView(workflowData);
      router.push(`workflows/editor/${_id}`);

      // console.log("This is a workflow");
    }
  };

  const HandleOnEdit = (id: string) => {
    form.setValue("id", id);
    setIsEditOpen(true);
  };

  const form = useForm<z.infer<typeof EditWorkFolderSchema>>({
    resolver: zodResolver(EditWorkFolderSchema),
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
    // console.log(paths[index].name);
    setCurrentPath(paths[index].id);

    const pathsUpToIndex = paths.filter((_, i) => i <= index);
    // console.log("Paths below the index:", pathsUpToIndex);
    setPaths(pathsUpToIndex);

    // If you need to do something with pathsBelowIndex (e.g., update state)
    // setSomeState(pathsBelowIndex);
  };

  return (
    <div>
      <div className="flex w-full justify-between px-8">
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">Workflow List</h4>
          <p className="text-sm text-slate-600">
            A comprehensive overview of your workflows, detailing the latest
            updates and allowing easy access to manage and create new workflows.
          </p>
        </div>
        <div className="flex gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">+ Create Folder</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px]">
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(onSubmit)}>
                  <FormField
                    control={createForm.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col">
                          <DialogTitle className="font-normal">
                            Create folder
                          </DialogTitle>
                          <Separator />
                          <div className="flex items-center">
                            <p className="w-1/4">Folder Name: </p>
                            <Input {...field} />
                          </div>
                          <div className="flex justify-end">
                            <Button className="rounded px-4">Create</Button>
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
                </form>
              </Form>
              <DialogDescription />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white">+ Create Workflow</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1000px] ">
              <DialogTitle className="font-normal">
                Create a Workflow
              </DialogTitle>
              <div className=" space-y-2">
                <Separator />
                <div className="custom-scrollbar h-[700px] space-y-4 overflow-y-scroll border-black bg-slate-100 p-2">
                  <div className="relative w-full gap-4">
                    <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
                    <Input
                      className="w-full rounded pl-10"
                      placeholder="Search Template"
                      type="search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                  </div>
                  {filteredTemplates.map((template) => (
                    <WorkflowTemplate
                      title={template.title}
                      description={template.description}
                      onButtonClick={() => createFlow(template.id.toString())}
                      key={template.id}
                    />
                  ))}
                </div>
              </div>
              <DialogDescription />
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
                  <span>
                    {path.name}
                    {index < paths.length - 1 && " > "}
                  </span>
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
    </div>
  );
}
