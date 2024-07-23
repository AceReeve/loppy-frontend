import {
  Alert,
  AlertDescription,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Label,
  Form,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import React, { useEffect } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { StepComponentProps } from "@/src/types/settings";
import { generalInfoSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";

export default function GeneralInfo({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
  });
  const onSubmit = (data: z.infer<typeof generalInfoSchema>) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  };

  useEffect(() => {
    setSaveEnabled(form.formState.isValid);
  }, [form.formState.isValid]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            If your business is US-based and has an EIN, provide the EIN to get
            access to higher messaging{" "}
            <a href="/" className="text-primary">
              limits on Local and Toll-Free numbers
            </a>
            .
            <br />
            <br />
            EIN (Employer Identification Number) is required to register with
            Salesmsg.
          </AlertDescription>
        </Alert>
        <Tabs defaultValue="find">
          <TabsList>
            <TabsTrigger value="find" className="text-sm">
              Find
            </TabsTrigger>
            <TabsTrigger value="enter-manually" className="text-sm">
              Enter Manually
            </TabsTrigger>
          </TabsList>
          <TabsContent value="find">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">
                  Find Your Business
                </Label>
                <Input type="search" placeholder="Search" />
                <p className="text-xs text-gray-500">
                  Search by EIN, e.g. 123456789
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="enter-manually" className="min-h-56">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger variant="outline">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="mx">Mexico</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="ein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EIN</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="EIN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Business name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="streetAddress1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address 1</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g. Acme Street 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g. Mooselookmeguntic"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger variant="outline">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ut">UT - Utah</SelectItem>
                            <SelectItem value="ca">CA - California</SelectItem>
                            <SelectItem value="ny">NY - New York</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g. 85001"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
