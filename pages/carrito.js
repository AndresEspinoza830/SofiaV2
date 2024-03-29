import { useEffect, useState } from "react";
import Link from "next/link"; //Primero importar cosas de react, next,componentes,estilos
import Image from "next/image";
import prueba from "../public/default.png";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal";

const Carrito = ({
  carrito,
  actualizarCantidad,
  eliminarProducto,
  setCarrito,
  limpiarCarrito,
  pedido,
}) => {
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.price,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  const handleEliminar = () => {
    limpiarCarrito();
    setCarrito([]);
  };

  const mostrarModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Layout carrito={carrito} eliminarProducto={eliminarProducto}>
      {openModal && <Modal eliminarProducto={eliminarProducto} />}
      {carrito.length === 0 ? (
        <p className="flex justify-center mt-4">
          No hay productos seleccionados
        </p>
      ) : (
        <div className="w-full  mx-auto lg:flex max-w-[1360px] py-10 px-4 md:px-2 font-abc">
          <table className="w-full md:w-3/4 table-auto mx-auto lg:mx-0">
            <thead>
              <tr>
                <th className="text-start">Dish</th>
                <th>Product</th>
                <th className="hidden md:block">Quantity</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y-[8px] divide-transparent font-abc text-sm md:text-lg">
              {carrito.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <Image
                      src={producto.image ?? prueba.src}
                      alt={producto.name}
                      className="flex"
                      width={110}
                      height={110}
                    />
                  </td>
                  <td className="text-center">{producto.name}</td>
                  <td className="text-center hidden md:block">
                    x{producto.cantidad}
                  </td>
                  <td className="text-center">${producto.price}</td>
                  <td>
                    <svg
                      className="cursor-pointer m-auto hover:fill-red-600 hover:scale-110"
                      width={23}
                      viewBox="0 0 1024 1024"
                      // onClick={() => eliminarProducto(producto.id)}
                      onClick={mostrarModal}
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M478.817 289.946c0-20.188 16.543-36.451 36.45-36.451l0 0c19.907 0 36.452 16.542 36.452 36.451l0 552.932c0 20.187-16.545 36.451-36.452 36.451l0 0c-20.188 0-36.45-16.544-36.45-36.451L478.817 289.946 478.817 289.946zM306.938 289.946c0-20.188 16.263-36.451 36.451-36.451l0 0c20.188 0 36.45 16.542 36.45 36.451l0 552.932c0 20.187-16.542 36.451-36.45 36.451l0 0c-20.188 0-36.451-16.544-36.451-36.451L306.938 289.946 306.938 289.946zM650.417 289.946c0-20.188 16.543-36.451 36.45-36.451l0 0c20.189 0 36.451 16.542 36.451 36.451l0 552.932c0 20.187-16.544 36.451-36.451 36.451l0 0c-19.907 0-36.45-16.544-36.45-36.451L650.417 289.946 650.417 289.946zM952.68 110.776 809.118 110.776l-52.433 0L756.685 64.791c0-35.609-31.965-63.648-72.901-63.648L346.473 1.143c-40.938 0-72.901 28.039-72.901 63.648l0 45.705-52.434 0L71.688 110.496c-20.188 0-36.45 16.262-36.45 36.451s16.263 36.451 36.45 36.451l76.828 0L148.516 952.23c0 39.254 32.806 71.22 72.901 71.22l587.981 0c40.096 0 72.901-31.966 72.901-71.22L882.299 183.678l70.379 0c20.187 0 36.449-16.263 36.449-36.451C989.129 127.038 972.866 110.776 952.68 110.776L952.68 110.776zM346.473 74.324l337.311 0 0 36.452L346.473 110.776 346.473 74.324 346.473 74.324zM770.704 950.827c0 0-471.617 1.684-511.713 1.684s-37.853-41.218-37.853-41.218L221.138 218.727c0-42.06 35.609-35.049 35.609-35.049l89.726 0 337.311 0 82.436 0c0 0 42.899-2.524 42.899 35.049 0 37.572 0.561 660.882 0.561 696.212C809.679 949.987 770.704 950.827 770.704 950.827L770.704 950.827z" />
                    </svg>
                  </td>
                </tr>
              ))}
              {carrito.length ? (
                <button
                  type="button"
                  className="bg-indigo-700 mt-4 text-white py-3 w-full lg:w-fit md:px-10 rounded-md"
                  onClick={handleEliminar}
                >
                  Remove all
                </button>
              ) : (
                ""
              )}
            </tbody>
          </table>

          <div className="mt-5 md:mt-0 md:w-1/4 border-[2px]  mx-auto lg:mx-0 border-stone-900 px-4 py-4 rounded-md h-full">
            <h2 className="text mb-4 font-bold">Order Summary</h2>
            <p className="text-sm font-normal py-1">Subtotal: ${total}</p>
            <p className="text-sm font-normal py-1">Discount: -0.00</p>
            <p className="text-sm font-normal py-1">Delivery: $4.99</p>
            <p className="text mb-4 font-bold border-y-[1px] py-4">
              Total to pay:${total + 5}
            </p>
            <Link
              href="/checkout"
              className="bg-[#ed174a] hover:bg-[#fa305f] mb-2 block text-center transition duration-300 w-full rounded-md py-3 text-white"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Carrito;
