import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface PROPS {
  aiOutput: string;
  selectedTemplate?: { name: string };
}

const OutputSection = ({ aiOutput, selectedTemplate }: PROPS) => {
  const storageKey = `editorContent_${selectedTemplate?.name}`; // Generate a unique storage key for each template

  const editor = useEditor({
    extensions: [StarterKit],
    content: localStorage.getItem(storageKey) || "", // Initial content
  });

  // Update editor content when aiOutput changes
  useEffect(() => {
    if (editor && aiOutput) {
      editor.commands.setContent(aiOutput);
      localStorage.setItem(storageKey, aiOutput);
    }
  }, [aiOutput, editor]);

  return (
    <div className="bg-white shadow-lg border rounded-lg mx-auto">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">
          {aiOutput ? "Your Result" : "your result will appear here"}
        </h2>
        <hr />
      </div>
      <EditorContent
        editor={editor}
        className="h-screen p-4 focus:outline-none"
      />
      {/* {editor && (
        <>
          <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
          <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </>
      )} */}
    </div>
  );
};

export default OutputSection;
