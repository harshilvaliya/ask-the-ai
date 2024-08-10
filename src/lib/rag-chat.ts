import { RAGChat, upstash } from "@upstash/rag-chat";

// Initialize a new RAGChat instance
export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"), // Specify the model to use for chat interactions
});
