import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const games = [
  // 3 trò chơi ban đầu
  {
    slug: "ghep-van",
    title: "Ghép vần vui nhộn",
    description: "Chọn vần đúng để hoàn thành từ tiếng Việt. Rèn kỹ năng đọc và nhận biết nguyên âm.",
    category: "Luyện từ vựng",
    filePath: "games/ghep-van.html",
  },
  {
    slug: "doan-tu",
    title: "Đoán từ theo gợi ý",
    description: "Đọc gợi ý và đoán từ đúng. Phát triển tư duy ngôn ngữ và khả năng suy luận.",
    category: "Tư duy ngôn ngữ",
    filePath: "games/doan-tu.html",
  },
  {
    slug: "tinh-nhanh",
    title: "Tính nhẩm nhanh",
    description: "Giải nhanh các phép tính trong thời gian giới hạn. Rèn phản xạ và tư duy toán học.",
    category: "Toán tư duy",
    filePath: "games/tinh-nhanh.html",
  },
  // 10 trò chơi chủ đề AI
  {
    slug: "ai-quanh-em",
    title: "AI quanh em",
    description: "Nhận biết những thiết bị có sử dụng Trí tuệ nhân tạo trong cuộc sống hằng ngày.",
    category: "Khám phá AI",
    filePath: "games/ai-quanh-em.html",
  },
  {
    slug: "robot-phan-loai",
    title: "Robot phân loại",
    description: "Giúp robot phân nhóm đồ vật - hiểu cách AI học cách phân loại sự vật.",
    category: "Khám phá AI",
    filePath: "games/robot-phan-loai.html",
  },
  {
    slug: "may-doan-so",
    title: "Máy đoán số",
    description: "Robot AI đoán con số em nghĩ chỉ trong vài lần - khám phá cách AI tìm kiếm thông minh.",
    category: "Khám phá AI",
    filePath: "games/may-doan-so.html",
  },
  {
    slug: "tim-quy-luat",
    title: "Tìm quy luật",
    description: "Đoán hình tiếp theo trong dãy - rèn khả năng nhận diện quy luật như AI.",
    category: "Tư duy logic",
    filePath: "games/tim-quy-luat.html",
  },
  {
    slug: "nhan-dien-cam-xuc",
    title: "Nhận diện cảm xúc",
    description: "Đoán cảm xúc qua khuôn mặt - hiểu cách AI nhận diện cảm xúc và phát triển EQ.",
    category: "Kỹ năng cảm xúc",
    filePath: "games/nhan-dien-cam-xuc.html",
  },
  {
    slug: "tri-nho-robot",
    title: "Trí nhớ Robot",
    description: "Lật và ghép các cặp biểu tượng công nghệ - rèn trí nhớ như cách AI ghi nhớ dữ liệu.",
    category: "Rèn trí nhớ",
    filePath: "games/tri-nho-robot.html",
  },
  {
    slug: "lap-trinh-robot",
    title: "Lập trình Robot",
    description: "Xếp lệnh để robot đi tới đích - làm quen tư duy thuật toán, nền tảng của AI.",
    category: "Tư duy lập trình",
    filePath: "games/lap-trinh-robot.html",
  },
  {
    slug: "phan-xa-robot",
    title: "Phản xạ Robot",
    description: "Chạm nhanh vào robot, tránh bom - rèn phản xạ và sự tập trung.",
    category: "Phản xạ nhanh",
    filePath: "games/phan-xa-robot.html",
  },
  {
    slug: "sap-xep-cau",
    title: "Sắp xếp câu cùng AI",
    description: "Xếp các từ thành câu có nghĩa - hiểu cách AI xử lý ngôn ngữ và rèn diễn đạt.",
    category: "Tư duy ngôn ngữ",
    filePath: "games/sap-xep-cau.html",
  },
  {
    slug: "dung-sai-ai",
    title: "AI nói đúng hay sai?",
    description: "Phán đoán câu nói của robot đúng hay sai - rèn tư duy phản biện và kiểm chứng thông tin.",
    category: "Tư duy phản biện",
    filePath: "games/dung-sai-ai.html",
  },
  {
    slug: "doan-con-vat",
    title: "AI đoán con vật",
    description: "Đọc manh mối và đoán con vật - khám phá cách AI suy luận từ dữ liệu.",
    category: "Khám phá AI",
    filePath: "games/doan-con-vat.html",
  },
  {
    slug: "chuoi-robot",
    title: "Robot ghi nhớ chuỗi",
    description: "Lặp lại chuỗi đèn robot bật sáng - rèn trí nhớ và sự tập trung như cách AI học chuỗi.",
    category: "Rèn trí nhớ",
    filePath: "games/chuoi-robot.html",
  },
];

async function main() {
  console.log("Seeding games...");
  for (const g of games) {
    await prisma.game.upsert({
      where: { slug: g.slug },
      update: { title: g.title, description: g.description, category: g.category, filePath: g.filePath },
      create: g,
    });
    console.log(`  ✓ ${g.title}`);
  }
  console.log(`Done! ${games.length} games seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
