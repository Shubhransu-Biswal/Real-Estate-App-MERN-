import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import frontImage from "../assets/image-1.jpg";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/v1/listing/read?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data.body.listings);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/v1/listing/read?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data.body.listings);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/v1/listing/read?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data.body.listings);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className="relative w-full h-auto overflow-hidden bg-[#0d0d0dff]">
      {/* top */}
      <div className="gap-6 max-w-[80%] mx-auto mt-[31rem]   relative -top-20 z-10 bg-[linear-gradient(to_right,#151515ff_50%,#151515ff_50%)] shadow-md shadow-[#f2b700ff]/20 hover:shadow-[#f2b700ff]/10 transition-shadow duration-300">
        <div className="w-[50%] p-16 px-10 flex flex-col max-[501px]:w-full">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Find your next <span className="text-slate-500">perfect</span>
            <br />
            place with ease
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm mt-5">
            Dream Dwellings Estate is the best place to find your next perfect
            place to live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-white mt-9 font-bold border-[3px] p-2 border-[#f2b700ff] mx-auto hover:text-[#f2b700ff] hover:border-white transition-all duration-500"
          >
            Let's Get Started...
          </Link>
        </div>
        <div className="absolute top-0 left-[50%] w-[50%] h-full max-[501px]:hidden">
          <img src={frontImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* swiper */}
      <Swiper navigation className=" absolute left-0 top-0 h-[31rem] w-full ">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <img
                src={listing.imageUrls[0]}
                className="h-full w-full object-cover"
                key={listing._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="flex justify-center items-center w-full mx-auto">
        <div className="max-w-[80%] mx-auto p-3 flex flex-col gap-8 my-10 ">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-white">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-white">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-white">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
