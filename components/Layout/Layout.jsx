import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ carrito, eliminarProducto, pedido, children }) => {
  return (
    <>
      <Navbar
        carrito={carrito}
        eliminarProducto={eliminarProducto}
        pedido={pedido}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
