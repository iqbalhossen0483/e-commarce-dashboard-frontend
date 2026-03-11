"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, X, GripVertical } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface FileUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export function FileUploader({
  value,
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  accept = "image/*",
  className,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Map<File, string>>(new Map());
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null);
      const files = Array.from(incoming);

      const remaining = maxFiles - value.length;
      if (remaining <= 0) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const valid: File[] = [];
      for (const file of files.slice(0, remaining)) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`${file.name} exceeds ${maxSizeMB}MB limit`);
          continue;
        }
        valid.push(file);
      }

      if (valid.length > 0) {
        const newPreviews = new Map(previews);
        valid.forEach((file) => {
          if (file.type.startsWith("image/")) {
            newPreviews.set(file, URL.createObjectURL(file));
          }
        });
        setPreviews(newPreviews);
        onChange([...value, ...valid]);
      }
    },
    [value, onChange, maxFiles, maxSizeMB, previews],
  );

  const removeFile = useCallback(
    (index: number) => {
      const file = value[index];
      const url = previews.get(file);
      if (url) {
        URL.revokeObjectURL(url);
        const newPreviews = new Map(previews);
        newPreviews.delete(file);
        setPreviews(newPreviews);
      }
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange, previews],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles],
  );

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newFiles = [...value];
      const [moved] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, moved);
      onChange(newFiles);
    },
    [value, onChange],
  );

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
        )}
      >
        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">
          Drop files here or click to upload
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Max {maxFiles} files, up to {maxSizeMB}MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null && dragIndex !== index) {
                  handleReorder(dragIndex, index);
                }
                setDragIndex(null);
              }}
              onDragEnd={() => setDragIndex(null)}
              className={cn(
                "group relative rounded-lg border border-border bg-muted/30 overflow-hidden",
                dragIndex === index && "opacity-50",
              )}
            >
              {previews.get(file) ? (
                <img
                  src={previews.get(file)}
                  alt={file.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center">
                  <p className="px-2 text-center text-xs text-muted-foreground truncate">
                    {file.name}
                  </p>
                </div>
              )}

              {/* Overlay controls */}
              <div className="absolute inset-0 flex items-start justify-between p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="cursor-grab rounded bg-background/80 p-0.5">
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
