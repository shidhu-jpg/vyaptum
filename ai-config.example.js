/* =====================================================================
   AI Assistant configuration — TEMPLATE.

   HOW TO USE
   1. Make a copy of this file named exactly:  ai-config.js
      (same folder as index.html)
   2. Choose a provider and paste its key (see below).
   3. Save. index.html already loads ai-config.js.

   ai-config.js is listed in .gitignore, so your real key is never
   committed to git. This template file is safe to commit.

   ---------------------------------------------------------------------
   PROVIDER OPTIONS (all have a free tier, no card required)

   A) Google AI Studio — provider: "gemini"
      Key: https://aistudio.google.com/apikey   (looks like "AIza...")
      Set geminiApiKey below.

   B) Groq — provider: "openai"   (fast, easy, recommended fallback)
      Key: https://console.groq.com/keys        (looks like "gsk_...")
      Set openaiApiKey below. Defaults already point at Groq.

   C) OpenRouter — provider: "openai"
      Key: https://openrouter.ai/keys           (looks like "sk-or-...")
      openaiBaseUrl: "https://openrouter.ai/api/v1"
      openaiModel:   "meta-llama/llama-3.3-70b-instruct:free"

   D) Mistral — provider: "openai"
      Key: https://console.mistral.ai/api-keys
      openaiBaseUrl: "https://api.mistral.ai/v1"
      openaiModel:   "mistral-small-latest"
   ---------------------------------------------------------------------

   SECURITY NOTE
   On a live static site the key still ships to the browser and can be
   read from the page. Before publishing: restrict the key to the AI API
   only, add an HTTP-referrer restriction for your domain, and set a low
   quota. The fully safe option is a small server-side proxy that keeps
   the key private.
   ===================================================================== */
window.AI_CONFIG = {
  provider: "gemini",   // "gemini" or "openai"

  // ---- used when provider: "gemini" ----
  geminiApiKey: "PASTE_YOUR_GOOGLE_AI_STUDIO_KEY_HERE",
  geminiModel: "gemini-2.0-flash",   // cheaper: "gemini-2.0-flash-lite"

  // ---- used when provider: "openai" ----
  openaiApiKey: "PASTE_YOUR_GROQ_OR_OPENROUTER_KEY_HERE",
  openaiModel: "llama-3.3-70b-versatile",
  openaiBaseUrl: "https://api.groq.com/openai/v1"
};
