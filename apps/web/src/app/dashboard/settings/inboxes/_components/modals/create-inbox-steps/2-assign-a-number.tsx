import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import { AddCircle, Hashtag } from "iconsax-react";
import type { FormComponentProps } from "@/src/types/settings";
import ChooseNumberForm from "@/src/app/dashboard/settings/numbers/_components/forms/choose-number-form.tsx";
import type { chooseNumberSchema } from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";

export default function AssignNumber({
  id,
  isActive,
  form,
  onNextStep,
}: FormComponentProps<chooseNumberSchema>) {
  const tabs = [
    {
      icon: AddCircle,
      label: "Buy a Number",
      id: "buy-number",
      component: ChooseNumberForm,
    },
    {
      icon: Hashtag,
      label: "Select a Number",
      id: "select-a-number",
      component: ChooseNumberForm,
    },
  ];

  return (
    <Tabs className="w-full" defaultValue={tabs[0].id} variant="box">
      <TabsList>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger key={tab.id} value={tab.id} className="flex-col py-4">
              <Icon className="size-8" />
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="mt-2">
        {tabs.map((tab) => {
          const TabComponent = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id}>
              <TabComponent
                id={id}
                isActive={isActive}
                form={form}
                onNextStep={onNextStep}
              />
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}
