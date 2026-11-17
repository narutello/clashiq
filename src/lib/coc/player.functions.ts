import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TagInput = z.object({
  tag: z.string().min(1).max(20),
});

export const apiStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { configured: Boolean(process.env.COC_API_TOKEN?.trim()) };
});

export const fetchPlayer = createServerFn({ method: "POST" })
  .validator((input: unknown) => TagInput.parse(input))
  .handler(async ({ data }) => {
    const { loadPlayer } = await import("./fetch-player.server.ts");
    return loadPlayer(data.tag);
  });
