import { Settings2, Home, User, GraduationCap, Footprints, Sparkles, Handshake } from "lucide-react";
import {
  GeneralForm,
  HomeForm,
  AboutForm,
  ProgramsForm,
  JourneyForm,
  ExperienceForm,
  PartnerForm,
} from "@/components/admin/ContentForms";
import { getContent } from "@/lib/settings";

export const dynamic = "force-dynamic";

const sections = [
  { id: "chung", label: "Thông tin chung", icon: Settings2 },
  { id: "trang-chu", label: "Trang chủ", icon: Home },
  { id: "gioi-thieu", label: "Giới thiệu", icon: User },
  { id: "chuong-trinh", label: "Chương trình", icon: GraduationCap },
  { id: "hanh-trinh", label: "Hành trình", icon: Footprints },
  { id: "trai-nghiem", label: "Trải nghiệm", icon: Sparkles },
  { id: "hop-tac", label: "Hợp tác", icon: Handshake },
];

function SectionCard({
  id,
  icon: Icon,
  title,
  desc,
  children,
}: {
  id: string;
  icon: typeof Settings2;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 rounded-3xl border border-brand-100 bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-brand-950">{title}</h2>
          <p className="text-sm text-brand-950/55">{desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default async function ContentAdminPage() {
  const c = await getContent();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Nội dung trang</h1>
        <p className="mt-1.5 text-brand-950/60">
          Chỉnh sửa nội dung hiển thị trên website. Mỗi mục lưu riêng, áp dụng ngay sau khi lưu.
        </p>
      </div>

      {/* Quick nav */}
      <div className="mb-8 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 hover:border-brand-300 hover:bg-brand-50"
          >
            <s.icon className="h-3.5 w-3.5" /> {s.label}
          </a>
        ))}
      </div>

      <div className="space-y-8">
        <SectionCard id="chung" icon={Settings2} title="Thông tin chung & liên hệ" desc="Hiển thị ở đầu trang, chân trang và trang Liên hệ.">
          <GeneralForm data={c.general} />
        </SectionCard>

        <SectionCard id="trang-chu" icon={Home} title="Trang chủ" desc="Tiêu đề banner và số liệu thành quả.">
          <HomeForm data={c.home} />
        </SectionCard>

        <SectionCard id="gioi-thieu" icon={User} title="Giới thiệu" desc="Triết lý, hồ sơ chuyên môn và hình ảnh hoạt động.">
          <AboutForm data={c.about} />
        </SectionCard>

        <SectionCard id="chuong-trinh" icon={GraduationCap} title="Chương trình" desc="Nhóm kỹ năng, nội dung theo độ tuổi, đối tượng và kết quả.">
          <ProgramsForm data={c.programs} />
        </SectionCard>

        <SectionCard id="hanh-trinh" icon={Footprints} title="Hành trình" desc="Trước & sau, câu chuyện học sinh.">
          <JourneyForm data={c.journey} />
        </SectionCard>

        <SectionCard id="trai-nghiem" icon={Sparkles} title="Trải nghiệm" desc="Loại hình trải nghiệm và thư viện hình ảnh.">
          <ExperienceForm data={c.experience} />
        </SectionCard>

        <SectionCard id="hop-tac" icon={Handshake} title="Hợp tác" desc="Hình thức hợp tác, đối tượng và khối liên hệ.">
          <PartnerForm data={c.partner} />
        </SectionCard>
      </div>
    </div>
  );
}
