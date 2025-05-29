import { Label } from "@workspace/ui/components/label";
import { Badge } from "@workspace/ui/components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { knownCategories } from "@workspace/config/constants";

interface VideoCategoriesProps {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

function VideoCategories({
  selectedCategories,
  setSelectedCategories,
}: VideoCategoriesProps) {
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
              className="h-5 w-5 p-1 hover:!bg-primary/30"
              onClick={() => removeCategory(category)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <Select onValueChange={addCategory}>
        <SelectTrigger id="categories" className="ring-0 ring-offset-0">
          <SelectValue
            placeholder="Select categories"
            className="focus-visible:ring-0 focus-visible:border-input"
          />
        </SelectTrigger>
        <SelectContent>
          {knownCategories.map((category) => (
            <SelectItem
              key={category.toLowerCase()}
              value={category.toLowerCase()}
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default VideoCategories;
