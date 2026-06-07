import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { JourneyShowcase } from "@/components/home/JourneyShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { getTestimonials } from "@/lib/data";
import { getContent } from "@/lib/settings";

export default async function HomePage() {
  const [testimonials, content] = await Promise.all([getTestimonials(), getContent()]);
  const { home } = content;

  return (
    <>
      <Hero content={home} portrait={home.heroImage || content.about.portrait} />
      <AboutPreview
        about={content.about}
        name={content.general.name}
        brand={content.general.brand}
      />
      <ProgramsPreview />
      <StatsBand title={home.statsTitle} stats={home.stats} />
      <JourneyShowcase />
      <Testimonials items={testimonials} />
      <ConsultationCTA />
    </>
  );
}
