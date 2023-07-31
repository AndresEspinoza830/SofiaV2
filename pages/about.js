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
      <div className=" w-full bg-[url('/banner.jpg')] h-screen  bg-cover bg-no-repeat flex justify-center items-center ">
        <div className="absolute text-[#F2F2F2] text-center  flex flex-col justify-center items-center mx-auto z-6">
          <div className="flex items-end space-x-2">
            <div className="flex space-x-1">
              <div className="w-[5px]  lg:w-[8px] lg:h-[8px] bg-[#D9BF73] rounded-full"></div>
              <div className="w-[5px]  lg:w-[8px] lg:h-[8px] bg-[#D9BF73] rounded-full"></div>
              <div className="w-[5px]  lg:w-[8px] lg:h-[8px] bg-[#D9BF73] rounded-full"></div>
            </div>
            <svg
              className="fill-[#D9BF73] text-center"
              width={30}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M475.428571 36.571429v365.714285q0 34.857143-20.285714 63.428572T402.285714 505.714286v445.142857q0 29.714286-21.714285 51.428571t-51.428572 21.714286H256q-29.714286 0-51.428571-21.714286t-21.714286-51.428571V505.714286q-32.571429-11.428571-52.857143-40T109.714286 402.285714V36.571429q0-14.857143 10.857143-25.714286t25.714285-10.857143 25.714286 10.857143 10.857143 25.714286v237.714285q0 14.857143 10.857143 25.714286t25.714285 10.857143 25.714286-10.857143 10.857143-25.714286V36.571429q0-14.857143 10.857143-25.714286t25.714286-10.857143 25.714285 10.857143 10.857143 25.714286v237.714285q0 14.857143 10.857143 25.714286t25.714286 10.857143 25.714285-10.857143 10.857143-25.714286V36.571429q0-14.857143 10.857143-25.714286t25.714286-10.857143 25.714286 10.857143 10.857142 25.714286z m438.857143 0v914.285714q0 29.714286-21.714285 51.428571t-51.428572 21.714286h-73.142857q-29.714286 0-51.428571-21.714286t-21.714286-51.428571v-292.571429H566.857143q-7.428571 0-12.857143-5.428571T548.571429 640V182.857143q0-75.428571 53.714285-129.142857t129.142857-53.714286h146.285715q14.857143 0 25.714285 10.857143t10.857143 25.714286z" />
            </svg>
            <div className="flex space-x-1">
              <div className="w-[5px]  lg:w-[8px] lg:h-[8px] bg-[#D9BF73] rounded-full"></div>
              <div className="w-[5px]  lg:w-[8px] lg:h-[8px] bg-[#D9BF73] rounded-full"></div>
              <div className="w-[5px] lg:w-[8px] lg:h-[8px] bg-[#D9BF73] rounded-full"></div>
            </div>
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl lg:text-7xl mb-1 tracking-widest mt-0 font-abc">
            Experience the food
          </h2>
          <h1 className="font-abc text-xl mb-6">More than a decade with you</h1>
        </div>
      </div>
      <div className="flex justify-center flex-col md:flex-row items-center mt-3 space-x-10">
        <div className="font-abc w-full px-4 md:w-1/3 py-4">
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
        <Image src={logo} className="w-[300px]" />
      </div>
    </Layout>
  );
};

export default About;
