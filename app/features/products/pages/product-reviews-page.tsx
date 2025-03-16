import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { Route } from "./+types/product-reviews-page";
import { getReviewsByProductId } from "../queries";
import { DateTime } from "luxon";


export function meta() {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Read and write product reviews" },
  ];
}

export const loader = async ({params}:Route.LoaderArgs) => {
  const reviews = await getReviewsByProductId({productId: parseInt(params.productId)});
  return {reviews};
}

export default function ProductReviewsPage({loaderData}:Route.ComponentProps) {
  const {reviews} = useOutletContext<{reviews: string}>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {reviews} {Number(reviews) > 1 ? "Reviews" : "Review"}
          </h2>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              username={review.user?.name ?? "알 수 없는 사용자"}
              handle={review.user?.username ?? "unknown"}
              avatarUrl={review.user?.avatar ?? ""}
              rating={review.rating}
              content={review.review}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
