import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const testimonials = [
  {
    authorName: "Chị Thanh Hương",
    role: "Phụ huynh bé Minh Anh - Lớp 3",
    content:
      "Trước đây con rất ngại nói trước lớp. Sau 3 tháng học cùng Cô Duyên, con đã chủ động xung phong thuyết trình và còn về kể chuyện cho cả nhà nghe mỗi tối.",
    rating: 5,
    featured: true,
  },
  {
    authorName: "Anh Quốc Việt",
    role: "Phụ huynh bé Bảo Nam - Lớp 5",
    content:
      "Cô Duyên rất tâm lý và kiên nhẫn. Con tôi từ một cậu bé nói lí nhí giờ phát âm rõ ràng, biết cách trình bày ý kiến mạch lạc trước đám đông.",
    rating: 5,
    featured: true,
  },
  {
    authorName: "Chị Mỹ Linh",
    role: "Phụ huynh bé Khánh Vy - Lớp 2",
    content:
      "Điều tôi quý nhất là cô không chỉ dạy kỹ năng mà còn giúp con tự tin vào bản thân. Con đi học về lúc nào cũng vui và mong đến buổi học tiếp theo.",
    rating: 5,
    featured: false,
  },
];

const posts = [
  {
    slug: "dong-hanh-cung-con-trong-nhung-nam-tieu-hoc",
    title: "Đồng hành cùng con trong những năm tiểu học",
    excerpt:
      "Giai đoạn tiểu học là nền tảng hình thành nhân cách và sự tự tin. Cha mẹ nên đồng hành thế nào để con phát triển tốt nhất?",
    content:
      "Giai đoạn tiểu học là thời điểm vàng để hình thành thói quen, nhân cách và sự tự tin của trẻ. Thay vì áp đặt, cha mẹ hãy trở thành người bạn đồng hành: lắng nghe con mỗi ngày, đặt câu hỏi mở để con tập diễn đạt, và ghi nhận từng tiến bộ nhỏ. Khi con cảm thấy được tôn trọng và an toàn, con sẽ mạnh dạn thể hiện suy nghĩ của mình.\n\nMột vài gợi ý nhỏ cho cha mẹ:\n- Dành 15 phút mỗi tối để con kể về một điều thú vị trong ngày.\n- Khuyến khích con tự đưa ra quyết định trong những việc phù hợp lứa tuổi.\n- Cùng con đọc sách và trao đổi về nội dung để rèn khả năng đọc hiểu.",
    category: "Đồng hành cùng con",
    readTime: 5,
  },
  {
    slug: "khen-con-dung-cach-de-nuoi-duong-su-tu-tin",
    title: "Khen con đúng cách để nuôi dưỡng sự tự tin",
    excerpt:
      "Lời khen có sức mạnh lớn, nhưng khen sai cách có thể phản tác dụng. Hãy khen vào nỗ lực thay vì kết quả.",
    content:
      'Nhiều cha mẹ quen khen con "giỏi quá", "thông minh quá". Tuy nhiên, các nghiên cứu giáo dục cho thấy việc khen vào nỗ lực và quá trình sẽ giúp trẻ kiên trì hơn là khen vào năng lực bẩm sinh.\n\nThay vì nói "Con thật thông minh", hãy thử: "Mẹ thấy con đã rất cố gắng luyện tập phần này". Cách khen này giúp con hiểu rằng thành quả đến từ sự nỗ lực, từ đó con dám thử thách bản thân mà không sợ thất bại.',
    category: "Xây dựng sự tự tin",
    readTime: 4,
  },
  {
    slug: "giup-con-vuot-qua-noi-so-noi-truoc-dam-dong",
    title: "Giúp con vượt qua nỗi sợ nói trước đám đông",
    excerpt:
      "Sợ nói trước đám đông là điều rất tự nhiên. Quan trọng là cách chúng ta giúp con làm quen và luyện tập từng bước.",
    content:
      "Nỗi sợ nói trước đám đông xuất hiện ở cả người lớn lẫn trẻ nhỏ. Với trẻ tiểu học, cách tốt nhất là tạo môi trường an toàn để con luyện tập từng bước: nói trước gương, nói trước gia đình, rồi mới đến nhóm bạn.\n\nTại Voice & Skill, các con được luyện hơi thở, ngữ điệu và ngôn ngữ cơ thể trong không khí vui vẻ, không phán xét. Mỗi lần đứng lên là một lần con dũng cảm hơn một chút.",
    category: "Kỹ năng giao tiếp",
    readTime: 6,
  },
  {
    slug: "phuong-phap-doc-hieu-hieu-qua-cho-hoc-sinh-tieu-hoc",
    title: "Phương pháp đọc hiểu hiệu quả cho học sinh tiểu học",
    excerpt:
      "Đọc hiểu là nền tảng của mọi môn học. Hãy giúp con đọc chủ động thay vì đọc thụ động.",
    content:
      "Đọc hiểu không chỉ là đọc trơn tru mà là hiểu và ghi nhớ được nội dung. Cha mẹ có thể giúp con đọc chủ động bằng phương pháp đặt câu hỏi: Ai? Cái gì? Ở đâu? Vì sao?\n\nSau khi đọc, hãy để con kể lại bằng lời của mình. Việc này vừa rèn đọc hiểu, vừa rèn khả năng diễn đạt và ghi nhớ.",
    category: "Phương pháp học tập",
    readTime: 5,
  },
];

async function main() {
  console.log("Seeding database...");

  // Tài khoản quản trị (Cô Duyên)
  const adminEmail = (process.env.ADMIN_EMAIL ?? "coduyen@voiceskill.vn").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "CoDuyen@2026";
  const adminName = process.env.ADMIN_NAME ?? "Cô Duyên";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: adminName, role: "ADMIN" },
    create: {
      email: adminEmail,
      name: adminName,
      role: "ADMIN",
      passwordHash: await bcrypt.hash(adminPassword, 10),
    },
  });
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);

  // Tài khoản học sinh mẫu
  const studentEmail = "hocsinh@voiceskill.vn";
  const student = await prisma.user.upsert({
    where: { email: studentEmail },
    update: {},
    create: {
      email: studentEmail,
      name: "Bé Minh An",
      role: "STUDENT",
      grade: "Lớp 3",
      passwordHash: await bcrypt.hash("HocSinh@2026", 10),
    },
  });
  console.log(`Student demo: ${studentEmail} / HocSinh@2026`);

  // Bài tập mẫu
  const existingAssignment = await prisma.assignment.findFirst({
    where: { title: "Luyện kể chuyện theo tranh" },
  });
  if (!existingAssignment) {
    await prisma.assignment.create({
      data: {
        title: "Luyện kể chuyện theo tranh",
        description:
          "Con hãy quan sát một bức tranh bất kỳ ở nhà và kể lại thành một câu chuyện ngắn (4-5 câu). Chú ý nói rõ ràng, đủ ý và có cảm xúc nhé!",
        grade: "Lớp 3",
        authorId: admin.id,
      },
    });
    console.log("Created sample assignment");
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`Created ${testimonials.length} testimonials`);
  }

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Created ${posts.length} posts`);

  // Lịch khai giảng mẫu
  const scheduleCount = await prisma.classSchedule.count();
  if (scheduleCount === 0) {
    await prisma.classSchedule.createMany({
      data: [
        {
          name: "Lớp Kỹ năng Thuyết trình - Khối 1-3",
          ageGroup: "Lớp 1 - 3",
          mode: "Trực tiếp",
          schedule: "Thứ 3 - 5, 18:00 - 19:30",
          capacity: 8,
          note: "Còn 4 chỗ",
          order: 1,
        },
        {
          name: "Lớp Giao tiếp tự tin - Tiền tiểu học",
          ageGroup: "4 - 6 tuổi",
          mode: "Trực tiếp",
          schedule: "Thứ 7 - CN, 9:00 - 10:30",
          capacity: 6,
          note: "Sắp khai giảng",
          order: 2,
        },
        {
          name: "Kèm 1 - 1 Online: Luyện giọng & Thuyết trình",
          ageGroup: "Tiểu học - THCS",
          mode: "Kèm 1 - 1",
          schedule: "Linh hoạt theo lịch hẹn",
          capacity: 1,
          note: "Nhận đăng ký quanh năm",
          order: 3,
        },
      ],
    });
    console.log("Created 3 sample class schedules");
  }

  void student;
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
