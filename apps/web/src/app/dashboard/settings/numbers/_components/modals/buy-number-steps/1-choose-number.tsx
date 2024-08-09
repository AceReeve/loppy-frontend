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
import React, { useEffect, useState } from "react";
import { type z } from "zod";
import { useLazyGetAvailableLocalNumbersQuery } from "@repo/redux-utils/src/endpoints/phone-numbers.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { Refresh } from "iconsax-react";
import { cn } from "@repo/ui/utils";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import PhoneNumbersList from "@/src/app/dashboard/settings/compliance/_components/phone-numbers-list.tsx";
import type { StepComponentProps } from "@/src/types/settings";
import { countries, states } from "@/src/data/states/index.ts";
import { chooseNumberSchema } from "../../schemas/buy-number-schemas.ts";

export default function ChooseNumber({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const [activeTab, setActiveTab] = useState("local-number");
  const form = useForm<z.infer<typeof chooseNumberSchema>>({
    resolver: zodResolver(chooseNumberSchema),
  });
  const [
    refreshAvailableNumbers,
    { data: availableNumbers, isLoading, isFetching, error },
  ] = useLazyGetAvailableLocalNumbersQuery();

  const countryCode = form.watch("country");
  const currentState = form.watch("state");
  const areaCodes = currentState
    ? (states[countryCode as keyof typeof states].find(
        (item) => item.value === currentState,
      )?.area_codes ?? [])
    : [];
  const areaCode = form.watch("area_code");
  const selectedNumber = form.watch("selectedNumber");

  const onSubmit = (data: z.infer<typeof chooseNumberSchema>) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  };

  useEffect(() => {
    refetch();
  }, [areaCode, currentState, countryCode, activeTab]);

  useEffect(() => {
    if (activeTab === "local-number") {
      setSaveEnabled(form.formState.isValid);
    } else {
      setSaveEnabled(selectedNumber !== "");
    }
  }, [form.formState.isValid, activeTab, selectedNumber]);

  function refetch() {
    if (activeTab === "local-number" && areaCode && countryCode) {
      void refreshAvailableNumbers({
        type: "local",
        countryCode,
        areaCode,
        limit: "5",
      });
    } else if (activeTab === "toll-free-number") {
      void refreshAvailableNumbers({
        type: "tollFree",
        countryCode: "US",
        limit: "10",
      });
    }

    form.setValue("selectedNumber", "", { shouldValidate: true });
  }

  function renderAvailableNumbers() {
    if (isLoading) return <LoadingSpinner />;
    if (!availableNumbers) return null;
    if (activeTab === "local-number" && (!countryCode || !areaCode))
      return null;

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">Choose a number</div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isLoading}
            onClick={() => {
              refetch();
            }}
          >
            <Refresh size={12} className={cn(isFetching && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {!isFetching ? (
          <PhoneNumbersList
            className="mt-4"
            dataSet={availableNumbers}
            onValueChange={(value) => {
              form.setValue("selectedNumber", value, {
                shouldValidate: true,
              });
            }}
          />
        ) : null}
      </div>
    );
  }

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
        <Tabs
          defaultValue="local-number"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList>
            <TabsTrigger value="local-number" className="text-sm">
              Local number
            </TabsTrigger>
            <TabsTrigger value="toll-free-number" className="text-sm">
              Toll-Free number
            </TabsTrigger>
          </TabsList>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            </Alert>
          ) : null}
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

              {countryCode ? (
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
                              {states[countryCode as keyof typeof states].map(
                                (state) => (
                                  <SelectItem
                                    key={state.value}
                                    value={state.value}
                                  >
                                    {state.value} - {state.label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              {currentState && areaCodes.length ? (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="area_code"
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
                              {areaCodes.map((code) => (
                                <SelectItem key={code} value={code.toString()}>
                                  {currentState} - {code}
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
              ) : null}

              {renderAvailableNumbers()}
            </div>
          </TabsContent>
          <TabsContent value="toll-free-number">
            {renderAvailableNumbers()}
          </TabsContent>
        </Tabs>
        {availableNumbers?.length && !isFetching ? (
          <span className="text-sm text-gray-600">
            Today you will be charged $4.08 for the discounted pro-rated cost of
            a new number.
          </span>
        ) : null}
      </form>
    </Form>
  );
}
