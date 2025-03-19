import { ProductCard } from "~/features/products/components/product-card";
import { Route } from "./+types/profile-products-page";
import { getUserProducts } from "../queries";
import { useLoaderData } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Products | wemake" }];
};

export async function loader({ params }: Route.LoaderArgs) {
  const products = await getUserProducts(params.username);
  return { products };
}

export default function ProfileProductsPage({loaderData}: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {loaderData.products.map((product) => (
        <ProductCard
          key={product.product_id}
          id={product.product_id.toString()}
          name={product.name}
          tagline={product.tagline}
          upvotes={product.upvotes}
          views={product.views}
          reviews={product.reviews}
        />
      ))}
    </div>
  );
}
