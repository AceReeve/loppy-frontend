import ConversationsList from "../components/conversations-list";
import ConversationView from "../components/conversation-view/conversation-view.tsx";
import ConversationDetails from "../components/conversation-details/conversation-details.tsx";

export function MessagingPage() {
  return (
    <div className="relative flex h-full w-full overflow-hidden text-black antialiased">
      <main className="flex min-h-0 flex-grow flex-row gap-2">
        <ConversationsList />
        <ConversationView />
        <ConversationDetails />
      </main>
    </div>
  );
}

export default MessagingPage;
