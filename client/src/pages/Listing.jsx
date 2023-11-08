import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/v1/listing/read/${params.id}`);
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }
      setLoading(false);
      setError(false);
      setListing(resData.body.listing);
    };

    try {
      fetchData();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }, []);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={url}>
                {/* <img src={url} alt="image" /> */}
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};
export default Listing;
