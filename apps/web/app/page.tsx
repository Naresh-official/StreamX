import { FeaturedBanner } from "@/components/featuredBanner/featuredBanner";
import NewReleaseVideos from "@/components/NewReleaseVideos";
import TrendingVideos from "@/components/TrendingVideos";
import { redirect } from "next/navigation";

// Mock function to check if user is authenticated
// In a real app, this would use a proper auth system
function isAuthenticated() {
  // For demo purposes, returning true
  // In production, check session/token validity
  return true;
}

export default async function HomePage() {
  // Check authentication
  if (!isAuthenticated()) {
    redirect("/login");
  }

  // Fetch featured content
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
