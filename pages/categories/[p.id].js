import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { obtenerProductosCategoria } from "../../utils/wooCommerceApi";
import prueba from "../../public/default.png";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";

const Name = ({ data, carrito, eliminarProducto, pedido }) => {
  const [navResponsive, setNavResponsive] = useState(false);

  // const router = useRouter();

  data.map((p) => (p.description = p.description.replace(/(<([^>]+)>)/gi, "")));

  return (
    <Layout
      carrito={carrito}
      eliminarProducto={eliminarProducto}
      pedido={pedido}
    >
      {/* <div className="max-w-[1360px] hidden shadow-xl  mx-auto w-full md:flex text-center items-center mt-14 border-[1px] border-gray-300 py-5 px-1 rounded-lg">
        {products.map((p) => (
          <Link key={p.id} className="w-full" href={`/categories/${p.id}`}>
            <h2 className="font-abc text-base font-bold uppercase">{p.name}</h2>
          </Link>
        ))}
      </div> */}
      {/* Nav Responsive */}
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="py-2 px-6 font-bold font-abc bg-[#052617] rounded-md text-white text-center w-full md:hidden flex items-center justify-between"
        type="button"
        onClick={() => setNavResponsive(!navResponsive)}
      >
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {/* {navResponsive && (
        <div
          id="dropdown"
          className="w-full duration-1000 transition-transform"
        >
          <ul
            className="py-2 px-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col"
            aria-labelledby="dropdownDefaultButton"
          >
            {data.map((p) => (
              <Link
                key={p.id}
                className={`${
                  router.asPath === `/categories/${p.id}`
                    ? "bg-[#D9BF73] text-white"
                    : ""
                } w-full text-2xl font-abc text-center border-b-2 py-2`}
                href={`/categories/${p.id}`}
              >
                {p.name}
              </Link>
            ))}
          </ul>
        </div>
      )} */}
      <div className="md:h-full flex items-center text-gray-600">
        {data.map((producto) => (
          <div
            key={producto.id}
            className="my-1 w-full md:w-1/2 md:flex lg:my-4 lg:px-4 lg:w-1/3 min-h-[400px] flex flex-col justify-between rounded-lg"
          >
            <div className="px-2 overflow-hidden">
              <div className="overflow-hidden">
                <Image
                  alt="Placeholder"
                  width={1000}
                  height={400}
                  className=" hover:scale-110 duration-300 ease-in-out"
                  src={`${producto?.images[0]?.src ?? prueba.src}`}
                />
              </div>
              <h2 className="my-2 font-abc font-bold text-[#052617] uppercase">
                {producto.name}
              </h2>
              <h2 className="text-xl text-[#052617] font-bold">
                ${producto.price}
              </h2>
              <p className="font-normal my-2 my-custom-style ">
                {producto.description || (
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quae, quasi! Quae, quasi!
                  </p>
                )}
              </p>
            </div>
            <Link
              href={`/component/${producto.slug}`}
              className="self-end font-philo text-center bg-[#052617] w-full text-[#D9BF73] py-3 rounded-md hover:bg-[#0c5836] duration-1000 uppercase mb-4"
            >
              Add to Cart
            </Link>
          </div>
        ))}
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
  return {
    props: {
      data: productosCategoria.data,
    },
  };
}
