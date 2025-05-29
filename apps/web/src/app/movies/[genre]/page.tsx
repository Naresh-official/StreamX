"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { knownCategories, genreMap } from "@workspace/config/constants";
import { GenreHeader } from "@/src/components/GenreHeader";
import GenreMovieGrid from "@/src/components/GenreMovieGrid";

export default function GenrePage() {
  const { genre } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

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
  }, [genre, router]);

  return (
    <div className="min-h-screen px-4 md:px-8 pt-18">
      {title && description ? (
        <GenreHeader title={title} description={description} />
      ) : (
        <p>Loading...</p>
      )}
      <GenreMovieGrid
        category={title?.split(" ")?.[0]?.toLowerCase() ?? "action"}
      />
    </div>
  );
}
