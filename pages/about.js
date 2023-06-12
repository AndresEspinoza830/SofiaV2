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
      <div className=" w-full bg-[url('/about.jpg')] h-screen bg-cover bg-no-repeat flex justify-center items-center "></div>
      <div className="flex justify-center items-center mt-3">
        <div className="font-abc w-1/3 ">
          <h3 className="text-xl mb-2 font-bold ">Our History</h3>
          <h2 className="text">
            THE ORIGINAL PRIMO PIZZA Welcome to The Original Primo Pizza - one
            of the best pizza places in Elizabeth, NJ. We're a family-owned
            pizzeria that has been in business for a long time. As a result, we
            have earned many loyal customers through the years. And what brings
            them back here time after time is our outstanding food and service.
            Our culinary strength is pizza and as such, we provide a variety of
            options. You can try some of our classic pies like our cheese,
            Sicilian Supreme, and Original Brooklyn pizza, to name a few. Or you
            can even create yours and pick the toppings you prefer. In addition,
            you can try some of our specialty pies. These include our
            Bruschetta, lasagna, Buffalo chicken, veggie, Grandma pizza, and
            many others. Of course, all our pizzas taste amazing so you cannot
            go wrong with any of them. Also, we serve flavorful appetizers,
            salads, side orders, wings, burgers, subs, Philly steaks, seafood,
            desserts, and more. And on top of all that, we provide a great kid's
            menu suitable for our youngest visitors. Stop by at any time for a
            memorable lunch or dinner at our restaurant. Or order our food for
            takeout or delivery on Slice. Another great thing? You save 5% on
            every online order via the Slice app!
          </h2>
        </div>
        <Image src={logo} className="w-1/4" />
      </div>
    </Layout>
  );
};

export default About;
