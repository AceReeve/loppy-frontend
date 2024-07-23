import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import React, { useEffect } from "react";
import { type z } from "zod";
import PhoneNumbersList from "@/src/app/dashboard/settings/compliance/_components/phone-numbers-list.tsx";
import type { StepComponentProps } from "@/src/types/settings";
import { chooseNumberSchema } from "../../schemas/business-profile-schemas.ts";

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  // Add more countries as needed
];

const states = [
  { value: "ut", label: "UT - Utah" },
  { value: "ca", label: "CA - California" },
  { value: "ny", label: "NY - New York" },
  // Add more states as needed
];

const areaCodes = [
  { value: "801", label: "Utah - 801" },
  { value: "385", label: "Utah - 385" },
  { value: "213", label: "California - 213" },
  // Add more area codes as needed
];

export default function ChooseNumber({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const form = useForm<z.infer<typeof chooseNumberSchema>>({
    resolver: zodResolver(chooseNumberSchema),
  });

  const onSubmit = (data: z.infer<typeof chooseNumberSchema>) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  };

  useEffect(() => {
    // eslint-disable-next-line no-console -- will update later
    console.log(form.getValues("selectedNumber"));
  }, [form.getValues("selectedNumber")]);

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
          <AlertTitle className="flex w-full justify-between text-sm font-semibold">
            Get your business number
            <Button
              asChild
              variant="outline"
              size="sm"
              className="px-2 py-0 text-gray-500"
            >
              <a href="/">Learn more</a>
            </Button>
          </AlertTitle>
          <AlertDescription>
            Local numbers will require verification of your business
          </AlertDescription>
        </Alert>
        <Tabs defaultValue="local-number">
          <TabsList>
            <TabsTrigger value="local-number" className="text-sm">
              Local number
            </TabsTrigger>
            <TabsTrigger value="toll-free-number" className="text-sm">
              Toll-Free number
            </TabsTrigger>
          </TabsList>
          <TabsContent value="local-number">
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
                            {countries.map((country) => (
                              <SelectItem
                                key={country.value}
                                value={country.value}
                              >
                                {country.label}
                              </SelectItem>
                            ))}
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
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
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
                  name="areaCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area Code</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger variant="outline">
                            <SelectValue placeholder="Select an area code" />
                          </SelectTrigger>
                          <SelectContent>
                            {areaCodes.map((areaCode) => (
                              <SelectItem
                                key={areaCode.value}
                                value={areaCode.value}
                              >
                                {areaCode.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*{form.getValues("areaCode") ? (*/}
              <PhoneNumbersList
                onValueChange={(value) => {
                  form.setValue("selectedNumber", value, {
                    shouldValidate: true,
                  });
                }}
              />
              {/*) : null}*/}
            </div>
          </TabsContent>
          <TabsContent value="toll-free-number" className="min-h-56">
            No content yet
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
