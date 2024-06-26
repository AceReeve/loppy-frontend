"use client";

import React, { useState } from "react";
import { Paperclip } from "lucide-react";
import { useImportContactsMutation } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type DropzoneOptions,
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  toast,
} from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

interface ImportContactsProps {
  setOpen: (open: boolean) => void;
}

function FileSvgDraw() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
        fill="none"
        viewBox="0 0 20 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, XLSX</p>
    </>
  );
}

function handleDownloadTemplate(filename: string, template: string) {
  const csvBlob = new Blob([template], { type: "text/csv" });
  const csvUrl = URL.createObjectURL(csvBlob);

  const link = document.createElement("a");
  link.href = csvUrl;

  link.download = filename;

  link.click();
}

function FileUploadDropzone(props: {
  files: File[] | null;
  setFiles: (files: File[] | null) => void;
}) {
  const dropZoneConfig = {
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxSize: 4 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <div className="py-2">
      <FileUploader
        className="relative rounded-lg p-2"
        dropzoneOptions={dropZoneConfig}
        onValueChange={props.setFiles}
        value={props.files}
      >
        <FileInput className="py-10 outline-dashed outline-1 outline-gray-500">
          <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
            <FileSvgDraw />
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
    </div>
  );
}

export default function ImportContactsDialogContent(
  props: ImportContactsProps,
) {
  const [files, setFiles] = useState<File[] | null>([]);
  const [importContacts, { isLoading }] = useImportContactsMutation();

  const csvFileTemplate = {
    fileName: `servihero-import-contact-template.csv`,
    columns: `first_name,last_name,email,phone_number,source,lifetime_value,last_campaign_ran,last_interaction`,
  };

  const handleImportContacts = () => {
    const formData = new FormData();
    formData.append("file", files?.[0] !== undefined ? files[0] : "");

    importContacts(formData)
      .unwrap()
      .then(() => {
        toast({
          description: "Imported Contacts Successfully!",
        });
        props.setOpen(false);
        setFiles([]);
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <DialogContent>
      {isLoading ? (
        <Alert className="min-w-72">
          <LoadingSpinner />
          <AlertTitle>Importing Contacts</AlertTitle>
          <AlertDescription>This may take a while.</AlertDescription>
        </Alert>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Import contacts</DialogTitle>
            <DialogDescription>
              <FileUploadDropzone files={files} setFiles={setFiles} />
              <button
                className="text-primary -mt-5 underline"
                onClick={() => {
                  handleDownloadTemplate(
                    csvFileTemplate.fileName,
                    csvFileTemplate.columns,
                  );
                }}
                type="button"
              >
                Download Template
              </button>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                handleImportContacts();
              }}
              disabled={!files || files.length === 0}
            >
              Import
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
}
