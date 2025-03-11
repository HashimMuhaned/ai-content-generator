import React, { useEffect, useRef } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import CopyButton from "../../_components/CopyButton";

interface PROPS {
  aiOutput: string;
}

const OutputSection = ({ aiOutput }: PROPS) => {
  const editorRef: any = useRef(null);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg  mx-auto">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <CopyButton textToCopy={aiOutput} />
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result will be here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
};

export default OutputSection;
