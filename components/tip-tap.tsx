"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./tool-bar";

type Props = {
  description: string;
  onChange: (text: string) => void;
};

const Tiptap = ({ description, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        levels: [1, 2],
       
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[200px] border-input p-2 text-[14px]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch  w-full space-y-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
