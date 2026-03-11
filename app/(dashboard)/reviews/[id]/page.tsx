"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReviews } from "@/lib/mock/reviews";
import { format } from "date-fns";
import { ArrowLeft, Check, Star, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewDetailPage() {
  const params = useParams();
  const reviewId = params.id as string;
  const review = mockReviews.find((r) => r.id === reviewId);
  const [reply, setReply] = useState(review?.reply ?? "");
  const [status, setStatus] = useState(review?.status ?? "pending");

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Review not found</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The review you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/reviews" className="mt-4">
          <Button variant="outline">Back to Reviews</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/reviews">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Review Detail</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {review.productName} — by {review.customerName}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Review Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base">{review.title}</CardTitle>
                <div className="flex items-center gap-3">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(review.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <StatusBadge status={status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{review.body}</p>

            {/* Reply Section */}
            <div className="space-y-2 border-t border-border pt-4">
              <label className="text-sm font-medium">Reply</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
                placeholder="Write a reply to this review..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button
                size="sm"
                disabled={!reply.trim()}
                onClick={() => console.log("Reply saved:", reply)}
              >
                Save Reply
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full"
                variant={status === "approved" ? "default" : "outline"}
                onClick={() => setStatus("approved")}
              >
                <Check className="mr-1.5 h-4 w-4" />
                Approve
              </Button>
              <Button
                className="w-full"
                variant={status === "rejected" ? "destructive" : "outline"}
                onClick={() => setStatus("rejected")}
              >
                <X className="mr-1.5 h-4 w-4" />
                Reject
              </Button>
            </CardContent>
          </Card>

          {/* Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product</span>
                <span className="font-medium">{review.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span className="font-medium">{review.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium">{review.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {format(new Date(review.createdAt), "MMM d, yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
