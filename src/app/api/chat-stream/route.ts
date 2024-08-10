import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming JSON request to extract the messages array and sessionId
    const {
      messages,
      sessionId,
    }: { messages: { content: string }[]; sessionId: string } =
      await req.json();

    if (!messages?.length) {
      // Handle cases where the messages array is missing or empty
      return new Response("No messages provided", { status: 400 });
    }

    // Extract the content of the last message in the messages array
    const lastMessage = messages[messages.length - 1].content;

    // Send the last message to the ragChat service, enabling streaming for real-time response
    const response = await ragChat.chat(lastMessage, {
      streaming: true, // Enable streaming to receive the response in real-time
      sessionId, // Pass the sessionId to maintain conversation context
    });

    // Adapt the response for AI chat using the provided adapter and return it
    return aiUseChatAdapter(response);
  } catch (error) {
    // Log any errors that occur during the request handling
    console.error("Error in chat-stream POST handler:", error);

    // Return a generic server error response in case of an exception
    return new Response("Internal Server Error", { status: 500 });
  }
};
