import CreateNewInboxForm from "@/src/app/dashboard/settings/inboxes/_components/forms/create-new-inbox-form.tsx";
import { type FormComponentProps } from "@/src/types/settings";
import type { createInboxSchema } from "@/src/app/dashboard/settings/inboxes/_components/schemas/create-inbox-schemas.ts";

export default function CreateNewInbox({
  id,
  isActive,
  form,
  onNextStep,
}: FormComponentProps<typeof createInboxSchema>) {
  return (
    <CreateNewInboxForm
      id={id}
      isActive={isActive}
      form={form}
      onNextStep={onNextStep}
    />
  );
}
