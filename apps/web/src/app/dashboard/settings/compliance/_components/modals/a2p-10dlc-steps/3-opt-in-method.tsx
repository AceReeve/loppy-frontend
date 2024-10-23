import React, { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Checkbox,
  Textarea,
  Alert,
  AlertDescription,
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@repo/ui/components/ui";
import { AlertCircle, Paperclip, UploadIcon } from "lucide-react";
import type { FormComponentProps } from "@/src/types/settings";
import { type optInMethodSchema } from "../../schemas/a2p-10dlc-registration-schemas.ts";

const optInMethods = [
  {
    value: "text",
    label: "Text",
    example:
      "If participants want to receive updates on latest developments, they can can opt in via SMS by texting the keyword SIGNAL to the number 12345. Users can reply with HELP for assistance or text STOP to cancel their subscription to the updates. Additionally, users can review Terms of Service and the Privacy Statement for more information.",
  },
  {
    value: "web-form",
    label: "Web Form",
    example:
      "An embedded form on the end-business’s website that prompts end-users to enter their mobile handset phone number and opt into the texting campaign. Note checkbox should be selectable by end-user for opting in and not preselected.",
  },
  {
    value: "paper-form",
    label: "Paper Form",
    example:
      "An in-store visitor completes a physical form that collects their phone number and their consent to subscribe to your texting campaign.",
  },
  {
    value: "qr-code",
    label: "Mobile QR Code",
    example:
      "A QR code that links to an online form that prompts end-users to enter their mobile handset phone number and opt into the texting campaign. QR code can direct the mobile handset to their messaging application with a templated opt-in message, or can lead to a web-form as outlined above.",
  },
  // Add more countries as needed
];

export default function OptInMethod({
  form,
}: FormComponentProps<typeof optInMethodSchema>) {
  const selectedMethods = form?.watch("method");
  const messageFlows = form?.watch("messageFlow") ?? [];
  const imageUrls = form?.watch("imageUrl") ?? [];

  useEffect(() => {
    if (form && selectedMethods) {
      form.setValue(
        "messageFlow",
        selectedMethods.map((_item, index) => messageFlows[index] ?? ""),
        {
          shouldValidate: true,
        },
      );
      form.setValue(
        "imageUrl",
        selectedMethods.map(
          (_item, index) => (imageUrls[index] as File[] | null) ?? [],
        ),
        {
          shouldValidate: true,
        },
      );
    }
  }, [selectedMethods]);

  if (!form || !selectedMethods) return null;

  return (
    <FormField
      control={form.control}
      name="method"
      render={() => (
        <FormItem>
          <FormLabel>
            Select one or more of the options below for how your customers
            opt-in to receive text messages.
          </FormLabel>
          {optInMethods.map((item, index) => (
            <div
              className="flex flex-col gap-2 border border-gray-200 bg-gray-100 p-4"
              key={item.value}
            >
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.value}
                      className="flex items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(item.value)}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, item.value])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== item.value,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel>{item.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
              {selectedMethods.includes(item.value) && (
                <>
                  <FormField
                    control={form.control}
                    name="messageFlow"
                    render={({ field }) => {
                      const i = selectedMethods.indexOf(item.value);
                      return (
                        <>
                          <FormItem>
                            <FormControl>
                              <Textarea
                                value={field.value[i]}
                                onChange={(val) => {
                                  field.onChange(
                                    field.value.map((fieldValue, index2) => {
                                      return selectedMethods[index2] ===
                                        item.value
                                        ? val.target.value
                                        : fieldValue;
                                    }),
                                  );
                                }}
                                placeholder="Provide clear details on how an end customer consents to receive messages and understand the purpose of the messaging."
                              />
                            </FormControl>
                          </FormItem>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {`Example: ${optInMethods[index].example}`}
                            </AlertDescription>
                          </Alert>
                        </>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => {
                      const i = selectedMethods.indexOf(item.value);
                      return (
                        <FormItem>
                          <FormLabel>
                            Please provide images of the opt-in process and what
                            a subscriber is agreeing to:
                          </FormLabel>
                          <FormControl>
                            <FileUploadDropzone
                              files={field.value[i] as File[]}
                              setFiles={(files) => {
                                field.onChange(
                                  field.value.map((fieldValue, index2) => {
                                    return selectedMethods[index2] ===
                                      item.value
                                      ? files
                                      : (fieldValue as File[]);
                                  }),
                                );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </>
              )}
            </div>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FileUploadDropzone(props: {
  files: File[] | null;
  setFiles: (files: File[] | null) => void;
}) {
  return (
    <FileUploader
      className="relative rounded-lg p-1"
      onValueChange={props.setFiles}
      value={props.files}
    >
      <FileInput>
        <div className="flex w-full items-center gap-4 p-4">
          <UploadIcon className="size-4 text-gray-500 dark:text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
            &nbsp; or drag and drop
          </p>
        </div>
      </FileInput>
      <FileUploaderContent>
        {props.files && props.files.length > 0
          ? props.files.map((file, i) => (
              <FileUploaderItem index={i} key={file.name}>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))
          : null}
      </FileUploaderContent>
    </FileUploader>
  );
}
