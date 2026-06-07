import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { getSession } from "@/lib/auth";
import { getContent } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, content] = await Promise.all([getSession(), getContent()]);
  const brand = { name: content.general.name, brand: content.general.brand };

  return (
    <>
      <Header
        brand={brand}
        user={user ? { name: user.name, role: user.role } : null}
      />
      <main>{children}</main>
      <Footer general={content.general} />
      <FloatingContact
        phone={content.general.phone}
        zalo={content.general.zalo}
        facebook={content.general.facebook}
      />
    </>
  );
}
