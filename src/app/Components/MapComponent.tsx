import React from "react";

const MapComponent = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[360px] sm:h-[350px] md:h-[450px] lg:h-[520px] ">
        <iframe
          src="https://www.google.com/maps?q=28.996645,77.030818&z=15&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0 rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
