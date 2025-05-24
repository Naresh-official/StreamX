import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Slider } from "@workspace/ui/components/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface GenreSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GenreSearch({ value, onChange }: GenreSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [yearRange, setYearRange] = useState([1970, 2023]);
  const [localSearch, setLocalSearch] = useState(value);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localSearch);
    }, 400);

    return () => clearTimeout(timeout);
  }, [localSearch, onChange]);

  const handleSortChange = (value: string) => {
    console.log("Sort by:", value);
    // Implement sorting logic
  };

  const handleYearRangeChange = (value: number[]) => {
    setYearRange(value);
    // Handle year range filtering
  };

  const handleRatingChange = (value: string) => {
    console.log("Minimum rating:", value);
    // Handle rating filtering
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search in this genre"
              className="pl-8"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <Select defaultValue="popularity" onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="year-desc">Newest First</SelectItem>
            <SelectItem value="year-asc">Oldest First</SelectItem>
            <SelectItem value="title">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg flex justify-between">
          <div className="space-y-2 w-96">
            <Label>Release Year</Label>
            <div className="px-2">
              <Slider
                defaultValue={yearRange}
                min={1920}
                max={2023}
                step={1}
                onValueChange={handleYearRangeChange}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </div>

          <div className="space-y-2 w-32">
            <Label>Minimum Rating</Label>
            <Select defaultValue="0" onValueChange={handleRatingChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="5">5+ Stars</SelectItem>
                <SelectItem value="6">6+ Stars</SelectItem>
                <SelectItem value="7">7+ Stars</SelectItem>
                <SelectItem value="8">8+ Stars</SelectItem>
                <SelectItem value="9">9+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
