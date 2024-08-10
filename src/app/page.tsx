"use client"; // This enables client-side features in Next.js

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (url) {
      // Redirect to [...url]/page.tsx
      router.push(`/${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-700">
      <h1 className="text-4xl font-bold mb-8">Chat w/Web</h1>
      <div className="w-full max-w-md gap-3">
        <Input
          type="text"
          placeholder="Enter URL to chat with"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSubmit} color="primary" className="w-full text-xl font-medium">
          Start Chat
        </Button>
      </div>
    </div>
  );
}
