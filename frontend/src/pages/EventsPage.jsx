import { useState } from 'react';
import FeaturedEvents from '../components/FeaturedEvents';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

export default function EventsPage() {
  const [heroFilter, setHeroFilter] = useState(null);

  const selectCategory = (name) => {
    setTimeout(() => {
      const chip = [...document.querySelectorAll('.filter-chip')].find(
        (b) => b.textContent.trim() === name
      );
      chip?.click();
    }, 350);
  };

  return (
    <main>
      <FeaturedEvents heroFilter={heroFilter} onClearHeroFilter={() => setHeroFilter(null)} />
      <Categories onSelectCategory={selectCategory} />
      <Footer />
    </main>
  );
}
