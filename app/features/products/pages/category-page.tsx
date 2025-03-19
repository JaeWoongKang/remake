import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Route } from "./+types/category-page";
import { getCategory, getProductsByCategory, getProductsByCategoryPages } from "../queries";
import { number, z } from "zod";
import { data } from "react-router";
import { makeSSRClient } from "supa-client";

export const meta = ({ params, data: {category : {name, description} } }: Route.MetaArgs) => {
  const { success, data:paramedData } = paramsSchema.safeParse(params);
  if(!success) {
    throw new Response("Invalid category id", { status: 400 });
  }
  return [
    { title: `${name} | WeMake` },
    { name: "description", content: `Browse ${name} products` },
  ];
};

const paramsSchema = z.object({
  categoryId: z.coerce.number(),
  page: z.coerce.number().optional().default(1),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => { 
  const { success, data:paramedData } = paramsSchema.safeParse(params);
  if(!success) {
    throw new Response("Invalid category id", { status: 400 });
  } 
  const {client, headers} = makeSSRClient(request);
  const category = await getCategory(client,{ categoryId : paramedData.categoryId});
  const categoryProducts = await getProductsByCategory(client,{categoryId: paramedData.categoryId, page: paramedData.page});
  const categoryProductsPages = await getProductsByCategoryPages(client,{ categoryId : paramedData.categoryId});
  return { category, categoryProducts, categoryProductsPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
      />

      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.categoryProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            tagline={product.tagline}
            reviews={product.reviews}
            views={product.views}
            upvotes={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.categoryProductsPages} />
    </div>
  );
}
