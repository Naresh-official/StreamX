"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { knownCategories, genreMap } from "@workspace/config/client";
import { GenreHeader } from "@/components/GenreHeader";
import { VideoCarousel } from "@/components/videoCarousel/VideoCarousel";
import GenreMovieGrid from "@/components/GenreMovieGrid";

export default function GenrePage() {
  const { genre } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      typeof genre !== "string" ||
      !knownCategories.some(
        (category) => category.toLowerCase() === genre.toLowerCase()
      )
    ) {
      router.push("/404");
      return;
    }

    const genreKey = genre.toLowerCase() as keyof typeof genreMap;
    setTitle(genreMap[genreKey]?.title);
    setDescription(genreMap[genreKey]?.description);

    // Fetch the trending content
    const fetchTrendingContent = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating a delay
      const moviesData = [
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
      setMovies(moviesData);
      setLoading(false);
    };

    fetchTrendingContent();
  }, [genre, router]);

  return (
    <div className="min-h-screen px-4 md:px-8 pt-18">
      {title && description ? (
        <GenreHeader title={title} description={description} />
      ) : (
        <p>Loading...</p>
      )}
      <div className="space-y-8 mt-8">
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Featured {title}</h2>
            <VideoCarousel videos={movies} />
          </>
        )}
      </div>
      <GenreMovieGrid movies={movies} totalPages={20} />
    </div>
  );
}
