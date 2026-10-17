import { orderEvents } from "@/lib/orderEvents";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const encoder = new TextEncoder();
  let keepAlive: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      // ১. কানেকশন ইনিশিয়ালাইজেশন
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "CONNECTED" })}\n\n`)
      );

      // ২. হার্টবিট পিং
      keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          clearInterval(keepAlive);
        }
      }, 15000);

      // ৩. নতুন অর্ডার হ্যান্ডলার
      const handleNewOrder = (order: any) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(order)}\n\n`)
          );
        } catch {
          // কন্ট্রোলার বন্ধ হয়ে গেলে ইগনোর করবে
        }
      };

      orderEvents.on("new-order", handleNewOrder);

      // ৪. ক্লায়েন্ট ডিসকানেক্ট ক্লিনআপ
      const cleanup = () => {
        clearInterval(keepAlive);
        orderEvents.off("new-order", handleNewOrder);
      };

      req.signal.addEventListener("abort", () => {
        cleanup();
        try {
          controller.close();
        } catch {}
      });
    },
    cancel() {
      // 👈 ব্রাউজার কানেকশন ছাড়লে Next.js এটি কল করে
      clearInterval(keepAlive);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Encoding": "none", // 👈 কম্প্রেশন বন্ধ করে যাতে বাফারিং না হয়
    },
  });
}