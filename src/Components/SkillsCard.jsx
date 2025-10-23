// src/Components/SkillsCard.jsx
import React from 'react';
import skills from "../../public/skilsData.json"; // adjust path
import { Link } from 'react-router';


const SkillsCard = () => {
  return (
    <div className="container mx-auto px-4 py-8 w-[90%]">
      <h2 className="text-3xl font-bold mb-6">Popular Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div 
            key={skill.skillId} 
            className="card bg-base-100 shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 100} // stagger animation
          >
            <figure>
              <img 
                src={skill.image} 
                alt={skill.skillName} 
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{skill.skillName}</h3>
              <p>Provider: {skill.providerName}</p>
              <p>Rating: {skill.rating} ⭐</p>
              <p>Price: ${skill.price}</p>
              <div className="card-actions justify-end">
                <Link 
                  to={`/skills/${skill.skillId}`} 
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
