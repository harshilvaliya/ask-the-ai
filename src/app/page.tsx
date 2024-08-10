"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { FaGithubSquare } from "react-icons/fa";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (url) {
      router.push(`/${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-700 p-4 relative">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2 text-white">Chat w/Web</h1>
        <p className="text-lg mb-4 text-muted-foreground">
          Enter a URL to start a chat with the website.
        </p>
        <Input
          clearable
          bordered
          fullWidth
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-2"
        />
        <Button
          onClick={handleSubmit}
          className="mt-2 w-full bg-primary text-primary-foreground"
          size="lg"
        >
          Start Chat
        </Button>
      </div>

      {/* Footer with GitHub link */}
      <footer className="absolute bottom-4 right-4">
        <a
          href="https://github.com/harshilvaliya/chat-with-web"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FaGithubSquare className="text-3xl" />
          <span className="ml-2">GitHub</span>
        </a>
      </footer>
    </div>
  );
}
