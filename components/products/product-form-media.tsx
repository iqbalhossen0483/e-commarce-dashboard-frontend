"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/shared/file-uploader";
import { useState } from "react";

export function ProductFormMedia() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Media</CardTitle>
      </CardHeader>
      <CardContent>
        <FileUploader
          value={files}
          onChange={setFiles}
          maxFiles={8}
          maxSizeMB={5}
          accept="image/*"
        />
      </CardContent>
    </Card>
  );
}
