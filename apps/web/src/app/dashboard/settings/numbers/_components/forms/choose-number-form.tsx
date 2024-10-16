import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import { Refresh } from "iconsax-react";
import { cn } from "@repo/ui/utils";
import React, { useEffect, useRef, useState } from "react";
import { useLazyGetAvailableLocalNumbersQuery } from "@repo/redux-utils/src/endpoints/numbers.ts";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberType } from "@repo/redux-utils/src/endpoints/enums/numbers.enums.ts";
import { useIsVisible } from "@repo/hooks-and-utils/hooks/use-is-visible";
import PhoneNumbersList from "@/src/app/dashboard/settings/compliance/_components/phone-numbers-list.tsx";
import { countries, states } from "@/src/data/states";
import { type FormComponentProps } from "@/src/types/settings";
import { chooseNumberSchema } from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";

export default function ChooseNumberForm({
  setSaveEnabled,
  id,
  onSubmit,
}: FormComponentProps) {
  const [
    refreshAvailableNumbers,
    { data: availableNumbers, isLoading, isFetching, error },
  ] = useLazyGetAvailableLocalNumbersQuery();

  const ref = useRef<HTMLFormElement | null>(null);
  const isVisible = useIsVisible(ref);

  const form = useForm<z.infer<typeof chooseNumberSchema>>({
    resolver: zodResolver(chooseNumberSchema),
  });

  const [activeTab, setActiveTab] = useState<NumberType>(NumberType.LOCAL);

  const countryCode = form.watch("country");
  const currentState = form.watch("state");
  const areaCodes = currentState
    ? (states[countryCode as keyof typeof states].find(
        (item) => item.value === currentState,
      )?.area_codes ?? [])
    : [];
  const areaCode = form.watch("area_code");
  const selectedNumber = form.watch("selectedNumber");

  useEffect(() => {
    refetch();
  }, [areaCode, currentState, countryCode, activeTab]);

  useEffect(() => {
    if (!isVisible) return;
    form.setValue("type", activeTab as string, { shouldValidate: true });

    if (activeTab === NumberType.LOCAL) {
      setSaveEnabled(form.formState.isValid);
    } else {
      setSaveEnabled(selectedNumber !== "");
    }
  }, [form.formState.isValid, activeTab, selectedNumber, isVisible]);

  function refetch() {
    if (activeTab === NumberType.LOCAL && areaCode && countryCode) {
      void refreshAvailableNumbers({
        type: "local",
        countryCode,
        areaCode,
        limit: "5",
      });
    } else {
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
    if (activeTab === NumberType.LOCAL && (!countryCode || !areaCode))
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
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        className="flex flex-col gap-4"
        id={id}
        ref={ref}
      >
        <Tabs
          onValueChange={(tab) => {
            setActiveTab(tab as NumberType);
          }}
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
