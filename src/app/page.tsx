import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { WorkSection } from "@/components/WorkSection";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { getAllProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <>
      <Nav />
      <Hero />
      <Marquee
        items={[
          "Available for new work / 2026",
          "Brand systems",
          "Campaigns",
          "Creative direction",
          "Now booking",
        ]}
        variant="alt"
      />
      <WorkSection projects={projects} />
      <Marquee
        items={[
          "Fitbit",
          "Heath Ceramics",
          "Huckberry",
          "Chrome Industries",
          "Google",
          "Sol Republic",
          "Somnee",
        ]}
      />
      <About />
      <Footer />
    </>
  );
}
