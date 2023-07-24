import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import logo from "../public/sofia.png";

const About = ({ data, carrito, eliminarProducto, pedido }) => {
  return (
    <Layout
      carrito={carrito}
      eliminarProducto={eliminarProducto}
      pedido={pedido}
    >
      <div className=" w-full bg-[url('/about.jpg')] h-[70vh]  bg-cover bg-no-repeat flex justify-center items-center "></div>
      <div className="flex justify-center items-center mt-3">
        <div className="font-abc w-1/3 ">
          <h3 className="text-xl mb-2 font-bold ">Our History</h3>
          <h2 className="text">
            Sofia's Restaurant Welcome to Sofia's Restaurant! We provide our
            customers with authentic Hispanic cuisines like parilla, pescados y
            mariscos, sandwiches, and more! Come try our food today! We are
            located at on the corner of S Broad St. and Elizabeth Ave. not too
            far from Scott Park! Order Online today!
          </h2>
          <p>
            here are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </div>
        <Image src={logo} className="w-1/5" />
      </div>
    </Layout>
  );
};

export default About;
