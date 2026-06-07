import "server-only";

/**
 * Gửi thông báo khi có đăng ký mới qua webhook (tùy chọn).
 * Cấu hình biến môi trường NOTIFY_WEBHOOK_URL — tương thích với:
 *   - Telegram: https://api.telegram.org/bot<token>/sendMessage?chat_id=<id>  (gửi field "text")
 *   - Discord:  https://discord.com/api/webhooks/...  (gửi field "content")
 *   - Google Chat / Slack: webhook URL  (gửi field "text")
 * Nếu chưa cấu hình thì bỏ qua một cách an toàn (chỉ log).
 */
export async function notifyNewLead(title: string, lines: string[]): Promise<void> {
  const url = process.env.NOTIFY_WEBHOOK_URL?.trim();
  const message = `🔔 ${title}\n${lines.filter(Boolean).join("\n")}`;

  if (!url) {
    console.log("[notify] Đăng ký mới (chưa cấu hình NOTIFY_WEBHOOK_URL):\n" + message);
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // gửi cả "text" và "content" để tương thích nhiều nền tảng
      body: JSON.stringify({ text: message, content: message }),
    });
  } catch (error) {
    console.error("[notify] Gửi thông báo thất bại:", error);
  }
}
