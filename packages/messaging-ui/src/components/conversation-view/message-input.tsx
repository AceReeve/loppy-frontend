import {
  $getRoot,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_LOW,
  EditorState,
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

const EnterKeyPlugin = (props: EnterKeyPluginProps) => {
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
};

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

const MessagePropPlugin = (props: MessagePropPluginProps) => {
  const { message } = props;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (
      message === undefined ||
      message === null ||
      message?.trim().length === 0
    ) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    }
  }, [editor, message]);

  return null;
};

export default function MessageInput(props: MessageInputProps) {
  const { onEnterKeyPress, message } = props;

  const convoPlaceholder = getTranslation("en-US", "convoPlaceholder");

  function onChange(editorState: EditorState) {}

  return (
    <>
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
            <ContentEditable className="w-full rounded-[10px] bg-gray-100 py-3 pl-3 pr-10 font-nunito text-black focus:border focus:border-gray-300 focus:bg-white focus:shadow-md focus:outline-none" />
          }
          placeholder={
            <div className="pointer-events-none absolute left-4 top-3 font-nunito text-gray-400">
              {convoPlaceholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ClearEditorPlugin />
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
      </LexicalComposer>
      {/*{props.assets.length > 0 && (*/}
      {/*  <Box*/}
      {/*    style={{*/}
      {/*      display: "flex",*/}
      {/*      flexWrap: "wrap",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {props.assets.map(({ name, size }) => (*/}
      {/*      <MessageFile*/}
      {/*        key={`${name + "_" + size}`}*/}
      {/*        media={{ filename: name, size }}*/}
      {/*        onRemove={() => props.onFileRemove(name + "_" + size)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </Box>*/}
      {/*)}*/}
    </>
  );
}
