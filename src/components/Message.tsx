import { cn } from "@/lib/utils"; // Import utility function for conditional class names
import { Bot, User } from "lucide-react"; // Import icons for bot and user messages

interface MessageProps {
  content: string; // Content of the message
  isUserMessage: boolean; // Flag to distinguish between user and bot messages
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn({
        "bg-zinc-800": isUserMessage, // Background color for user messages
        "bg-zinc-900/25": !isUserMessage, // Background color for bot messages
      })}
    >
      <div className="p-6">
        {" "}
        {/* Padding around the message */}
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          {" "}
          {/* Container for message content */}
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              {
                "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage, // Styles for user messages
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5" /> // User icon for user messages
            ) : (
              <Bot className="size-5 text-white" /> // Bot icon for bot messages
            )}
          </div>
          <div className="flex flex-col ml-6 w-full">
            {" "}
            {/* Container for message text */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Website"} {/* Display sender name */}
              </span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {content} {/* Display message content */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
