import ConversationView from "@/src/components/conversation-view/conversation-view.tsx";
import ConversationDetails from "@/src/components/conversation-details/conversation-details.tsx";
import ConversationsList from "../components/conversations-list";

export function MessagingPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-black antialiased">
      <main className="flex min-h-0 flex-grow flex-row">
        <ConversationsList />
        <ConversationView />
        <ConversationDetails />
      </main>
    </div>
  );
}

export default MessagingPage;
