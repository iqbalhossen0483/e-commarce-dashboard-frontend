"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface CustomerNotesProps {
  notes: string[];
  onAddNote?: (note: string) => void;
}

export function CustomerNotes({ notes, onAddNote }: CustomerNotesProps) {
  const [value, setValue] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  const handleAdd = () => {
    if (!value.trim()) return;
    setLocalNotes((prev) => [value.trim(), ...prev]);
    onAddNote?.(value.trim());
    setValue("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <textarea
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
            placeholder="Add a note about this customer..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            size="sm"
            variant="outline"
            disabled={!value.trim()}
            onClick={handleAdd}
          >
            Add Note
          </Button>
        </div>

        {localNotes.length > 0 ? (
          <div className="space-y-2">
            {localNotes.map((note, i) => (
              <div
                key={i}
                className="rounded-md bg-muted px-3 py-2 text-sm"
              >
                {note}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No notes yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
