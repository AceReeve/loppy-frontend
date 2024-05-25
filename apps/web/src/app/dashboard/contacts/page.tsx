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
} from "@repo/ui/components/ui";
import { ArrowDown2 } from "iconsax-react";
import { z } from "zod";
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
import { useState } from "react";
import ImportContactsDialogContent from "@/src/app/dashboard/contacts/_components/import-contacts-dialog.tsx";
import { useCreateContactMutation } from "@/src/endpoints/contacts.ts";
import UnassignedContacts from "./tabs/unassigned-contacts";
import MyContacts from "./tabs/my-contacts";
import AllContacts from "./tabs/all-contacts";

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

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "Invalid Email Address",
    }),
    phone_number: z.number().min(11, {
      message: "Invalid Phone Number",
    }),
    source: z.string().min(2, {
      message: "Source must be ",
    }),
    lifetime_value: z.number().min(1, {
      message: "Life Time Value is Invalid must be at least 2 characters.",
    }),
    last_campaign_ran: z.string().min(1, {
      message: "Invalid must be at least 2 characters.",
    }),
    last_interaction: z.string().min(1, {
      message: "Invalid must be at least 2 characters.",
    }),
    tag_name: z.string().min(1, {
      message: "Invalid must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone_number: 0,
      source: "",
      lifetime_value: 0,
      last_campaign_ran: "",
      last_interaction: "",
      tags: [
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleSubmit = () => {};

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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Contact</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="grid gap-2 max-h-[500px] px-5 overflow-auto custom-scrollbar">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
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
                              <Input placeholder="Source" {...field} />
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
                              <Input placeholder="Lifetime Value" {...field} />
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
                                placeholder="Last Interaction"
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

                  <Button className="mt-2" type="submit">
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
