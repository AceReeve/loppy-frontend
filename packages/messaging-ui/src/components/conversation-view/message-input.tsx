import {
  $getRoot,
  $getSelection,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_LOW,
  type EditorState,
  KEY_ENTER_COMMAND,
} from "lexical";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useEffect } from "react";
import { getTranslation } from "@repo/redux-utils/src/utils/messaging/local-utils.ts";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EmojiNormal } from "iconsax-react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useMessagesState } from "../../providers/messages-provider.tsx";

interface MessageInputProps {
  message: string;
  onChange: (message: string) => void;
  onEnterKeyPress: () => void;
  // onFileRemove: (file: string) => void;
  // assets: File[];
}

interface EnterKeyPluginProps {
  onEnterKeyPress: () => void;
}

function EnterKeyPlugin(props: EnterKeyPluginProps) {
  const { onEnterKeyPress } = props;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        onEnterKeyPress();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, onEnterKeyPress]);

  return null;
}

function OnChangePlugin({
  onChange,
}: {
  onChange: (_state: EditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

// when message gets cleared and given it's a prop passed in to MessageInput
// we need to clear the Lexical editor.
// TODO: there has to be a simpler way of doing a basic binding like this with Lexical

interface MessagePropPluginProps {
  message: string;
}

function MessagePropPlugin(props: MessagePropPluginProps) {
  const { message } = props;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (message.trim().length === 0) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    }
  }, [editor, message]);

  return null;
}

function InsertEmojiButton() {
  const [editor] = useLexicalComposerContext();
  const { emojiClicked, onEmojiClick, showEmojiPicker } = useMessagesState();

  const insertCharacter = (char: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        selection.insertText(char);
      }
    });
  };

  useEffect(() => {
    if (!emojiClicked) return;
    insertCharacter(emojiClicked);
    onEmojiClick(null);
  }, [emojiClicked]);

  return (
    <button
      className="absolute right-0 top-[2px] mr-3 mt-2 flex h-6 w-6 flex-shrink-0 text-gray-800 focus:outline-none"
      onClick={(e) => {
        showEmojiPicker({
          event: e,
        });
      }}
      type="button"
    >
      <EmojiNormal />
    </button>
  );
}

export default function MessageInput(props: MessageInputProps) {
  const { onEnterKeyPress, message } = props;

  const convoPlaceholder = getTranslation("en-US", "convoPlaceholder");

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "message-input",
        onError: (e) => {
          throw e;
        },
      }}
    >
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="font-nunito w-full rounded-[10px] bg-gray-100 py-3 pl-3 pr-10 text-black focus:border focus:border-gray-300 focus:bg-white focus:shadow-md focus:outline-none" />
        }
        placeholder={
          <div className="font-nunito pointer-events-none absolute left-4 top-3 text-gray-400">
            {convoPlaceholder}
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ClearEditorPlugin />
      <HistoryPlugin />
      <MessagePropPlugin message={message} />
      <EnterKeyPlugin onEnterKeyPress={onEnterKeyPress} />
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            const text = $getRoot().getTextContent();
            props.onChange(text);
          });
        }}
      />
      <InsertEmojiButton />
    </LexicalComposer>
  );
}
