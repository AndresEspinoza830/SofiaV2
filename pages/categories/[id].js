import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { obtenerProductosCategoria } from "../../utils/wooCommerceApi";
import prueba from "../../public/default.png";
import Image from "next/image";

const Name = ({ data, carrito, eliminarProducto, products, pedido }) => {
  const [navResponsive, setNavResponsive] = useState(false);

  // const router = useRouter();

  data.map((p) => (p.description = p.description.replace(/(<([^>]+)>)/gi, "")));



  return (
    <>
   
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
    
      <div className="container my-12 mx-auto px-4 md:px-12">


        <div className="flex flex-wrap -mx-1 lg:-mx-4w-full ">
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
                      Quae, quasi!
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
      </div>
    
    </>
  );
};


export default Name;

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const Productos = await obtenerProductosCategoria(id).catch((error) =>
// 

console.error(error)
  );

  // Single Object
  const data  = Productos.data;
  return {
    props: {
            data,
          },
  };
};



export async function getStaticPaths() {
 
  const Productos = await fetchWooCommerceProducts().catch((error) =>
    console.error(error)
  );

  const data = Productos.data;

  const paths = data.map((producto) => ({
    params: { id: producto.id.toString()},
  }));

  return { paths, fallback: false };
}