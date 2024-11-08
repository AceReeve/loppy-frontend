"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@repo/ui/components/ui";
import {
  useDeleteCredentialsMutation,
  useGetCredentialsQuery,
  useSetCredentialsMutation,
  useVerifyCredentialsMutation,
} from "@repo/redux-utils/src/endpoints/service-titan.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import {
  type ServiceTitanFormValues,
  serviceTitanSchema,
} from "@/src/app/dashboard/settings/integrations/schemas/integrations-schemas.ts";
import ServiceTitanSyncListStatus from "@/src/app/dashboard/settings/integrations/modal/service-titan-sync-list-status.tsx";

export default function ServiceTitanCredsModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const form = useForm<ServiceTitanFormValues>({
    resolver: zodResolver(serviceTitanSchema),
    defaultValues: {
      clientId: "",
      clientSecret: "",
      appKey: "",
      tenantId: "",
    },
  });

  // RTK Query hooks
  const { data: credentialsData, refetch: refetchCredentials } =
    useGetCredentialsQuery(undefined);
  const [setCredentials] = useSetCredentialsMutation();
  const [verifyCredentials] = useVerifyCredentialsMutation();
  const [deleteCredentials, { isLoading: isDeleting }] =
    useDeleteCredentialsMutation();

  useEffect(() => {
    if (credentialsData) {
      form.reset(credentialsData);
      setIsConnected(true);
    }
  }, [credentialsData, form]);

  useEffect(() => {
    if (open) {
      void refetchCredentials(); // Fetch credentials when modal opens
    }
  }, [open, refetchCredentials]);

  async function onSubmit(data: ServiceTitanFormValues) {
    setIsLoading(true);
    try {
      await verifyCredentials(data).unwrap(); // Verify credentials
      await setCredentials(data).unwrap(); // Save credentials

      toast({
        title: "Credentials saved",
        description:
          "Your ServiceTitan credentials have been successfully saved.",
      });
      setIsConnected(true);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onDisconnect() {
    setIsLoading(true);
    try {
      await deleteCredentials(undefined).unwrap(); // Delete credentials

      toast({
        title: "Disconnected",
        description: "Your ServiceTitan credentials have been removed.",
      });
      setIsConnected(false);
      form.reset({
        clientId: "",
        clientSecret: "",
        appKey: "",
        tenantId: "",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isConnected ? "Manage" : "Connect ServiceTitan"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>ServiceTitan Credentials</DialogTitle>
          <DialogDescription>
            {isConnected
              ? "Manage your ServiceTitan connection."
              : "Enter your ServiceTitan credentials here. These are required to connect to your ServiceTitan account."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Client ID"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Secret</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Client Secret"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your App Key"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tenantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Tenant ID"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isConnected ? <ServiceTitanSyncListStatus /> : null}
            <div className="flex gap-2">
              {isConnected ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDisconnect}
                  disabled={isLoading || isDeleting}
                >
                  {isDeleting ? "Disconnecting" : "Disconnect"}
                </Button>
              ) : null}
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {/* eslint-disable-next-line no-nested-ternary -- this is easy to read */}
                {isLoading ? "Loading..." : isConnected ? "Update" : "Connect"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
