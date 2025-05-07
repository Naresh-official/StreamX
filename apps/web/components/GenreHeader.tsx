interface GenreHeaderProps {
  title: string;
  description: string;
}

export function GenreHeader({ title, description }: GenreHeaderProps) {
  return (
    <header className="border-b py-4 border-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-gray-400 text-lg max-w-3xl">{description}</p>
    </header>
  );
}
