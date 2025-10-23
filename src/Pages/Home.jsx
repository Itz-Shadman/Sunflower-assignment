import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import SkillsCard from '../Components/skillsCard';
import ExtraSection from './ExtraSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSlider from './HeroSlider';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div>
      <HeroSlider></HeroSlider>
      <SkillsCard></SkillsCard>
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default Home;