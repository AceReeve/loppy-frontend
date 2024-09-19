import CreateNewInboxForm from "@/src/app/dashboard/settings/inboxes/_components/forms/create-new-inbox-form.tsx";
import { type FormComponentProps } from "@/src/types/settings";

export default function CreateNewInbox({
  setSaveEnabled,
  id,
  onSubmit,
}: FormComponentProps) {
  return (
    <CreateNewInboxForm
      setSaveEnabled={setSaveEnabled}
      id={id}
      onSubmit={onSubmit}
    />
  );
}
