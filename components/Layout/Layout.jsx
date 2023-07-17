import Navbar from "./Navbar";
import Footer from "./Footer";
import chevron from "../../public/chevron-abajo.png";
import { useRef } from "react";

const Layout = ({ carrito, eliminarProducto, pedido, children }) => {
  const topElementRef = useRef(null);

  const handleClick = () => {
    topElementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-[url('/textura.jpg')] ">
      <Navbar
        carrito={carrito}
        eliminarProducto={eliminarProducto}
        pedido={pedido}
      />
      <div className="min-h-screen">{children}</div>

      <img
        ref={topElementRef}
        src="/chevron-abajo.png"
        alt="chevron"
        onClick={handleClick}
        className="fixed  right-[60px] z-9 bg-white cursor-pointer transform rotate-180 animate-bounce  w-[36px]  rounded-[50%] bottom-[100px] shadow-xl"
      />
      <Footer />
    </div>
  );
};

export default Layout;
