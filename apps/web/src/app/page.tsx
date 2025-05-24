import { FeaturedBanner } from "@/src/components/featuredBanner/featuredBanner";
import NewReleaseVideos from "@/src/components/NewReleaseVideos";
import TrendingVideos from "@/src/components/TrendingVideos";

export default async function HomePage() {
  const featured = await getFeaturedContent();

  return (
    <main className="min-h-screen bg-black text-white py-18">
      {/* Featured Banner */}
      <FeaturedBanner content={featured} />

      {/* Content Carousels */}
      <div className="space-y-8 mt-8 px-4 md:px-8">
        <TrendingVideos />
        <NewReleaseVideos />
      </div>
    </main>
  );
}

// Mock API functions
async function getFeaturedContent() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: "featured-1",
    title: "Cosmic Odyssey",
    description:
      "In the year 2157, humanity faces its greatest challenge as interstellar explorers discover an ancient alien artifact that threatens the very fabric of reality.",
    imageUrl: "https://i.ytimg.com/vi/8eb6T14AxEY/maxresdefault.jpg",
    videoId: "cosmic-odyssey",
    rating: "TV-MA",
    year: 2023,
    duration: "2h 15m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
  };
}
