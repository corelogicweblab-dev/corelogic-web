"use client";

export function ChatMessageContent({ text, light = false }: { text: string; light?: boolean }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className="whitespace-pre-wrap break-words">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={i}
              className={light ? "font-semibold text-slate-100" : "font-semibold"}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
