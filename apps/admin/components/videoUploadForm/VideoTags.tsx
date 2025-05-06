import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { X } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

interface VideoTagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

function VideoTags({ tags, setTags }: VideoTagsProps) {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [currentTag, setCurrentTag] = useState<string>("");

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentTag(value);
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setCurrentTag("");
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag) {
      e.preventDefault();
      addTag(currentTag);
    } else if (e.key === "Backspace" && !currentTag && tags.length > 0) {
      removeTag(tags[tags.length - 1] ?? "");
    }
  };
  return (
    <div className="space-y-2">
      <Label htmlFor="tags" className="text-base">
        Tags
      </Label>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-1 hover:!bg-primary/30"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Input
          ref={tagInputRef}
          id="tags"
          value={currentTag}
          onChange={handleTagInput}
          onKeyDown={handleTagKeyDown}
          placeholder={tags.length === 0 ? "Add tags..." : ""}
          className="flex-1 min-w-[120px] border-0 p-0 px-2 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}

export default VideoTags;
