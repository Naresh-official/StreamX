import { FeaturedBanner } from "@/components/featuredBanner/featuredBanner";
import { VideoCarousel } from "@/components/videoCarousel/VideoCarousel";
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

  // Fetch category data in parallel
  const [trending, recommended, newReleases] = await Promise.all([
    getTrendingContent(),
    getRecommendedContent(),
    getNewReleasesContent(),
  ]);

  return (
    <main className="min-h-screen bg-black text-white py-18">
      {/* Featured Banner */}
      <FeaturedBanner content={featured} />

      {/* Content Carousels */}
      <div className="space-y-8 mt-8 px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Trending Now</h2>
        <VideoCarousel videos={trending} />
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Recommended For You
        </h2>
        <VideoCarousel videos={recommended} />
        <h2 className="text-xl md:text-2xl font-bold mb-4">New Releases</h2>
        <VideoCarousel videos={newReleases} />
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

async function getTrendingContent() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      id: "t1",
      title: "Neon Shadows",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t2",
      title: "The Last Kingdom",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t3",
      title: "Midnight Alley",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t4",
      title: "Quantum Break",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t5",
      title: "Desert Storm",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t6",
      title: "Frozen Heart",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t7",
      title: "City of Dreams",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "t8",
      title: "The Outsider",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
  ];
}

async function getRecommendedContent() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      id: "r1",
      title: "Dark Waters",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r2",
      title: "Skyline",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r3",
      title: "The Heist",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r4",
      title: "Parallel Lives",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r5",
      title: "Eternal Sunshine",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r6",
      title: "Crimson Peak",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r7",
      title: "Mystic River",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "r8",
      title: "Golden Eye",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
  ];
}

async function getNewReleasesContent() {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return [
    {
      id: "n1",
      title: "Starfall",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n2",
      title: "The Abyss",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n3",
      title: "Wildfire",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n4",
      title: "Echoes",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n5",
      title: "Bloodline",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n6",
      title: "The Vault",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n7",
      title: "Nightcrawler",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
    {
      id: "n8",
      title: "Silent Hill",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-116659307,width-1280,height-720,resizemode-4/116659307.jpg",
    },
  ];
}
