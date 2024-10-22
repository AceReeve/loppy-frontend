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
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import React from "react";
import { type generalInfoSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import type { FormComponentProps } from "@/src/types/settings";
import { cities, countries, states } from "@/src/data/states";

export default function GeneralInfo({
  form,
}: FormComponentProps<typeof generalInfoSchema>) {
  if (!form) return null;

  const countryCode = form.watch("country");
  const currentState = form.watch("state");

  return (
    <>
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
          ServiHero.
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="enter-manually">
        <TabsList>
          {/*<TabsTrigger value="find" className="text-sm">*/}
          {/*  Find*/}
          {/*</TabsTrigger>*/}
          <TabsTrigger value="enter-manually" className="text-sm">
            Enter Manually
          </TabsTrigger>
        </TabsList>
        {/*<TabsContent value="find">*/}
        {/*  <div className="flex flex-col gap-4">*/}
        {/*    <div className="flex flex-col gap-2">*/}
        {/*      <Label className="text-sm font-semibold">*/}
        {/*        Find Your Business*/}
        {/*      </Label>*/}
        {/*      <Input type="search" placeholder="Search" />*/}
        {/*      <p className="text-xs text-gray-500">*/}
        {/*        Search by EIN, e.g. 123456789*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</TabsContent>*/}
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
                name="streetAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address 2</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Acme Street 2"
                        {...field}
                      />
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
                            <SelectValue placeholder="Select state" />
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

            {countryCode && currentState ? (
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger variant="outline">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities[countryCode][currentState].map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
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

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP code</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. 85001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
