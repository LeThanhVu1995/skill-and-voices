import {
  Mic,
  Brain,
  Sparkles,
  MessageCircle,
  Presentation,
  AudioLines,
  BookOpen,
  Users,
  Theater,
  MapPin,
  School,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export type ValueItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const coreValues: ValueItem[] = [
  {
    icon: Mic,
    title: "Luyện giọng & giao tiếp",
    desc: "Giúp trẻ phát âm rõ ràng, nói đủ ý và diễn đạt một cách tự tin.",
  },
  {
    icon: Brain,
    title: "Phát triển tư duy",
    desc: "Rèn kỹ năng đọc hiểu, phản biện và trình bày suy nghĩ mạch lạc.",
  },
  {
    icon: Sparkles,
    title: "Xây dựng sự tự tin",
    desc: "Giúp trẻ mạnh dạn thể hiện bản thân trước lớp và trước đám đông.",
  },
];

export type StatItem = {
  value: string;
  label: string;
};

export const stats: StatItem[] = [
  { value: "1.200+", label: "Học sinh đã tham gia" },
  { value: "150+", label: "Lớp kỹ năng đã tổ chức" },
  { value: "8", label: "Năm kinh nghiệm giáo dục" },
  { value: "98%", label: "Phụ huynh hài lòng" },
];

export type ProgramGroup = {
  icon: LucideIcon;
  title: string;
  color: string;
  items: string[];
};

export const programGroups: ProgramGroup[] = [
  {
    icon: MessageCircle,
    title: "Kỹ năng giao tiếp",
    color: "brand",
    items: ["Chào hỏi lễ phép", "Giới thiệu bản thân", "Trình bày ý kiến"],
  },
  {
    icon: Presentation,
    title: "Kỹ năng thuyết trình",
    color: "gold",
    items: ["Nói trước đám đông", "Kể chuyện cuốn hút", "Thuyết trình theo chủ đề"],
  },
  {
    icon: AudioLines,
    title: "Luyện giọng",
    color: "ocean",
    items: ["Phát âm chuẩn", "Điều tiết hơi thở", "Ngữ điệu truyền cảm"],
  },
  {
    icon: BookOpen,
    title: "Phát triển tư duy",
    color: "brand",
    items: ["Đọc hiểu sâu", "Tư duy phản biện", "Giải quyết vấn đề"],
  },
];

export type JourneyItem = {
  before: string;
  after: string;
};

export const journeyItems: JourneyItem[] = [
  { before: "Rụt rè, ngại tiếp xúc", after: "Chủ động chào hỏi, kết bạn" },
  { before: "Ngại phát biểu", after: "Tự tin giơ tay phát biểu" },
  { before: "Nói nhỏ, không rõ ý", after: "Trình bày mạch lạc, đủ ý" },
  { before: "Né tránh đám đông", after: "Tích cực tham gia hoạt động" },
];

export type ExperienceItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const experiences: ExperienceItem[] = [
  {
    icon: MapPin,
    title: "Dã ngoại & tham quan",
    desc: "Học sinh trải nghiệm thực tế, mở rộng vốn sống và sự quan sát.",
  },
  {
    icon: Users,
    title: "Hoạt động nhóm",
    desc: "Rèn khả năng làm việc nhóm, lắng nghe và phối hợp cùng bạn bè.",
  },
  {
    icon: Theater,
    title: "Sân khấu hóa",
    desc: "Hóa thân vào nhân vật, tự tin biểu diễn và thể hiện cảm xúc.",
  },
  {
    icon: Presentation,
    title: "Thuyết trình thực tế",
    desc: "Áp dụng kỹ năng đã học vào các buổi trình bày trước khán giả.",
  },
];

export type PartnerForm = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const partnerForms: PartnerForm[] = [
  {
    icon: Sparkles,
    title: "Chuyên đề kỹ năng sống",
    desc: "Thiết kế chuyên đề phù hợp từng khối lớp và mục tiêu nhà trường.",
  },
  {
    icon: MessageCircle,
    title: "Chuyên đề giao tiếp & thuyết trình",
    desc: "Buổi học truyền cảm hứng, giúp học sinh dạn dĩ và biết diễn đạt.",
  },
  {
    icon: Users,
    title: "Câu lạc bộ kỹ năng",
    desc: "Tổ chức và đồng hành vận hành CLB kỹ năng định kỳ tại trường.",
  },
  {
    icon: MapPin,
    title: "Hoạt động trải nghiệm",
    desc: "Phối hợp tổ chức ngày hội, hoạt động ngoại khóa gắn với kỹ năng.",
  },
];

export type PartnerAudience = {
  icon: LucideIcon;
  label: string;
};

export const partnerAudiences: PartnerAudience[] = [
  { icon: School, label: "Trường Tiểu học" },
  { icon: BookOpen, label: "Trung tâm giáo dục" },
  { icon: Handshake, label: "Đơn vị đào tạo" },
];

export const philosophy =
  "Mỗi đứa trẻ đều có tiếng nói riêng. Khi được lắng nghe và hướng dẫn đúng cách, các em sẽ tự tin thể hiện giá trị của bản thân.";

export const aboutHighlights: string[] = [
  "Giáo viên Tiểu học",
  "Chuyên đào tạo kỹ năng giao tiếp",
  "Kỹ năng thuyết trình",
  "Luyện giọng nói",
  "Tư vấn tâm lý & đồng hành cùng phụ huynh",
];

export type TeachingGroup = {
  icon: LucideIcon;
  age: string;
  title: string;
  items: string[];
};

/** Nội dung đồng hành học tập - trình bày theo hướng kỹ năng & phương pháp. */
export const teachingContent: TeachingGroup[] = [
  {
    icon: Sparkles,
    age: "4 – 6 tuổi",
    title: "Tiền tiểu học",
    items: [
      "Làm quen đọc – viết nhẹ nhàng",
      "Toán tư duy cơ bản",
      "Rèn tập trung & kỹ năng học tập đầu đời",
      "Mạnh dạn, tự tin trước khi vào lớp 1",
    ],
  },
  {
    icon: BookOpen,
    age: "Lớp 1 – 5",
    title: "Đồng hành học tập tiểu học",
    items: [
      "Phương pháp đọc hiểu văn bản hiệu quả",
      "Củng cố nền tảng Toán – Tiếng Việt",
      "Mở rộng từ vựng & phản xạ giao tiếp",
      "Xây dựng thói quen tự học tích cực",
    ],
  },
  {
    icon: Presentation,
    age: "Tiểu học – THCS",
    title: "Kỹ năng thuyết trình & tự tin",
    items: [
      "Luyện giọng, phát âm, ngữ điệu",
      "Trình bày trước đám đông không e ngại",
      "Tư duy phản biện & sắp xếp ý",
      "Tư vấn tâm lý, đồng hành vượt rào cản",
    ],
  },
];

export type Audience = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const audiences: Audience[] = [
  {
    icon: Mic,
    title: "Trẻ còn rụt rè, ngại nói",
    desc: "Các em e ngại khi trình bày trước đám đông, cần môi trường an toàn để mạnh dạn hơn.",
  },
  {
    icon: Brain,
    title: "Cần cải thiện phương pháp học",
    desc: "Học sinh học chậm, chưa có thói quen tự học, cần được hỗ trợ kèm 1 - 1 sát sao.",
  },
  {
    icon: Sparkles,
    title: "Muốn phát triển kỹ năng",
    desc: "Phụ huynh mong con tự tin giao tiếp, thuyết trình tốt và phát triển tư duy toàn diện.",
  },
];

export const complianceNote =
  "Các lớp tập trung vào kỹ năng (thuyết trình, giao tiếp, tự tin), tư vấn tâm lý và phương pháp học tập, đồng hành cùng phụ huynh; tổ chức theo nhóm nhỏ hoặc kèm 1 - 1, tuân thủ quy định hiện hành.";
