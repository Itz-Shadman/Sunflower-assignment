import React from "react";
import skills from "../../public/skilsData.json";

const ExtraSection = () => {
  const topProviders = skills.sort((a, b) => b.rating - a.rating).slice(0, 3);
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
        🌟 Top Rated Providers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topProviders.map((provider) => (
          <div
            key={provider.skillId}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
          >
            <img
              src={provider.image}
              alt={provider.skillName}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-center">
              {provider.Image && (
                <img
                  src={provider.Image}
                  alt={provider.providerName}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-400 shadow-md"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800">
                {provider.providerName}
              </h3>
              <p className="text-gray-600 text-sm">{provider.skillName}</p>
              <p className="text-yellow-500 font-semibold mt-2">
                ⭐ {provider.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraSection;
