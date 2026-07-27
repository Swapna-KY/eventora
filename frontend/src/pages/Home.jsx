import { useState } from 'react';
import Hero from '../components/Hero';
import FeaturedEvents from '../components/FeaturedEvents';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  const [heroFilter, setHeroFilter] = useState(null);

  const selectCategory = (name) => {
    setHeroFilter(null);
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const chip = [...document.querySelectorAll('.filter-chip')].find((b) => b.textContent.trim() === name);
      chip?.click();
    }, 350);
  };

  return (
    <main>
      <Hero onSearch={setHeroFilter} />
      <FeaturedEvents heroFilter={heroFilter} onClearHeroFilter={() => setHeroFilter(null)} />
      <Categories onSelectCategory={selectCategory} />
      <Testimonials />
      <Footer />
    </main>
  );
}
