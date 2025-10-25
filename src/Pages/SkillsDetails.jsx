// This is details section 
import React, { useState } from "react";
import skills from "../../public/skilsData.json";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router";

const SkillDetails = () => {
  const { id } = useParams();
  const skill = skills.find((s) => s.skillId === parseInt(id));

  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Session booked successfully!");
    setFormData({ name: "", email: "" });
  };
  if (!skill) return <p>Skill not found</p>;
  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h2 className="text-3xl font-bold mb-4">{skill.skillName}</h2>
      <img src={skill.image} alt={skill.skillName} className="w-full max-w-md mb-4" />
      <p><strong>Provider:</strong> {skill.providerName}</p>
      <p><strong>Email:</strong> {skill.providerEmail}</p>
      <p><strong>Category:</strong> {skill.category}</p>
      <p><strong>Price:</strong> ${skill.price}</p>
      <p><strong>Rating:</strong> {skill.rating} ⭐</p>
      <p><strong>Slots Available:</strong> {skill.slotsAvailable}</p>
      <p className="my-4"><strong>Description:</strong> {skill.description}</p>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2">Book Session</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillDetails;
