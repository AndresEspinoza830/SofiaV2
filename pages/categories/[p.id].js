import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  obtenerProductosCategoria,
  fetchWooCommerceProducts,
} from "../../utils/wooCommerceApi";
import prueba from "../../public/default.png";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";

const Name = ({ data, carrito, eliminarProducto, pedido, products }) => {
  const [navResponsive, setNavResponsive] = useState(false);

  const router = useRouter();

  data.map((p) => (p.description = p.description.replace(/(<([^>]+)>)/gi, "")));

  const productH2 = products.filter(
    (p) => router.asPath === `/categories/${p.id}`
  );

  products.filter((p) => p.name !== "Uncategorized");

  console.log(products);

  return (
    <Layout
      carrito={carrito}
      eliminarProducto={eliminarProducto}
      pedido={pedido}
    >
      <div className="max-w-[1360px] lg:mx-auto mx-2">
        <h3 className="text-[#D9BF73] pl-5 lg:pl-0 font-abc font-extrabold text-2xl my-4">
          {productH2[0].name}
        </h3>
        <div className="flex flex-col md:flex-row  items-center ">
          <Image
            src={productH2[0].image.src}
            width={300}
            height={300}
            className="rounded-md mb-2 lg:mb-0"
          />
          <p className="px-5 font-extralight">{productH2[0].description}</p>
        </div>
      </div>
      <div className="lg:flex max-w-[1360px] mx-auto mt-4">
        <div className="hidden lg:flex sticky top-0 md:w-4/12 lg:w-3/12 xl:w-3/12 h-full">
          <div className="hidden lg:flex-col h-auto lg:flex w-full items-center text-start  border-gray-300 py-5 rounded-lg shadow-xl ">
            <Link
              href={"#"}
              className="border-y-[1px] rounded-md py-3 w-full bg-[#052617] text-white "
            >
              <h2 className="font-abc text-sm font-extralight px-2 uppercase">
                Categories
              </h2>
            </Link>
            {products.map((p) => (
              <Link
                key={p.id}
                className={`${
                  router.asPath === `/categories/${p.id}`
                    ? "text-[#D9BF73] font-bold "
                    : ""
                }w-full border-y-[1px] flex items-center  rounded-md py-3 hover:bg-gray-100 transition duration-200 ease-in-out bg-white`}
                href={`/categories/${p.id}`}
              >
                <img src={`/svg/${p.slug}.svg`} className="w-9 ml-3" />
                <h2
                  className={
                    p.name !== "Uncategorized"
                      ? "font-abc text-sm font-extralight px-2 "
                      : "hidden"
                  }
                >
                  {p.name} ({p.count})
                </h2>
              </Link>
            ))}
          </div>
        </div>
        {/* Nav Responsive */}
        <div className="mx-2 my-2">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="py-2 px-6 font-bold font-abc  bg-[#052617] rounded-md text-white  w-full lg:hidden flex items-center justify-start"
            type="button"
            onClick={() => setNavResponsive(!navResponsive)}
          >
            <svg
              className="w-4 h-4 ml-2 mr-3"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
            All Categories
          </button>
          {navResponsive && (
            <div
              id="dropdown"
              className="w-full duration-1000 transition-transform mb-5"
            >
              <ul
                className="py-2 px-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col"
                aria-labelledby="dropdownDefaultButton"
              >
                {products.map((p) => (
                  <Link
                    key={p.id}
                    className={`${
                      router.asPath === `/categories/${p.id}`
                        ? "bg-[#D9BF73] text-white"
                        : ""
                    } w-full text-lg font-abc font-extralight text-center border-b-2 py-2 flex items-center`}
                    href={`/categories/${p.id}`}
                  >
                    <img src={`/svg/${p.slug}.svg`} className="w-9 ml-3" />
                    <h2 className="ml-4"> {p.name}</h2>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:h-full flex items-center text-gray-700 max-w-[1360px] w-full lg:mx-2 mt-4">
          <div className="grid mx-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data.map((producto) => (
              <Link
                href={`/component/${producto.slug}`}
                key={producto.id}
                className="my-1 w-full px-4  hover:border-dashed border-[#D9BF73] hover:border-2   h-full flex flex-col justify-between rounded-lg bg-white shadow-md"
              >
                <div className="px-2 overflow-hidden ">
                  <div className="overflow-hidden w-full">
                    <Image
                      alt="Placeholder"
                      width={1000}
                      height={400}
                      className="hover:scale-110 duration-300 ease-in-out mt-3 w-full "
                      src={`${producto?.images[0]?.src ?? prueba.src}`}
                    />
                  </div>
                  <h2 className="my-2 font-abc font-semibold text-[#052617] uppercase">
                    {producto.name}
                  </h2>

                  <p className=" my-2 font-extralight my-custom-style">
                    {producto.description || (
                      <p className="my-custom-style">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Quae, quasi! Quae, quasi!
                      </p>
                    )}
                  </p>
                  <h2 className=" text-center text-2xl text-[#D9BF73] font-bold">
                    ${producto.price}
                  </h2>
                </div>
                <button className="self-end font-abc text-center text-white w-full bg-[#D9BF73] py-3 rounded-md  duration-1000 uppercase mb-4">
                  + Add to Cart
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Name;

export async function getServerSideProps({ query }) {
  const ruta = Object.values(query)[0];
  console.log(ruta);

  const productosCategoria = await obtenerProductosCategoria(ruta).catch(
    (error) => console.error(error)
  );

  const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
    console.error(error)
  );
  return {
    props: {
      data: productosCategoria.data,
      products: wooCommerceProducts.data,
    },
  };
}
