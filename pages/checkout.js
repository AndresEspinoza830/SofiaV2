import { useState, useEffect, CSSProperties } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Layout/Navbar";
import "react-responsive-modal/styles.css";
import Image from "next/image";
import { useRouter } from "next/router";
import MoonLoader from "react-spinners/MoonLoader";
import Link from "next/link";
import Footer from "../components/Layout/Footer";
import prueba2 from "../public/default.png";
import Layout from "@/components/Layout/Layout";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
};

const Checkout = ({
  carrito,
  eliminarProducto,
  limpiarCarrito,
  actualizarCantidad,
  pedido,
  setPedido,
}) => {
  const [total, setTotal] = useState(0);
  const [pickup, setPickup] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [open, setOpen] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);
  const [pending, setPending] = useState(false);
  const [finish, setFinish] = useState(false);
  const router = useRouter();
  const query = router.query;

  const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [listo, setListo] = useState(true);

  const prueba = carrito.map((p) => {
    return p.sku;
  });

  const line_items = carrito.map((producto) => ({
    product_id: producto.id,
    quantity: producto.cantidad,
  }));

  const handlerPick = () => {
    setOrderType("65NB3RKY023AJ");
    setPickup(true);
    setDelivery(false);
  };

  const handlerDelivery = () => {
    setOrderType("NT1CCC2KTP09W");
    setDelivery(true);
    setPickup(false);
  };

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.price,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFinish(false);
    setPending(true);
    const {
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      city,
      state,
      postcode,
    } = data;

    const dataClover = [
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      city,
      state,
      postcode,
    ];
    console.log(dataClover);
    const info = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      billing: {
        first_name: nombre,
        last_name: apellido,
        address_1: direccion,
        address_2: direccion,
        city: city,
        state: state,
        postcode: postcode,
        country: "US",
        email: email,
        phone: telefono,
      },
      shipping: {
        first_name: nombre,
        last_name: apellido,
        address_1: direccion,
        address_2: direccion,
        city: city,
        state: state,
        postcode: postcode,
        country: "US",
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "0",
        },
      ],
    };

    //FETCH WORDPRESS...
    const response = await fetch("api/create-order", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resul = await response.json();

    const arregloNuevoClover = [carrito, dataClover];

    const optionsClover = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_MID}`,
      },
      body: JSON.stringify([orderType]),
    };

    //FETCH CREATE ORDER-CLOVER...
    const responseClover = await fetch("api/order-clover", optionsClover);
    const resulClover = await responseClover.json();
    const idOrder = resulClover.id;

    const optionsCustomer = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_MID}`,
      },
      body: JSON.stringify(dataClover),
    };

    //FETCH CREATE CUSTOMER...
    const responseCustomer = await fetch(
      "api/create-customer",
      optionsCustomer
    );
    const resultCustomer = await responseCustomer.json();
    const idCustomer = resultCustomer.id;

    //ACTUALIZAR CUSTOMER
    const actualizarCustomer = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_MID}`,
      },
      body: JSON.stringify({ idOrder, idCustomer }),
    };

    const responseActualizarCustomer = await fetch(
      "api/actualizar-customer",
      actualizarCustomer
    );
    const resultActualizarCustomer = await responseActualizarCustomer.json();

    //ACTUALIZAR ITEMS
    const ids = [idOrder, idCustomer];
    const bodyItems = [carrito, ids];

    const actualizarItems = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_MID}`,
      },
      body: JSON.stringify(bodyItems),
    };

    const responseActualizarItems = await fetch(
      "api/actualizar-items",
      actualizarItems
    );
    const resultActualizarItems = await responseActualizarItems.json();

    //FETCH WORDPRESS...
    const objCustomer = {
      email: email,
      first_name: nombre,
      last_name: apellido,
      username: nombre + "." + apellido,
      billing: {
        first_name: nombre,
        last_name: apellido,
        company: "",
        address_1: direccion,
        address_2: direccion,
        city: city,
        state: state,
        postcode: postcode,
        country: "US",
        email: email,
        phone: telefono,
      },
      shipping: {
        first_name: nombre,
        last_name: apellido,
        company: "",
        address_1: direccion,
        address_2: direccion,
        city: city,
        state: state,
        postcode: postcode,
        country: "US",
      },
    };

    const obj = {
      email: "felipe.espinoza@example.com",
      first_name: "Felipe",
      last_name: "Espinoza",
      username: "felipe.esp",
      billing: {
        first_name: "Felipe",
        last_name: "DoEspinozae",
        company: "",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "felipe.espinoza@example.com",
        phone: "(555) 555-5555",
      },
      shipping: {
        first_name: "Felipe",
        last_name: "Espinoza",
        company: "",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
      },
    };

    const customerWP = await fetch("api/create-customerwp", {
      method: "POST",
      body: JSON.stringify(objCustomer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resWP = await customerWP.json();

    const nuevoPedido = {
      carrito,
      nombre,
      apellido,
      direccion,
      telefono,
    };

    setPedido([...pedido, nuevoPedido]);

    setPending(false);
    setFinish(true);
    limpiarCarrito();
  };

  return (
    <Layout
      carrito={carrito}
      eliminarProducto={eliminarProducto}
      pedido={pedido}
      className="relative"
    >
      <div className="w-full mx-auto max-w-[1360px] py-10 flex">
        {finish ? (
          <div className="flex flex-col w-full justify-center items-center space-y-3">
            <h2 className="font-bold text-2xl  text-center">
              Orden generada con exito!
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 80 80"
              width="80px"
              height="80px"
            >
              <path
                fill="#bae0bd"
                d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z"
              />
              <path
                fill="#5e9c76"
                d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40s17,38,38,38 s38-17,38-38S61,2,40,2L40,2z"
              />
              <path
                fill="#fff"
                d="M34 56L20.2 42.2 24.5 38 34 47.6 58.2 23.4 62.5 27.6z"
              />
            </svg>

            <Link className="text-center text-[#052617]" href="/">
              Regresar al Home
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col-reverse md:flex-row">
            <div className="w-full">
              {/* Volver atras */}
              <div>
                <Link href="/carrito" className="flex items-center my-2">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    width={25}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M807.313723 464.738462H300.165908l197.151507-198.340924a31.507692 31.507692 0 1 0-44.693661-44.425846l-250.549169 252.061539c-0.291446 0.291446-0.488369 0.638031-0.764062 0.937354a31.452554 31.452554 0 0 0-3.111385 3.828184c-0.543508 0.8192-0.9216 1.701415-1.386338 2.552123-0.512 0.945231-1.079138 1.858954-1.496615 2.859323-0.441108 1.063385-0.701046 2.174031-1.016123 3.2768-0.252062 0.866462-0.590769 1.701415-0.764062 2.599385a31.484062 31.484062 0 0 0 0 12.319508c0.181169 0.897969 0.512 1.725046 0.764062 2.591507 0.322954 1.102769 0.575015 2.213415 1.016123 3.2768 0.417477 1.000369 0.984615 1.906215 1.496615 2.851447 0.464738 0.858585 0.842831 1.7408 1.394215 2.56 0.913723 1.370585 1.992862 2.615138 3.111385 3.828184 0.275692 0.299323 0.472615 0.645908 0.764062 0.937354l250.549169 252.061538a31.405292 31.405292 0 0 0 22.346831 9.29477 31.515569 31.515569 0 0 0 22.34683-53.720616L300.165908 527.753846h507.147815a31.507692 31.507692 0 0 0 0-63.015384z"
                      fill=""
                    />
                  </svg>
                  <p className="font-medium">Atrás</p>
                </Link>
              </div>
              {pending ? (
                // <Modal open={open} className="p-6 w-full h-screen " center>
                <div className="w-full flex items-center justify-center">
                  <MoonLoader
                    color={"#36d7b7"}
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <div className="w-full mb-[60px] md:mb-0">
                  <h2 className="text-2xl font-bold block px-3">Checkout</h2>
                  <div className=" mx-[150px] flex  justify-center items-center  rounded-3xl border-2 border-black">
                    <button
                      onClick={handlerPick}
                      className={`${
                        delivery ? "disabled" : "bg-black p-2 text-white"
                      } px-6 py-3 w-1/2 rounded-2xl  0 font-check`}
                    >
                      Pickup
                    </button>
                    <button
                      onClick={handlerDelivery}
                      className={`${
                        pickup ? "disabled" : "bg-black p-2 text-white"
                      }  px-6 py-3 w-1/2  rounded-2xl  font-check`}
                    >
                      Delivery
                    </button>
                  </div>
                  {pickup ? (
                    <>
                      <div className="flex justify-between space-x-6 p-3 font-check mt-4 shadow-md shadow-gray-400">
                        <h3 className="text-lg font-bold">DETAILS</h3>
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 22 20"
                            fill="none"
                            width={20}
                            aria-label="Location pin icon"
                          >
                            <title>PickUp Shop Icon</title>
                            <path
                              d="M7.52297 0H4.32843C3.79799 0 3.28929 0.210713 2.91421 0.585786L0.87868 2.62132C0.316071 3.18393 0 3.94699 0 4.74264V6C0 7.10457 0.89543 8 2 8H4C5.10457 8 6 7.10457 6 6V4C6 3.87278 6.02428 3.74673 6.07152 3.62861L7.52297 0Z"
                              fill="currentColor"
                            />
                            <path
                              d="M8 6C8 7.10457 8.89543 8 10 8H12C13.1046 8 14 7.10457 14 6V4.19258L12.323 0H9.67703L8 4.19258V6Z"
                              fill="currentColor"
                            />
                            <path
                              d="M15.9285 3.62861L14.477 0H17.6716C18.202 0 18.7107 0.210714 19.0858 0.585786L21.1213 2.62132C21.6839 3.18393 22 3.94699 22 4.74264V6C22 7.10457 21.1046 8 20 8H18C16.8954 8 16 7.10457 16 6V4C16 3.87278 15.9757 3.74673 15.9285 3.62861Z"
                              fill="currentColor"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1 18V9.87397C1.31962 9.95624 1.6547 9.99999 2 9.99999H4C5.19469 9.99999 6.26705 9.47623 7 8.64581C7.73294 9.47623 8.80531 9.99999 10 9.99999H12C13.1947 9.99999 14.2671 9.47623 15 8.64581C15.7329 9.47623 16.8053 9.99999 18 9.99999H20C20.3453 9.99999 20.6804 9.95624 21 9.87397V18C21 19.1046 20.1046 20 19 20H10V13H6V20H3C1.89543 20 1 19.1046 1 18ZM18 13H13V17H18V13Z"
                              fill="currentColor"
                            />
                          </svg>
                          <div className="ml-4">
                            <h4 className="text-base">
                              Pick Up - {"(25-40 min)"}
                            </h4>
                            <p className="text-sm">
                              946 S Elmora Ave Elizabeth, NJ 07202
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md shadow-gray-400 mt-6">
                        <h3 className="p-3 font-check text-lg font-bold">
                          CONTACT
                        </h3>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          action=""
                          className="space-y-4 px-3 py-2 w-full"
                        >
                          <div className="w-full flex space-x-6">
                            <div className="w-full">
                              <label className="font-check">Name</label>
                              <input
                                type="text"
                                className="w-full bg-[#f2f2f2] p-2"
                                placeholder="Nombre"
                                {...register("nombre", {
                                  required: true,
                                  maxLength: 16,
                                })}
                              />
                              {errors.nombre?.type === "required" && (
                                <p className="text-red-600 font-medium">
                                  El nombre es obligatorio
                                </p>
                              )}
                            </div>
                            <div className="w-full">
                              <label htmlFor="apellido" className="font-check">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="w-full bg-[#f2f2f2] p-2"
                                id="apellido"
                                placeholder="Apellido"
                                {...register("apellido", {
                                  required: true,
                                  maxLength: 20,
                                })}
                              />
                              {errors.apellido?.type === "required" && (
                                <p className="text-red-600 font-medium">
                                  El apellido es obligatorio
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className="font-check">
                              Email
                            </label>
                            <input
                              type="email"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="email"
                              placeholder="Email"
                              {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                              })}
                            />
                            {errors.correo?.type === "pattern" && (
                              <p className="text-red-600 font-medium">
                                El correo no es valido
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="telefono" className="font-check">
                              Telefono
                            </label>
                            <input
                              type="text"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="telefono"
                              placeholder="Telefono"
                              {...register("telefono", {
                                required: true,
                              })}
                            />
                            {errors.telefono?.type === "pattern" && (
                              <p className="text-red-600 font-medium">
                                El telefono no es valido
                              </p>
                            )}
                          </div>

                          <input
                            type="submit"
                            className="bg-black text-white font-bold w-full p-2 cursor-pointer rounded-md"
                            value="Place Order"
                            onClick={onOpenModal}
                          />
                        </form>
                      </div>
                    </>
                  ) : (
                    " "
                  )}
                  {delivery ? (
                    <>
                      <div className="flex justify-between space-x-6 p-3 font-check mt-4 shadow-md shadow-gray-400">
                        <h3 className="text-lg font-bold">DETAILS</h3>
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="_2DO-5SnSF_147bBb5qWMlX"
                            viewBox="0 0 16 20"
                            fill="none"
                            width={20}
                            aria-label="Location pin icon"
                          >
                            <title>Location pin icon</title>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8 0C3.5879 0 0 3.57642 0 7.99164C0 9.84522 0.64432 11.6412 1.82265 13.072L7.22807 19.6357C7.41803 19.8664 7.70119 20 8 20C8.29881 20 8.58197 19.8664 8.77193 19.6357L14.1773 13.072C15.3557 11.6412 16 9.84522 16 7.99164C16 3.57642 12.4121 0 8 0ZM6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8Z"
                              fill="currentColor"
                            />
                          </svg>
                          <div className="ml-4">
                            <h4 className="text-base">
                              Delivery - {"(45-60 min)"}
                            </h4>
                            <p className="text-sm">
                              946 S Elmora Ave Elizabeth, NJ 07202
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md shadow-gray-400 mt-6">
                        <h3 className="p-3 font-check text-lg font-bold">
                          CONTACT
                        </h3>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          action=""
                          className="space-y-4 px-3 py-2 w-full"
                        >
                          <div className="w-full flex space-x-6">
                            <div className="w-full">
                              <label className="font-check">Name</label>
                              <input
                                type="text"
                                className="w-full bg-[#f2f2f2] p-2"
                                placeholder="Nombre"
                                {...register("nombre", {
                                  required: true,
                                  maxLength: 16,
                                })}
                              />
                              {errors.nombre?.type === "required" && (
                                <p className="text-red-600 font-medium">
                                  El nombre es obligatorio
                                </p>
                              )}
                            </div>
                            <div className="w-full">
                              <label htmlFor="apellido" className="font-check">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="w-full bg-[#f2f2f2] p-2"
                                id="apellido"
                                placeholder="Apellido"
                                {...register("apellido", {
                                  required: true,
                                  maxLength: 20,
                                })}
                              />
                              {errors.apellido?.type === "required" && (
                                <p className="text-red-600 font-medium">
                                  El apellido es obligatorio
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className="font-check">
                              Email
                            </label>
                            <input
                              type="email"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="email"
                              placeholder="Email"
                              {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                              })}
                            />
                            {errors.correo?.type === "pattern" && (
                              <p className="text-red-600 font-medium">
                                El correo no es valido
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="telefono" className="font-check">
                              Phone
                            </label>
                            <input
                              type="text"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="telefono"
                              placeholder="Telefono"
                              {...register("telefono", {
                                required: true,
                              })}
                            />
                            {errors.telefono?.type === "pattern" && (
                              <p className="text-red-600 font-medium">
                                El telefono no es valido
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="direccion" className="font-check">
                              Address
                            </label>
                            <input
                              type="text"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="direccion"
                              placeholder="Direccion"
                              {...register("direccion", {
                                required: true,
                              })}
                            />
                          </div>
                          <div>
                            <label htmlFor="city" className="font-check">
                              City
                            </label>
                            <input
                              type="text"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="city"
                              placeholder="City"
                              {...register("city", {
                                required: true,
                              })}
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="font-check">
                              State
                            </label>
                            <input
                              type="text"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="state"
                              placeholder="State"
                              {...register("state", {
                                required: true,
                              })}
                            />
                          </div>
                          <div>
                            <label htmlFor="postcode" className="font-check">
                              PostCode / ZIP
                            </label>
                            <input
                              type="text"
                              className="block w-full bg-[#f2f2f2] p-2"
                              id="postcode"
                              placeholder="Code"
                              {...register("postcode", {
                                required: true,
                              })}
                            />
                          </div>

                          <input
                            type="submit"
                            className="bg-black text-white font-bold w-full p-2 cursor-pointer rounded-md"
                            value="Place Order"
                            onClick={onOpenModal}
                          />
                        </form>
                      </div>
                    </>
                  ) : (
                    " "
                  )}
                </div>
              )}
            </div>
            {pending ? (
              ""
            ) : (
              <div className="w-full md:ml-7 flex flex-col px-3 md:px-0 font-check">
                <div className="order-2">
                  <div className="w-full px-1 py-4 rounded-md">
                    <h2 className="text-md mb-4">Order Summary</h2>
                    <p className=" font-bold py-1">Subtotal: ${total}</p>
                    <p className=" font-bold py-1">Discount: -0.00</p>
                    <p className=" font-bold py-1">Delivery: $4.99</p>
                    <p className="mb-4 font-bold border-y-[1px] py-4">
                      Total a pagar:${total + 5}
                    </p>
                  </div>
                </div>

                <table className="w-full order-1 table-auto font-check">
                  <thead>
                    <tr>
                      <th>Dish</th>
                      <th>Product</th>
                      <th>Qty.</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((producto) => (
                      <tr key={producto.id}>
                        <td>
                          <Image
                            src={producto?.image ?? prueba2.src}
                            alt={producto.name}
                            width={100}
                            height={100}
                            className="object-contain"
                          />
                        </td>
                        <td className="text-center">{producto.name}</td>
                        <td className="text-center">{producto.cantidad}</td>
                        <td className="text-center">{producto.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
