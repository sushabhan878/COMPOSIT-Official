"use client";

import { marked } from "marked";
import { useMemo } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function MarkdownEditor({ value, onChange }: Props) {
  const preview = useMemo(() => marked(value || ""), [value]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`# Hello Participants\n\nThis is an important update...`}
        className="h-72 w-full p-4 rounded-xl bg-black/60 border border-white/15 text-white font-mono resize-none"
      />

      {/* Preview */}
      <div className="h-72 overflow-y-auto p-4 rounded-xl bg-white/5 border border-white/15 text-white prose prose-invert">
        <div dangerouslySetInnerHTML={{ __html: preview }} />
      </div>
    </div>
  );
}
