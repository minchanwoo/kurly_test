import React, { useState, useEffect } from "react";

import Editor from "tui-editor";

import "tui-editor/dist/tui-editor-extColorSyntax";

import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";

const Edit = ({ setText }: { setText: (e: string) => void }) => {
  useEffect(() => {
    setEditor("");
  }, []);

  let editor: Editor;
  const setEditor = (value: string) => {
    editor = new Editor({
      el: document.querySelector("#editor"),
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      initialValue: value,
      hideModeSwitch: true,
      exts: ["colorSyntax"],
      height: "300px",
      events: {
        change: () => {
          setText(editor.getHtml());
        }
      }
    } as any);
  };

  return <div id="editor"></div>;
};

export default Edit;
