import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@repo/ui/components/ui";
import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function SearchDialog({ open, setOpen }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const links = [
    { id: 1, name: "Home" },
    { id: 2, name: "Messages" },
    { id: 3, name: "Contacts" },
    { id: 4, name: "Pipelines" },
    { id: 5, name: "Workflows" },
    { id: 6, name: "Reporting" },
  ];

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-md p-2"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Search className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Type a command or search..."
          className="mb-2 w-full rounded-md p-2 outline-none"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- use autofocus for now
          autoFocus
        />
        <div className="space-y-2">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <Button
                variant="outline"
                key={link.id}
                className="flex w-full cursor-pointer justify-start rounded px-3 py-2"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7h18M3 12h18m-6 5h6"
                  />
                </svg>
                {link.name}
              </Button>
            ))
          ) : (
            <div className="py-2 text-center text-gray-400">
              No results found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
