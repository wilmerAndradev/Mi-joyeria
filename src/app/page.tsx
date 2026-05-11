import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { ShoppableVideos } from "@/components/sections/VideoSection";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { SetPreview } from "@/components/sections/SetPreview";
import { SocialProof } from "@/components/sections/SocialProof";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCollections />
      <ShoppableVideos />
      <Bestsellers />
      <SetPreview />
      <SocialProof />
      <Newsletter />
    </>
  );
}
