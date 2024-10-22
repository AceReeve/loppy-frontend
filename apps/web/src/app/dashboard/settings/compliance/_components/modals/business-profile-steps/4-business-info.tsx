import React from "react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui";
import type { FormComponentProps } from "@/src/types/settings";
import { type businessInfoSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import {
  BusinessIndustries,
  BusinessRegionsOfOperation,
  BusinessTypes,
} from "@/src/app/dashboard/settings/compliance/_components/constants/settings-compliance.const.ts";

export default function BusinessInfo({
  form,
}: FormComponentProps<typeof businessInfoSchema>) {
  if (!form) return null;

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger variant="outline">
                    <SelectValue placeholder="e.g. LLC" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BusinessTypes).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
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
          name="businessIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Industry</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger variant="outline">
                    <SelectValue placeholder="e.g. Online" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BusinessIndustries).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
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
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="e.g. https://example.com"
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
          name="socialMediaProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Profile (optional)</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="e.g. https://facebook.com/example"
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
          name="businessRegionsOfOperations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Regions of Operations</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger variant="outline">
                    <SelectValue placeholder="e.g. Online" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BusinessRegionsOfOperation).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
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
    </>
  );
}
