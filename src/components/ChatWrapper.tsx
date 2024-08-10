"use client"; // Indicates that this component is a client-side component

import { Message, useChat } from "ai/react"; // Import types and hooks from ai/react
import { Messages } from "./Messages"; // Import Messages component to display chat messages
import { ChatInput } from "./ChatInput"; // Import ChatInput component for user input

interface ChatWrapperProps {
  sessionId: string;
  initialMessages: Message[];
}

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: ChatWrapperProps) => {
  // Use the useChat hook to manage chat state and interactions
  const { messages, handleInputChange, handleSubmit, input, setInput } =
    useChat({
      api: "/api/chat-stream", // API endpoint for chat interactions
      body: { sessionId }, // Request body with sessionId
      initialMessages, // Initial messages to display
    });

  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      {/* Container for messages */}
      <div className="flex-1 text-black bg-zinc-800 flex flex-col justify-between">
        <Messages messages={messages} /> {/* Render messages */}
      </div>

      {/* Input component for sending messages */}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};
