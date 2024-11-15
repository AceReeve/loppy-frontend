"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui";
import { Mail, MessageSquare } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  contactSource: z.string(),
  membership: z.string(),
  lastService: z.string(),
  lifetimeValue: z.string(),
  notes: z.string(),
});

const campaigns = [
  {
    name: "Furnace tune-up",
    date: "10/11/2024",
    status: "RAN",
  },
  {
    name: "A/C tune-up",
    date: "04/05/2024",
    status: "RAN",
  },
  {
    name: "Rehash Leads",
    date: "02/1/2024",
    status: "RAN",
  },
];

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      contactSource: "",
      membership: "",
      lastService: "",
      lifetimeValue: "",
      notes: "",
    },
  });

  return (
    <form className="space-y-4">
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500">
          <svg
            className="h-12 w-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Abraham Lincoln</h2>
        <p className="text-gray-500">(801) 555-1234</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <Label htmlFor="dnd">Do Not Disturb</Label>
        <Switch id="dnd" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...form.register("name")} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" {...form.register("phone")} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="contactSource">Contact Source</Label>
            <Input id="contactSource" {...form.register("contactSource")} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="membership">Membership</Label>
            <Input id="membership" {...form.register("membership")} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="lastService">Last Service</Label>
            <Input id="lastService" {...form.register("lastService")} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Label htmlFor="lifetimeValue">Lifetime Value</Label>
            <Input id="lifetimeValue" {...form.register("lifetimeValue")} />
          </div>
        </div>
      </div>
    </form>
  );
}

function CampaignsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>CAMPAIGN</TableHead>
          <TableHead>DATE RAN</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.name}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell>{campaign.date}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {campaign.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="secondary">More Info</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function NotesSection() {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" className="min-h-[150px]" />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="mt-4 flex justify-end gap-4">
      <Button className="gap-2">
        <Mail className="h-4 w-4" />
        Send Email
      </Button>
      <Button className="gap-2">
        <MessageSquare className="h-4 w-4" />
        Send SMS
      </Button>
    </div>
  );
}

type ContactCardModalProps = React.ComponentProps<typeof Dialog>;

export default function ContactCardModal({ ...props }: ContactCardModalProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="max-h-[800px] min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Contact</DialogTitle>
        </DialogHeader>
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="campaigns">
                    <TabsList className="mb-4">
                      <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="ai">A.I.</TabsTrigger>
                    </TabsList>
                    <TabsContent value="campaigns">
                      <CampaignsTable />
                    </TabsContent>
                    <TabsContent value="summary">Summary content</TabsContent>
                    <TabsContent value="ai">AI content</TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <NotesSection />
                </CardContent>
              </Card>

              <ActionButtons />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
