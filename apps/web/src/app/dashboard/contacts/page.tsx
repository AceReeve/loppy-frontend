"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
  ToastAction,
} from "@repo/ui/components/ui";
import { ArrowDown2 } from "iconsax-react";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form.tsx";

import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/src/components/ui/multiselect.tsx";
import React, { useState } from "react";
import ImportContactsDialogContent from "@/src/app/dashboard/contacts/_components/import-contacts-dialog.tsx";
import { useCreateContactMutation } from "@/src/endpoints/contacts.ts";
import { CreateContactsFormSchema } from "@/src/schemas";
import UnassignedContacts from "./tabs/unassigned-contacts";
import MyContacts from "./tabs/my-contacts";
import AllContacts from "./tabs/all-contacts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

function Page() {
  const [importDialogOpen, setImportDialogOpen] = useState(false);

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

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
  );
  const formSchema = CreateContactsFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: 0,
      source: "",
      lifetime_value: 0,
      last_campaign_ran: "",
      last_interaction: "",
      tag: [
        {
          tag_name: "",
        },
      ],
    },
  });

  const [value, setValue] = useState<string[]>([]);
  const options = [
    { label: "ChatGPT", value: "ChatGPT" },
    { label: "Facebook", value: "Facebook" },
    { label: "Twitter", value: "Twitter" },
  ];

  const [createContact, { data: contactData, isError, isLoading }] =
    useCreateContactMutation();

  const onSubmit = async () => {
    try {
      const formData = form.getValues();
      console.log(formData);
      await createContact(formData);
      if (isLoading) {
        console.log("Contact Posting");
      }
      if (isError) {
        console.log("Error Posting " + isError);
      }
      if (!form.formState.isSubmitting) {
        form.reset();
      }
      if (!contactData) {
        console.log("Contact Added");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
    } finally {
      form.reset();
    }
  };

  const formReset = () => {
    form.reset();
  };

  return (
    <div className="p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
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
              <Button className="rounded-xl">Create Contact</Button>
            </DialogTrigger>
            <DialogContent onCloseAutoFocus={formReset}>
              <DialogHeader>
                <DialogTitle>Create New Contact</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-2 max-h-[500px] px-3 overflow-auto custom-scrollbar">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete={"off"}
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
                                autoComplete={"off"}
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
                                autoComplete={"off"}
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
                                autoComplete={"off"}
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
                                autoComplete={"off"}
                                placeholder="Source"
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
                      name="lifetime_value"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Lifetime Value</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete={"off"}
                                placeholder="Lifetime Value"
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
                      name="last_campaign_ran"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Last Campaign Ran</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete={"off"}
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
                          <FormItem>
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
                        );
                      }}
                    />

                    <MultiSelector
                      values={value}
                      onValuesChange={setValue}
                      loop={false}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select your framework" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {options.map((option, i) => (
                            <MultiSelectorItem key={i} value={option.value}>
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
