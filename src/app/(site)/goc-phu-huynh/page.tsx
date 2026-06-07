import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogList } from "@/components/blog/BlogList";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Góc phụ huynh",
  description:
    "Chia sẻ kiến thức đồng hành cùng con: tâm lý học sinh tiểu học, kỹ năng giao tiếp, phương pháp học tập và xây dựng sự tự tin.",
};

export const revalidate = 600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Góc phụ huynh"
        title="Cùng cha mẹ đồng hành bên con"
        description="Những bài viết về tâm lý, kỹ năng giao tiếp và phương pháp học tập, giúp cha mẹ thấu hiểu và hỗ trợ con tốt hơn."
        crumbs={[{ label: "Góc phụ huynh" }]}
      />

      <section className="section">
        <div className="container-x">
          <BlogList posts={posts} />
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
