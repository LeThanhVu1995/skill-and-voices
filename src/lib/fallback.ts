export type TestimonialData = {
  id: string;
  authorName: string;
  role: string | null;
  content: string;
  rating: number;
};

export const fallbackTestimonials: TestimonialData[] = [
  {
    id: "t1",
    authorName: "Chị Thanh Hương",
    role: "Phụ huynh bé Minh Anh - Lớp 3",
    content:
      "Trước đây con rất ngại nói trước lớp. Sau 3 tháng học cùng Cô Duyên, con đã chủ động xung phong thuyết trình và còn về kể chuyện cho cả nhà nghe mỗi tối.",
    rating: 5,
  },
  {
    id: "t2",
    authorName: "Anh Quốc Việt",
    role: "Phụ huynh bé Bảo Nam - Lớp 5",
    content:
      "Cô Duyên rất tâm lý và kiên nhẫn. Con tôi từ một cậu bé nói lí nhí giờ phát âm rõ ràng, biết cách trình bày ý kiến mạch lạc trước đám đông.",
    rating: 5,
  },
  {
    id: "t3",
    authorName: "Chị Mỹ Linh",
    role: "Phụ huynh bé Khánh Vy - Lớp 2",
    content:
      "Điều tôi quý nhất là cô không chỉ dạy kỹ năng mà còn giúp con tự tin vào bản thân. Con đi học về lúc nào cũng vui và mong đến buổi học tiếp theo.",
    rating: 5,
  },
];

export type PostData = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  readTime: number;
  publishedAt: string;
};

export const fallbackPosts: PostData[] = [
  {
    id: "p1",
    slug: "dong-hanh-cung-con-trong-nhung-nam-tieu-hoc",
    title: "Đồng hành cùng con trong những năm tiểu học",
    excerpt:
      "Giai đoạn tiểu học là nền tảng hình thành nhân cách và sự tự tin. Cha mẹ nên đồng hành thế nào để con phát triển tốt nhất?",
    coverImage: null,
    category: "Đồng hành cùng con",
    readTime: 5,
    publishedAt: "2026-05-20",
    content: `Giai đoạn tiểu học là thời điểm vàng để hình thành thói quen, nhân cách và sự tự tin của trẻ. Đây là lúc con bắt đầu định hình cách nhìn về bản thân và thế giới xung quanh.

## Vì sao giai đoạn này quan trọng?

Ở lứa tuổi 6-11, não bộ của trẻ phát triển mạnh về ngôn ngữ và cảm xúc xã hội. Những trải nghiệm tích cực trong giai đoạn này sẽ theo con đến suốt cuộc đời. Thay vì áp đặt, cha mẹ hãy trở thành **người bạn đồng hành** của con.

## Cha mẹ nên làm gì mỗi ngày?

- Dành 15 phút mỗi tối để con kể về một điều thú vị trong ngày.
- Đặt câu hỏi mở để con tập diễn đạt: "Hôm nay điều gì làm con vui nhất?"
- Khuyến khích con tự đưa ra quyết định trong những việc phù hợp lứa tuổi.
- Cùng con đọc sách và trao đổi về nội dung để rèn khả năng đọc hiểu.

## Lắng nghe quan trọng hơn lời khuyên

> Khi con cảm thấy được tôn trọng và an toàn, con sẽ mạnh dạn thể hiện suy nghĩ của mình.

Nhiều khi con không cần một lời khuyên, con chỉ cần được lắng nghe. Hãy kiên nhẫn, vì mỗi đứa trẻ lớn lên theo nhịp độ riêng của mình.`,
  },
  {
    id: "p2",
    slug: "khen-con-dung-cach-de-nuoi-duong-su-tu-tin",
    title: "Khen con đúng cách để nuôi dưỡng sự tự tin",
    excerpt:
      "Lời khen có sức mạnh lớn, nhưng khen sai cách có thể phản tác dụng. Hãy khen vào nỗ lực thay vì kết quả.",
    coverImage: null,
    category: "Xây dựng sự tự tin",
    readTime: 4,
    publishedAt: "2026-05-12",
    content: `Nhiều cha mẹ quen khen con "giỏi quá", "thông minh quá". Tuy nhiên, các nghiên cứu giáo dục cho thấy việc khen vào **nỗ lực và quá trình** sẽ giúp trẻ kiên trì hơn là khen vào năng lực bẩm sinh.

## Khen nỗ lực thay vì khen tài năng

Thay vì nói "Con thật thông minh", hãy thử:

> "Mẹ thấy con đã rất cố gắng luyện tập phần này."

Cách khen này giúp con hiểu rằng thành quả đến từ sự nỗ lực, từ đó con dám thử thách bản thân mà không sợ thất bại.

## Ba nguyên tắc khi khen con

1. **Cụ thể:** chỉ rõ điều con làm tốt, đừng khen chung chung.
2. **Chân thành:** trẻ cảm nhận được lời khen có thật lòng hay không.
3. **Đúng lúc:** khen ngay khi con thể hiện nỗ lực hoặc tiến bộ.

Một lời khen đúng cách hôm nay là một viên gạch xây nên sự tự tin của con ngày mai.`,
  },
  {
    id: "p3",
    slug: "giup-con-vuot-qua-noi-so-noi-truoc-dam-dong",
    title: "Giúp con vượt qua nỗi sợ nói trước đám đông",
    excerpt:
      "Sợ nói trước đám đông là điều rất tự nhiên. Quan trọng là cách chúng ta giúp con làm quen và luyện tập từng bước.",
    coverImage: null,
    category: "Kỹ năng giao tiếp",
    readTime: 6,
    publishedAt: "2026-05-04",
    content: `Nỗi sợ nói trước đám đông xuất hiện ở cả người lớn lẫn trẻ nhỏ. Với trẻ tiểu học, điều quan trọng không phải là ép con "dạn dĩ" ngay, mà là tạo môi trường an toàn để con luyện tập.

## Luyện tập theo từng bước nhỏ

- **Bước 1:** Nói trước gương, tự giới thiệu bản thân.
- **Bước 2:** Nói trước gia đình, kể một câu chuyện ngắn.
- **Bước 3:** Nói trước nhóm bạn thân quen.
- **Bước 4:** Trình bày trước lớp.

Mỗi lần đứng lên là một lần con dũng cảm hơn một chút.

## Vai trò của hơi thở và ngữ điệu

Tại Voice & Skill, các con được luyện hơi thở, ngữ điệu và ngôn ngữ cơ thể trong không khí vui vẻ, không phán xét. Khi con biết cách hít thở sâu, con sẽ bình tĩnh và tự tin hơn.

> Tự tin không phải là không sợ, mà là vẫn làm dù có một chút lo lắng.`,
  },
  {
    id: "p4",
    slug: "phuong-phap-doc-hieu-hieu-qua-cho-hoc-sinh-tieu-hoc",
    title: "Phương pháp đọc hiểu hiệu quả cho học sinh tiểu học",
    excerpt:
      "Đọc hiểu là nền tảng của mọi môn học. Hãy giúp con đọc chủ động thay vì đọc thụ động.",
    coverImage: null,
    category: "Phương pháp học tập",
    readTime: 5,
    publishedAt: "2026-04-26",
    content: `Đọc hiểu không chỉ là đọc trơn tru mà là **hiểu và ghi nhớ** được nội dung. Đây là kỹ năng nền tảng cho tất cả các môn học của con.

## Đọc chủ động bằng cách đặt câu hỏi

Cha mẹ có thể giúp con đọc chủ động bằng phương pháp đặt câu hỏi:

- Ai là nhân vật chính?
- Câu chuyện xảy ra ở đâu?
- Điều gì đã xảy ra và vì sao?

## Kể lại bằng lời của con

Sau khi đọc, hãy để con kể lại bằng lời của mình. Việc này vừa rèn đọc hiểu, vừa rèn khả năng diễn đạt và ghi nhớ.

> Một cuốn sách hay được kể lại sẽ trở thành câu chuyện của riêng con.`,
  },
];

export const postCategories = [
  "Tất cả",
  "Đồng hành cùng con",
  "Xây dựng sự tự tin",
  "Kỹ năng giao tiếp",
  "Tâm lý học sinh tiểu học",
  "Phương pháp học tập",
];
