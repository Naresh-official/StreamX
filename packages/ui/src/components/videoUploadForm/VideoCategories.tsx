import { Label } from "@workspace/ui/shadcn/label.js";
import { Badge } from "@workspace/ui/shadcn/badge.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/shadcn/select.js";
import { useState } from "react";
import { Button } from "@workspace/ui/shadcn/button.js";
import { X } from "lucide-react";

function VideoCategories() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="categories" className="text-base">
        Categories
      </Label>
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="flex items-center gap-1 py-1 capitalize"
          >
            {category}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-1  hover:!bg-primary/30"
              onClick={() => removeCategory(category)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <Select onValueChange={addCategory}>
        <SelectTrigger id="categories" className="ring-0 ring-offset-0">
          <SelectValue placeholder="Select categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="movies">Movies</SelectItem>
          <SelectItem value="tutorials">Tutorials</SelectItem>
          <SelectItem value="educational">Educational</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="news">News</SelectItem>
          <SelectItem value="music">Music</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default VideoCategories;
