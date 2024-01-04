import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

async function productList() {
  let data = await fetch("https://dummyjson.com/products");
  const dataJson = await data.json();
  const products: Products[] = dataJson.products;
  return products;
}
type Products = {
  id: string;
  description: string;
};
async function AboutWebsite() {
  let products: Products[] = await productList();
  console.log("products", products);
  console.log("aoa");
  // console.log('p',productss);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Website
      <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              {product.id} {product.description}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutWebsite;
