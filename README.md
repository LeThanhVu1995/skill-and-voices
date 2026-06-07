# Cô Duyên - Voice & Skill

Website thương hiệu cá nhân **Cô Duyên - Voice & Skill** — dạy kỹ năng thuyết trình, luyện giọng, giao tiếp và phát triển sự tự tin cho học sinh tiểu học.

Xây dựng bằng **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma + PostgreSQL**.

## Tính năng

### Website công khai
- Trang chủ với banner, 3 giá trị nổi bật, thành quả học sinh, cảm nhận phụ huynh
- Giới thiệu Cô Duyên (hồ sơ chuyên môn, triết lý giáo dục, hình ảnh hoạt động)
- Chương trình đào tạo Voice & Skill (4 nhóm kỹ năng chi tiết)
- Hành trình thay đổi của học sinh (trước/sau, câu chuyện học sinh)
- Góc phụ huynh (blog có lọc chuyên mục, lưu trong PostgreSQL)
- Hoạt động trải nghiệm (thư viện hình ảnh)
- Trò chơi học tập (kho game công khai, chạy trong iframe sandbox)
- Hợp tác giáo dục (form gửi yêu cầu hợp tác)
- Form đăng ký tư vấn miễn phí (lưu vào PostgreSQL)
- SEO: sitemap, robots, metadata tiếng Việt; responsive; hiệu ứng mượt

### Trang quản trị (`/admin`) — dành cho Cô Duyên
- Đăng nhập bảo mật (mật khẩu băm bcrypt, phiên JWT trong cookie httpOnly)
- Tổng quan: số liệu đăng ký, bài chờ phê bình, học sinh, trò chơi
- **Nội dung trang:** chỉnh sửa nội dung hầu hết các trang công khai — Thông tin chung & liên hệ, Trang chủ (banner + số liệu), Giới thiệu (triết lý, hồ sơ, hoạt động), Chương trình (nhóm kỹ năng, độ tuổi, đối tượng, kết quả), Hành trình (trước/sau, câu chuyện), Trải nghiệm (loại hình, thư viện). Có thể thêm/bớt từng mục trong danh sách; áp dụng ngay sau khi lưu
- Quản lý đăng ký tư vấn & yêu cầu hợp tác (đổi trạng thái: Mới / Đã liên hệ / Đã chốt / Đóng)
- **Bài tập:** đăng bài tập (kèm file), ẩn/hiện, xóa
- **Phê bình:** xem bài làm của từng học sinh, chấm điểm và viết lời phê bình
- **Bài viết (Góc phụ huynh):** soạn bài bằng Markdown (có xem trước), ảnh bìa (URL hoặc tải lên), chuyên mục, đăng/ẩn, sửa, xóa
- **Học sinh:** tạo tài khoản, khóa/mở khóa, đặt lại mật khẩu
- **Trò chơi:** tải lên trò chơi bằng file HTML, ẩn/hiện, xóa

### Khu vực học tập (`/hoc-tap`) — dành cho học sinh
- Đăng nhập bằng tài khoản do Cô Duyên cấp
- Xem danh sách bài tập theo lớp, trạng thái (Chưa làm / Đã nộp / Đã phê bình)
- Làm bài, nộp bài (kèm file), nộp lại
- Xem điểm và lời phê bình của cô
- Chơi trò chơi học tập

## Bảng màu thương hiệu

| Vai trò | Màu |
|---|---|
| Đỏ đô (chủ đạo) | `brand` (#8e1f1f) |
| Vàng ánh kim (điểm nhấn) | `gold` (#c9912f) |
| Trắng / kem (nền) | `cream` (#fff9f2) |
| Xanh dương (phụ) | `ocean` (#1e418a) |

## Yêu cầu

- Node.js >= 18.17 (khuyến nghị Node 20/22)
- PostgreSQL đang chạy — **khuyến nghị dùng Docker** (đã kèm sẵn `docker-compose.yml`)

## Chạy nhanh với Docker (khuyến nghị)

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file .env từ mẫu (đã trỏ sẵn vào Postgres của Docker)
copy .env.example .env

# 3. Khởi động PostgreSQL bằng Docker
npm run db:up

# 4. Tạo bảng + nạp dữ liệu mẫu (admin, học sinh demo, bài tập, bài viết)
npm run setup

# 5. Chạy website
npm run dev
```

`docker-compose.yml` tạo sẵn database `duyen_voice_skill` (user/pass: `postgres`/`postgres`,
cổng `5432`) đúng với `DATABASE_URL` mặc định trong `.env`, dữ liệu lưu ở volume `duyen_pgdata`.

Các lệnh Docker hữu ích:

| Lệnh | Mô tả |
|---|---|
| `npm run db:up` | Bật PostgreSQL (chạy nền) |
| `npm run db:down` | Tắt container (giữ nguyên dữ liệu) |
| `npm run db:reset` | Xóa container **và toàn bộ dữ liệu** (làm lại từ đầu) |
| `npm run setup` | `prisma db push` + nạp dữ liệu mẫu |

> Nếu `npm run db:up` báo lỗi `500 Internal Server Error` hoặc `request returned 500`:
> Docker Desktop đang lỗi/chưa sẵn sàng. Hãy mở Docker Desktop và đợi đến khi
> trạng thái là **Running** (góc dưới bên trái màu xanh). Nếu vẫn lỗi, chạy
> `wsl --shutdown` trong PowerShell rồi khởi động lại Docker Desktop, sau đó thử lại.

## Cài đặt (nếu đã có PostgreSQL riêng, không dùng Docker)

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file .env từ mẫu và cập nhật DATABASE_URL + AUTH_SECRET + tài khoản admin
copy .env.example .env

# 3. Tạo bảng trong database
npm run db:push

# 4. Thêm dữ liệu mẫu + tạo tài khoản quản trị & học sinh demo
npm run db:seed

# 5. Chạy môi trường phát triển
npm run dev
```

Mở http://localhost:3000

### Tài khoản đăng nhập (sau khi `npm run db:seed`)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Quản trị (Cô Duyên) | giá trị `ADMIN_EMAIL` trong `.env` (mặc định `coduyen@voiceskill.vn`) | giá trị `ADMIN_PASSWORD` (mặc định `CoDuyen@2026`) |
| Học sinh demo | `hocsinh@voiceskill.vn` | `HocSinh@2026` |

> Trang đăng nhập: `/dang-nhap`. Quản trị tự động vào `/admin`, học sinh vào `/hoc-tap`.
> Hãy đổi `AUTH_SECRET` và `ADMIN_PASSWORD` trong `.env` thành giá trị bí mật trước khi triển khai thật.

> Lưu ý: Website công khai vẫn hiển thị đầy đủ ngay cả khi chưa kết nối database
> (bài viết/cảm nhận dùng dữ liệu dự phòng). Các tính năng đăng nhập, bài tập,
> trò chơi và lưu form cần database.

### Bảo mật & lưu ý
- Mật khẩu được băm bằng **bcrypt**; phiên đăng nhập dùng **JWT** ký HS256 lưu trong cookie `httpOnly`.
- Route `/admin/**` và `/hoc-tap/**` được bảo vệ bằng middleware.
- File tải lên (đề bài, bài nộp) lưu ở thư mục `storage/` và chỉ phục vụ cho người đã đăng nhập qua `/api/files/...`.
- Trò chơi HTML chạy trong **iframe sandbox** + `Content-Security-Policy: frame-ancestors 'self'`. Chỉ nên tải lên trò chơi từ nguồn tin cậy.
- `storage/` được `.gitignore` (không commit file tải lên). Khi triển khai cần ổ đĩa lưu trữ bền (không dùng hạ tầng chỉ-đọc/ephemeral nếu muốn giữ file).

## Lệnh hữu ích

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy môi trường phát triển |
| `npm run build` | Build production (tự động `prisma generate`) |
| `npm run start` | Chạy bản production |
| `npm run db:push` | Đồng bộ schema vào database |
| `npm run db:seed` | Thêm dữ liệu mẫu |
| `npm run db:studio` | Mở Prisma Studio xem dữ liệu |

## Cấu trúc thư mục

```
prisma/
  schema.prisma      # Models: User, Assignment, Submission, Game, Consultation, Partnership, Post, Testimonial
  seed.mjs           # Tạo admin, học sinh demo, bài tập mẫu, bài viết, cảm nhận
storage/             # File tải lên (đề bài, bài nộp, game html) — không commit
src/
  middleware.ts      # Bảo vệ /admin và /hoc-tap
  app/
    layout.tsx       # Layout gốc (html/body/fonts)
    actions.ts       # Server actions form công khai (tư vấn, hợp tác)
    auth-actions.ts  # Đăng nhập / đăng xuất
    dang-nhap/       # Trang đăng nhập
    (site)/          # Nhóm trang công khai (có Header/Footer)
      page.tsx       # Trang chủ
      gioi-thieu/ chuong-trinh/ hanh-trinh/ goc-phu-huynh/ trai-nghiem/ hop-tac/ lien-he/
      tro-choi/      # Kho game + [slug] (chơi) + [slug]/play (route phục vụ HTML)
    admin/           # Trang quản trị (layout bảo vệ ADMIN)
      page.tsx       # Tổng quan
      actions.ts     # Server actions quản trị (lead, bài tập, học sinh, trò chơi, bài viết)
      tu-van/ hop-tac/ bai-tap/ bai-tap/[id]/ bai-viet/ bai-viet/moi/ bai-viet/[id]/ hoc-sinh/ tro-choi/
    hoc-tap/         # Khu vực học sinh (layout bảo vệ đăng nhập)
      page.tsx       # Danh sách bài tập
      actions.ts     # Nộp bài
      bai-tap/[id]/  # Làm bài + xem phê bình
    api/files/[...key]/  # Phục vụ file tải lên (yêu cầu đăng nhập)
    media/[...key]/      # Phục vụ ảnh bìa bài viết (công khai, chỉ ảnh)
  components/
    layout/  home/  forms/  blog/  admin/  ui/
  lib/
    prisma.ts        # Prisma client
    auth.ts          # Băm mật khẩu, phiên JWT, requireUser/requireAdmin
    storage.ts       # Lưu/đọc file tải lên
    slug.ts          # Tạo slug + trích xuất tiêu đề (mục lục)
    site.ts content.ts data.ts fallback.ts
```

## Tùy biến

- **Thông tin liên hệ, mạng xã hội:** `src/lib/site.ts`
- **Nội dung chương trình, giá trị, hoạt động:** `src/lib/content.ts`
- **Màu sắc thương hiệu:** `tailwind.config.ts`
- **Hình ảnh:** thay các vùng có ghi chú `* Thay ảnh ...` bằng ảnh thật của Cô Duyên (đặt trong `public/` và dùng `next/image`).

## Triển khai Production (Neon PostgreSQL)

Schema đã được đồng bộ lên Neon. Khi deploy (Vercel, VPS, Render...), cần đặt các biến môi trường trên hosting (KHÔNG commit vào git):

```
DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
AUTH_SECRET="<chuỗi ngẫu nhiên dài, bí mật>"
ADMIN_EMAIL="huynhduyen18813@gmail.com"
ADMIN_PASSWORD="<mật khẩu mạnh>"
NOTIFY_WEBHOOK_URL=""   # tùy chọn
```

Các lệnh đồng bộ schema & nạp dữ liệu lên Neon (chạy 1 lần):

```bash
# Đồng bộ schema
DATABASE_URL="<neon-url>" npx prisma db push
# Nạp dữ liệu khởi tạo (admin, bài viết, lịch, trò chơi)
DATABASE_URL="<neon-url>" node prisma/seed.mjs
DATABASE_URL="<neon-url>" node prisma/seed-games.mjs
```

> **Lưu ý quan trọng về tệp tải lên (storage):**
> Ứng dụng lưu ảnh/clip/file tải lên trong thư mục `storage/` trên ổ đĩa.
> - Trên **VPS / máy chủ Node** (có ổ đĩa bền): hoạt động tốt.
> - Trên **Vercel/serverless** (hệ thống tệp chỉ đọc, tạm thời): các file tải lên
>   lúc chạy sẽ KHÔNG được lưu lại. Nếu deploy lên Vercel, cần chuyển phần lưu trữ
>   sang dịch vụ object storage (Vercel Blob, AWS S3...). Các trò chơi mẫu trong
>   `storage/games/` đã được commit nên vẫn dùng được.
