import {
  //Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@repo/ui/components/ui";
import { Trophy, X, Zap, MapPin, Clock, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LeadsCard() {
  return (
    <Card className="mx-auto w-full">
      <CardHeader className="flex items-start justify-between">
        <CardTitle>Leads Card</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Trophy className="h-4 w-4 text-yellow-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          {/*          <h3 className="mb-2 font-semibold">October's Goal: 150 Leads</h3>
          <Progress value={53} className="h-2 bg-blue-100" />*/}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-2">
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ORIGINATION</TableHead>
                    <TableHead>CUSTOMER NAME</TableHead>
                    <TableHead>SOLD?</TableHead>
                    <TableHead>AMOUNT</TableHead>
                    <TableHead>CPI</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Facebook</TableCell>
                    <TableCell>Tony Stark</TableCell>
                    <TableCell>
                      <span className="rounded bg-red-100 px-2 py-1 text-red-600">
                        No
                      </span>
                    </TableCell>
                    <TableCell>$0</TableCell>
                    <TableCell>$83.12</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="bg-blue-200">
                        More Info
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Instagram</TableCell>
                    <TableCell>Steve Rodgers</TableCell>
                    <TableCell>
                      <span className="rounded bg-green-100 px-2 py-1 text-green-600">
                        Yes
                      </span>
                    </TableCell>
                    <TableCell>$6,023</TableCell>
                    <TableCell>$33.48</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="bg-blue-200">
                        More Info
                      </Button>
                    </TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="flex flex-col items-center justify-between p-6">
              <div className="h-50 w-50 relative">
                <svg className="h-full w-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="75, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">80 LEADS</span>
                  <span className="text-sm">$8,443 Adspend</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-teal-500" />
                <span>Adspend</span>
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Leads</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-start gap-5">
          <div>
            <div className="flex w-[400px] gap-2 rounded-3xl bg-blue-300 p-4">
              <div className="w-[130px]">
                <Card className="bg-blue-500 text-white">
                  <CardContent className="flex flex-col items-center p-4">
                    <Zap className="mb-2" />
                  </CardContent>
                </Card>
                <span className="text-2xl font-bold">$43.12</span>
                <span className="text-sm">AVG CPI</span>
              </div>
              <div className="w-[130px]">
                <Card className="bg-blue-500 text-white">
                  <CardContent className="flex flex-col items-center p-4">
                    <MapPin className="mb-2" />
                  </CardContent>
                </Card>
                <span className="text-2xl font-bold">$143.12</span>
                <span className="text-sm">AVG CPA</span>
              </div>
              <div className="w-[130px]">
                <Card className="bg-blue-500 text-white">
                  <CardContent className="flex flex-col items-center p-4">
                    <Clock className="mb-2" />
                  </CardContent>
                </Card>
                <span className="text-2xl font-bold">$8,443</span>
                <span className="text-sm">Amount Spent</span>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Image
                src="/assets/icons/icon-google-colored.svg"
                width={15}
                height={15}
                className="size-auto"
                alt=""
              />
              <div className="text-center">
                <span className="text-2xl font-bold">24/80</span>
                <span className="block text-sm">leads</span>
                <span className="text-lg font-semibold">$43,123</span>
                <span className="block text-sm">Revenue</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Image
                src="/assets/icons/icon-fb-colored.svg"
                width={15}
                height={15}
                className="size-auto"
                alt=""
              />
              <div className="text-center">
                <span className="text-2xl font-bold">24/80</span>
                <span className="block text-sm">leads</span>
                <span className="text-lg font-semibold">$43,123</span>
                <span className="block text-sm">Revenue</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
