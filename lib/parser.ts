export interface Message {
  id: number;
  timestamp: Date;
  sender: string;
  content: string;
  type: "text" | "system";
}

export function parseWhatsAppChat(text: string): Message[] {
  const messages: Message[] = [];
  const lines = text.split("\n");

  // Regex to match the WhatsApp timestamp format
  // Example: [DD/MM/YYYY, HH:MM:SS] Sender: Message
  // Example: [DD/MM/YY, HH:MM:SS] Sender: Message
  // Example: DD/MM/YYYY, HH:MM - Sender: Message
  const regex =
    /^\[?(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2,4})[, ]+(\d{1,2}:\d{2}(?::\d{2})?(?:\s?[aApP][mM])?)\]?(?:\s*-\s*)?\s*(.*?):\s*(.*)/;
  // Also match system messages that don't have a sender: `[DD/MM/YYYY, HH:MM:SS] System Message`
  const systemRegex =
    /^\[?(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2,4})[, ]+(\d{1,2}:\d{2}(?::\d{2})?(?:\s?[aApP][mM])?)\]?(?:\s*-\s*)?\s*(.*)/;

  let currentMessage: Message | null = null;
  let idCounter = 0;

  for (let rawLine of lines) {
    // Strip invisible unicode formatting characters common in WhatsApp exports
    const line = rawLine.replace(
      /[\u200E\u200F\u202A\u202B\u202C\u202D\u202E]/g,
      "",
    );

    if (!line.trim() && !currentMessage) continue;

    const match = line.match(regex);
    const sysMatch = !match ? line.match(systemRegex) : null;

    if (match || sysMatch) {
      if (currentMessage) {
        messages.push(currentMessage);
      }

      let d, m, y, timeStr, sender, content;

      if (match) {
        [, d, m, y, timeStr, sender, content] = match;
      } else if (sysMatch) {
        [, d, m, y, timeStr, content] = sysMatch;
        sender = "System";
      } else {
        continue;
      }

      const fullYear = y.length === 2 ? `20${y}` : y;

      // Basic time parsing fallback
      const timestamp = new Date(`${fullYear}-${m}-${d} ${timeStr}`);

      const isSystem =
        sender === "System" ||
        content.includes("Messages and calls are end-to-end encrypted") ||
        content.includes("joined using this group's invite link") ||
        content.includes("left");

      currentMessage = {
        id: idCounter++,
        timestamp: isNaN(timestamp.getTime()) ? new Date() : timestamp,
        sender: sender.trim(),
        content: content.trim(),
        type: isSystem ? "system" : "text",
      };
    } else {
      // Continuation line
      if (currentMessage) {
        currentMessage.content += "\n" + line;
      }
    }
  }

  if (currentMessage) {
    messages.push(currentMessage);
  }

  return messages;
}
