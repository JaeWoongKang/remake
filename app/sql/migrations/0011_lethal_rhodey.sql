ALTER TABLE "products" ALTER COLUMN "stats" SET DEFAULT jsonb_build_object(
            'views', floor(random() * 1000)::int,
            'reviews', 0,
            'upvotes', floor(random() * 100)::int
          );--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "profile_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "promoted_from" timestamp;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "promoted_to" timestamp;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_to_profiles" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;