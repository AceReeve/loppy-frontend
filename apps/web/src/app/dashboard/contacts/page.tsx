"use client";
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@repo/ui/components/ui";
import { ArrowDown2 } from "iconsax-react";
import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useCreateContactMutation } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { CalendarIcon } from "lucide-react";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import moment from "moment";
import ExportContactsDialogForm from "@/src/app/dashboard/contacts/_components/export-contacts-dialog.tsx";
import { CreateContactsFormSchema } from "@/src/schemas";
import ImportContactsDialogContent from "@/src/app/dashboard/contacts/_components/import-contacts-dialog.tsx";
import AllContacts from "./tabs/all-contacts";
import MyContacts from "./tabs/my-contacts";
import UnassignedContacts from "./tabs/unassigned-contacts";

function Page() {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const tabs = [
    {
      label: "All Contacts",
      id: "all-contacts",
      component: AllContacts,
    },
    {
      label: "My contacts",
      id: "my-contacts",
      component: MyContacts,
    },
    {
      label: "Unassigned contacts",
      id: "unassigned-contacts",
      component: UnassignedContacts,
    },
  ];

  const formSchema = CreateContactsFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "0",
      source: "",
      last_campaign_ran: "",
      last_interaction: new Date(),
      tags: [
        {
          tag_name: "",
        },
      ],
    },
  });
  const formReset = () => {
    form.reset();
  };

  const [tagValue, setTagValue] = useState<string[]>([]);

  const options = [
    { label: "ChatGPT", value: "ChatGPT" },
    { label: "Facebook", value: "Facebook" },
    { label: "Twitter", value: "Twitter" },
  ];
  const [createContact, { isLoading }] = useCreateContactMutation();
  const onSubmit = async () => {
    try {
      const formData = form.getValues();
      const newData = {
        ...formData,
        phone_number: parseInt(formData.phone_number),
        tags:
          tagValue.length > 0 ? tagValue.map((tag) => ({ tag_name: tag })) : [],
      };

      const response = await createContact(newData);

      // Check if response has data property
      if (response.data) {
        // Handle successful submission
        setCreateDialogOpen(false);
        toast({
          title: "User Created Successfully",
          description: "New user has been created.",
          variant: "success",
        });
        form.reset();
        setTagValue([]);
      } else if (response.error) {
        // Handle submission failure
        toast({
          title: "Create User Error",
          description:
            //response.error
            //? response.error.toString() :
            "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Create User Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  /*  const onSubmit = async () => {
    const [isPending, startTransition] = useTransition(); // Initialize pending state

    try {
      const formData = form.getValues();
      const newData = {
        ...formData,
        phone_number: parseInt(formData.phone_number),
        lifetime_value: parseInt(formData.lifetime_value),
        tags:
          tagValue.length > 0 ? tagValue.map((tag) => ({ tag_name: tag })) : [],
      };

      console.log(newData);

      startTransition(() => {
        // Start transition when creating contact
        createContact(newData);
        form.forgot-password(); // Reset form after successful contact creation
        console.log("Contact Added");
      });
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };
*/

  return (
    <div className="m-10 rounded-xl bg-card p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="font-poppins text-4xl font-medium text-gray-800">
            Contacts
          </div>
          <div className="mb-2 font-montserrat text-sm font-normal text-gray-500">
            0 contacts
          </div>
        </div>

        <div className="flex items-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 rounded-xl" variant="outline">
                Action
                <ArrowDown2 size={12} variant="Bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled>Edit</DropdownMenuItem>
              <DropdownMenuItem disabled>Delete</DropdownMenuItem>
              <DropdownMenuItem disabled>Send Message</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog onOpenChange={setImportDialogOpen} open={importDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl" variant="outline">
                Import
              </Button>
            </DialogTrigger>
            <ImportContactsDialogContent setOpen={setImportDialogOpen} />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl" variant="outline">
                Export
              </Button>
            </DialogTrigger>
            <ExportContactsDialogForm />
          </Dialog>

          <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">Create Contact</Button>
            </DialogTrigger>
            <DialogContent onCloseAutoFocus={formReset}>
              <DialogHeader>
                <DialogTitle>Create New Contact</DialogTitle>
              </DialogHeader>

              {isLoading ? (
                <div className="m-auto h-[200px] w-full content-center">
                  <div className="m-auto h-[50px] w-[15px] content-center">
                    <LoadingSpinner />
                  </div>
                  <p className="text-center font-nunito text-lg">
                    Loading please wait...
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="custom-scrollbar grid max-h-[500px] gap-2 overflow-auto px-3">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="First Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="Last Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="servi@gmail.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="Phone Number"
                                  {...field}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Source</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="Source"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {/* <FormField
                        control={form.control}
                        name="lifetime_value"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Lifetime Value</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="Lifetime Value"
                                  {...field}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />*/}

                      <FormField
                        control={form.control}
                        name="last_campaign_ran"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Last Campaign Ran</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  placeholder="Last Campaign Ran"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="last_interaction"
                        render={({ field }) => {
                          return (
                            /*                        <FormItem>
                              <FormLabel>Last Interaction</FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete={"off"}
                                  placeholder="2020-07-10 15:00:00.000"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
*/
                            <FormItem className="flex flex-col">
                              <FormLabel className="my-2">
                                Last Interaction
                              </FormLabel>
                              <Popover
                                onOpenChange={setCalendarOpen}
                                open={calendarOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full pl-3 text-left font-normal"
                                    >
                                      {moment(field.value).format("L")}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    //onSelect={field.onChange}
                                    onSelect={(date) => {
                                      field.onChange(date);
                                      setCalendarOpen(!calendarOpen); // Close the calendar after selecting a date
                                    }}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <MultiSelector
                        values={tagValue}
                        onValuesChange={setTagValue}
                        loop={false}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select your framework" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {options.map((option) => (
                              <MultiSelectorItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </div>
                    <Button className="mt-2 w-full" type="submit">
                      Submit
                    </Button>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs className="mt-8 w-full" defaultValue={tabs[0].id}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-2">
          {tabs.map((tab) => {
            const TabComponent = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <TabComponent />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

export default Page;
