import { useState, useCallback } from 'react';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are a mystical tree shopkeeper in a clicker game. You sell magical trees and special items.
Your personality is wise, slightly eccentric, and you often make references to nature and growth.
Keep responses brief (max 2-3 sentences) and stay in character.
Only discuss trees, nature, and items in your shop.`;

export function useShopkeeper(apiKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://api.x.ai/v1",
    dangerouslyAllowBrowser: true
  });

  const chat = useCallback(async (message: string) => {
    if (loading) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message }
        ],
      });
      
      return completion.choices[0].message.content;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to chat with shopkeeper');
      return null;
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { chat, loading, error };
}