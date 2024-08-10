import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

// Reconstructs the URL from an array of components by decoding and joining them.
function reconstructUrl(url: string[]): string {
  return url.map(decodeURIComponent).join("/"); // Decodes and joins the URL components
}

// Checks if the URL is already indexed in Redis.
// If not, indexes the URL by adding it to both the chat context and Redis set.
async function indexUrlIfNeeded(reconstructedUrl: string) {
  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  if (!isAlreadyIndexed) {
    // Run both operations in parallel: adding context and adding to the Redis set
    await Promise.all([
      ragChat.context.add({
        type: "html",
        source: reconstructedUrl,
        config: { chunkOverlap: 50, chunkSize: 200 }, // Configuration for how the content is split
      }),
      redis.sadd("indexed-urls", reconstructedUrl), // Add the URL to the set of indexed URLs in Redis
    ]);
  }
}

// Main page component that handles dynamic URL routing, session management, and
// chat initialization. It fetches initial chat messages and handles URL indexing.
const Page = async ({ params }: PageProps) => {
  if (!params.url) {
    return <div>Invalid URL</div>;
  }

  // Retrieve the session ID from cookies
  const sessionCookie = cookies().get("sessionId")?.value || "";

  // Reconstruct the full URL from the parameters
  const reconstructedUrl = reconstructUrl(params.url as string[]);

  // Create a unique session ID by combining the URL and session cookie, removing slashes
  const sessionId = `${reconstructedUrl}--${sessionCookie}`.replace(/\//g, "");

  // Fetch the initial chat messages and ensure the URL is indexed, running these in parallel
  const [initialMessages] = await Promise.all([
    ragChat.history.getMessages({ amount: 10, sessionId }), // Fetch the last 10 chat messages
    indexUrlIfNeeded(reconstructedUrl), // Index the URL if not already indexed
  ]);

  // Render the chat interface, passing the session ID and initial messages as props
  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};

export default Page;
