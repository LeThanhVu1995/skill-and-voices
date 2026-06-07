"use client";

// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
  saveGeneral,
  saveHome,
  saveAbout,
  savePrograms,
  saveJourney,
  saveExperience,
  savePartner,
  type ContentResult,
} from "@/app/admin/noi-dung/actions";
import type {
  GeneralContent,
  HomeContent,
  AboutContent,
  ProgramsContent,
  JourneyContent,
  ExperienceContent,
  PartnerContent,
} from "@/lib/settings";
import { ListEditor, StringListEditor } from "./ListEditors";
import { MediaGalleryEditor } from "./MediaGalleryEditor";

const initial: ContentResult = { status: "idle", message: "" };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" /> Lưu thay đổi
        </>
      )}
    </button>
  );
}

function Status({ state }: { state: ContentResult }) {
  if (state.status === "success")
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        <CheckCircle2 className="h-5 w-5" /> {state.message}
      </div>
    );
  if (state.status === "error")
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
        <AlertCircle className="h-5 w-5" /> {state.message}
      </div>
    );
  return null;
}

function Field({
  name,
  label,
  defaultValue,
  textarea = false,
  rows = 3,
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-900">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue}
          className="w-full resize-none rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      ) : (
        <input
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      )}
    </div>
  );
}

export function GeneralForm({ data }: { data: GeneralContent }) {
  const [state, action] = useFormState(saveGeneral, initial);
  return (
    <form action={action} className="space-y-4">
      <Status state={state} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Tên thương hiệu" defaultValue={data.name} required />
        <Field name="brand" label="Tên phụ (Voice & Skill)" defaultValue={data.brand} />
      </div>
      <Field name="tagline" label="Khẩu hiệu ngắn" defaultValue={data.tagline} />
      <Field name="description" label="Mô tả thương hiệu" defaultValue={data.description} textarea />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="phone" label="Số điện thoại / Zalo" defaultValue={data.phone} required />
        <Field name="email" label="Email" defaultValue={data.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="addressNote" label="Tên cơ sở" defaultValue={data.addressNote} />
        <Field name="address" label="Địa chỉ" defaultValue={data.address} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="facebook" label="Link Facebook" defaultValue={data.facebook} />
        <Field name="zalo" label="Link Zalo" defaultValue={data.zalo} />
      </div>
      <Field name="slogan" label="Slogan (chữ viết tay ở footer)" defaultValue={data.slogan} />
      <SaveButton />
    </form>
  );
}

export function HomeForm({ data }: { data: HomeContent }) {
  const [state, action] = useFormState(saveHome, initial);
  const stats = [0, 1, 2, 3].map((i) => data.stats[i] ?? { value: "", label: "" });
  return (
    <form action={action} className="space-y-4">
      <Status state={state} />

      <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-4">
        <label className="mb-1.5 block text-sm font-medium text-brand-900">
          Ảnh banner trang chủ (khác ảnh giới thiệu giáo viên)
        </label>
        {data.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.heroImage} alt="Ảnh banner" className="mb-3 aspect-[4/5] w-32 rounded-2xl border border-brand-100 object-cover" />
        )}
        <input
          name="heroUrl"
          type="url"
          defaultValue={data.heroImage && !data.heroImage.startsWith("/media/") ? data.heroImage : ""}
          placeholder="Dán URL ảnh (https://...)"
          className="w-full rounded-xl border border-brand-100 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <p className="my-2 text-center text-xs text-brand-950/40">hoặc tải ảnh lên</p>
        <input
          name="heroFile"
          type="file"
          accept=".png,.jpg,.jpeg,.gif,.webp"
          className="w-full rounded-xl border border-brand-100 px-3 py-2 text-xs text-brand-950/70 file:mr-2 file:rounded-lg file:border-0 file:bg-brand-700 file:px-2.5 file:py-1.5 file:text-white"
        />
        <p className="mt-1.5 text-xs text-brand-950/45">
          Bỏ trống sẽ dùng ảnh chân dung ở mục Giới thiệu.
        </p>
      </div>

      <Field name="heroEyebrow" label="Nhãn nhỏ phía trên tiêu đề" defaultValue={data.heroEyebrow} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field name="heroTitleLead" label="Tiêu đề - phần đầu" defaultValue={data.heroTitleLead} />
        <Field name="heroTitleHighlight" label="Tiêu đề - phần tô màu" defaultValue={data.heroTitleHighlight} />
        <Field name="heroTitleRest" label="Tiêu đề - phần còn lại" defaultValue={data.heroTitleRest} />
      </div>
      <Field name="heroSubtitle" label="Đoạn mô tả dưới tiêu đề" defaultValue={data.heroSubtitle} textarea />
      <Field name="heroProof" label="Dòng chứng thực (số học sinh...)" defaultValue={data.heroProof} />

      <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
        <Field name="statsTitle" label="Tiêu đề khu vực số liệu" defaultValue={data.statsTitle} />
        <p className="mb-2 mt-4 text-sm font-medium text-brand-900">4 số liệu thành quả</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 rounded-xl bg-white p-3">
              <input
                name={`stat_value_${i}`}
                defaultValue={s.value}
                placeholder="VD: 1.200+"
                className="rounded-xl border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <input
                name={`stat_label_${i}`}
                defaultValue={s.label}
                placeholder="VD: Học sinh đã tham gia"
                className="rounded-xl border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
            </div>
          ))}
        </div>
      </div>

      <SaveButton />
    </form>
  );
}

export function AboutForm({ data }: { data: AboutContent }) {
  const [state, action] = useFormState(saveAbout, initial);
  return (
    <form action={action} className="space-y-4">
      <Status state={state} />

      <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-4">
        <label className="mb-1.5 block text-sm font-medium text-brand-900">
          Ảnh chân dung Cô Duyên
        </label>
        {data.portrait && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.portrait} alt="Ảnh chân dung" className="mb-3 h-32 w-32 rounded-2xl object-cover border border-brand-100" />
        )}
        <input
          name="portraitUrl"
          type="url"
          defaultValue={data.portrait && !data.portrait.startsWith("/media/") ? data.portrait : ""}
          placeholder="Dán URL ảnh (https://...)"
          className="w-full rounded-xl border border-brand-100 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <p className="my-2 text-center text-xs text-brand-950/40">hoặc tải ảnh lên</p>
        <input
          name="portraitFile"
          type="file"
          accept=".png,.jpg,.jpeg,.gif,.webp"
          className="w-full rounded-xl border border-brand-100 px-3 py-2 text-xs text-brand-950/70 file:mr-2 file:rounded-lg file:border-0 file:bg-brand-700 file:px-2.5 file:py-1.5 file:text-white"
        />
      </div>

      <Field name="title" label="Tiêu đề trang" defaultValue={data.title} required />
      <Field name="intro" label="Đoạn giới thiệu" defaultValue={data.intro} textarea rows={4} />
      <Field name="philosophy" label="Triết lý giáo dục (câu trích dẫn)" defaultValue={data.philosophy} textarea />
      <StringListEditor
        name="highlights"
        label="Chuyên môn (mỗi dòng 1 mục)"
        initial={data.highlights}
        placeholder="VD: Kỹ năng thuyết trình"
      />
      <MediaGalleryEditor
        name="activities"
        label="Hình ảnh / video hoạt động"
        initial={data.activities}
      />
      <SaveButton />
    </form>
  );
}

export function ProgramsForm({ data }: { data: ProgramsContent }) {
  const [state, action] = useFormState(savePrograms, initial);
  return (
    <form action={action} className="space-y-5">
      <Status state={state} />
      <Field name="heroTitle" label="Tiêu đề trang" defaultValue={data.heroTitle} required />
      <Field name="heroDesc" label="Mô tả dưới tiêu đề" defaultValue={data.heroDesc} textarea />

      <ListEditor
        name="skillGroups"
        label="4 nhóm kỹ năng (mục con cách nhau bởi dấu phẩy)"
        fields={[
          { key: "title", label: "Tên nhóm" },
          { key: "itemsText", label: "Các mục (phân tách bằng dấu ,)", textarea: true },
        ]}
        initial={data.skillGroups.map((g) => ({ title: g.title, itemsText: g.items.join(", ") }))}
        template={{ title: "", itemsText: "" }}
        addLabel="Thêm nhóm kỹ năng"
      />

      <ListEditor
        name="teaching"
        label="Nội dung theo độ tuổi"
        fields={[
          { key: "age", label: "Độ tuổi" },
          { key: "title", label: "Tiêu đề" },
          { key: "itemsText", label: "Các mục (phân tách bằng dấu ,)", textarea: true },
        ]}
        initial={data.teaching.map((t) => ({ age: t.age, title: t.title, itemsText: t.items.join(", ") }))}
        template={{ age: "", title: "", itemsText: "" }}
        addLabel="Thêm nhóm độ tuổi"
      />

      <ListEditor
        name="audiences"
        label="Đối tượng phù hợp"
        fields={[
          { key: "title", label: "Tiêu đề" },
          { key: "desc", label: "Mô tả", textarea: true },
        ]}
        initial={data.audiences}
        template={{ title: "", desc: "" }}
        addLabel="Thêm đối tượng"
      />

      <StringListEditor name="outcomes" label="Kết quả đầu ra" initial={data.outcomes} />
      <Field name="compliance" label="Ghi chú tuân thủ quy định" defaultValue={data.compliance} textarea />
      <SaveButton />
    </form>
  );
}

export function JourneyForm({ data }: { data: JourneyContent }) {
  const [state, action] = useFormState(saveJourney, initial);
  return (
    <form action={action} className="space-y-5">
      <Status state={state} />
      <Field name="heroTitle" label="Tiêu đề trang" defaultValue={data.heroTitle} required />
      <Field name="heroDesc" label="Mô tả dưới tiêu đề" defaultValue={data.heroDesc} textarea />

      <ListEditor
        name="items"
        label="Trước & Sau"
        fields={[
          { key: "before", label: "Trước khi tham gia" },
          { key: "after", label: "Sau khi rèn luyện" },
        ]}
        initial={data.items}
        template={{ before: "", after: "" }}
        addLabel="Thêm cặp Trước - Sau"
      />

      <ListEditor
        name="stories"
        label="Câu chuyện học sinh"
        fields={[
          { key: "name", label: "Tên học sinh" },
          { key: "grade", label: "Lớp" },
          { key: "quote", label: "Lời chia sẻ", textarea: true },
          { key: "before", label: "Trước" },
          { key: "after", label: "Sau" },
        ]}
        initial={data.stories}
        template={{ name: "", grade: "", quote: "", before: "", after: "" }}
        addLabel="Thêm câu chuyện"
      />

      <MediaGalleryEditor
        name="gallery"
        label="Thư viện ảnh / video hành trình"
        initial={data.gallery}
      />
      <SaveButton />
    </form>
  );
}

export function ExperienceForm({ data }: { data: ExperienceContent }) {
  const [state, action] = useFormState(saveExperience, initial);
  return (
    <form action={action} className="space-y-5">
      <Status state={state} />
      <Field name="heroTitle" label="Tiêu đề trang" defaultValue={data.heroTitle} required />
      <Field name="heroDesc" label="Mô tả dưới tiêu đề" defaultValue={data.heroDesc} textarea />

      <ListEditor
        name="experiences"
        label="Các loại hình trải nghiệm"
        fields={[
          { key: "title", label: "Tiêu đề" },
          { key: "desc", label: "Mô tả", textarea: true },
        ]}
        initial={data.experiences}
        template={{ title: "", desc: "" }}
        addLabel="Thêm loại hình"
      />

      <MediaGalleryEditor
        name="gallery"
        label="Thư viện ảnh / video trải nghiệm"
        initial={data.gallery}
      />
      <SaveButton />
    </form>
  );
}

export function PartnerForm({ data }: { data: PartnerContent }) {
  const [state, action] = useFormState(savePartner, initial);
  return (
    <form action={action} className="space-y-5">
      <Status state={state} />
      <Field name="heroTitle" label="Tiêu đề trang" defaultValue={data.heroTitle} required />
      <Field name="heroDesc" label="Mô tả dưới tiêu đề" defaultValue={data.heroDesc} textarea />

      <ListEditor
        name="forms"
        label="Các hình thức hợp tác"
        fields={[
          { key: "title", label: "Tiêu đề" },
          { key: "desc", label: "Mô tả", textarea: true },
        ]}
        initial={data.forms}
        template={{ title: "", desc: "" }}
        addLabel="Thêm hình thức"
      />

      <StringListEditor
        name="audiences"
        label="Đối tượng hợp tác"
        initial={data.audiences}
        placeholder="VD: Trường Tiểu học"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="ctaTitle" label="Tiêu đề khối liên hệ" defaultValue={data.ctaTitle} />
        <Field name="ctaDesc" label="Mô tả khối liên hệ" defaultValue={data.ctaDesc} />
      </div>
      <SaveButton />
    </form>
  );
}
