"use client"; // Indicates that this component is a client-side component

import { Button, Textarea } from "@nextui-org/react"; // Import UI components from NextUI
import { Home, Send } from "lucide-react"; // Import the Home and Send icons from Lucide React
import { type useChat } from "ai/react"; // Import types for the useChat hook
import Link from "next/link"; // Import the Link component from Next.js

// Type aliases for function types from useChat
type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

export const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
}: ChatInputProps) => {
  return (
    <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleSubmit(); // Call the submit handler
                setInput(""); // Clear the input field
              }}
              className="relative"
            >
              <Textarea
                minRows={4}
                autoFocus
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  // Handle Enter key press for submission
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                    setInput(""); // Clear the input after submission
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base"
              />

              <div className="absolute z-10 right-2 bottom-2 flex gap-2">
                <Link href="/" className="flex items-center">
                  <Button
                    size="sm"
                    className="border border-border bg-zinc-900"
                  >
                    <Home className="size-4" />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  type="submit"
                  className="border border-border bg-zinc-900"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
