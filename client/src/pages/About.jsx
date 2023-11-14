import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-[100vh] mx-auto bg-[#0d0d0dff] overflow-hidden flex justify-center items-center">
      <div className="w-full flex justify-center items-center flex-col text-center text-sm md:text-lg max-[475px]:mt-[20%] max-[418px]:mt-[60%] max-[288px]:mt-[100%]">
        <h1 className="text-3xl font-bold mb-4 text-[#f2b700ff]">
          About Dream Dwellings
        </h1>
        <p className="mb-4 text-gray-400 max-w-[70%]">
          Dream Dwellings Estate is a leading real estate agency that
          specializes in helping clients buy, sell, and rent properties in the
          most desirable neighborhoods. Our team of experienced agents is
          dedicated to providing exceptional service and making the buying and
          selling process as smooth as possible.
        </p>
        <p className="mb-4 text-gray-400 max-w-[70%]">
          Our mission is to help our clients achieve their real estate goals by
          providing expert advice, personalized service, and a deep
          understanding of the local market. Whether you are looking to buy,
          sell, or rent a property, we are here to help you every step of the
          way.
        </p>
        <p className="mb-4 text-gray-400 max-w-[70%]">
          Our team of agents has a wealth of experience and knowledge in the
          real estate industry, and we are committed to providing the highest
          level of service to our clients. We believe that buying or selling a
          property should be an exciting and rewarding experience, and we are
          dedicated to making that a reality for each and every one of our
          clients.
        </p>
      </div>
    </div>
  );
};

export default About;
