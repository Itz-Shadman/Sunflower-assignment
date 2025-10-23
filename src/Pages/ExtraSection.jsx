import React from "react";
import skills from "../../public/skilsData.json";

const ExtraSection = () => {
  const topProviders = skills.sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Top Rated Providers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topProviders.map(provider => (
          <div key={provider.skillId} className="card bg-base-100 shadow-lg p-4">
            <p className="font-semibold">{provider.providerName}</p>
            <p>Skill: {provider.skillName}</p>
            <p>Rating: {provider.rating} ⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraSection;
