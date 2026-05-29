import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import OpeningAnimation from './components/OpeningAnimation'
import HeartTransition from './components/HeartTransition'

const App = ({ data }) => {
  const [currentPage, setCurrentPage] = useState('home');

  // ------------------Cake loader 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => setAnimateOut(true), 8400);
      setTimeout(() => setLoading(false), 9000);
      setTimeout(() => setShowContent(true), 8600);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }
    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  return (
    <>
      {loading && <OpeningAnimation animateOut={animateOut} data={data} />}
      {showContent && (
        <HeartTransition trigger={currentPage}>
          {currentPage === 'home' && <Home data={data} navigate={setCurrentPage} />}
          {currentPage === 'love-letter' && <LoveLetter data={data} navigate={setCurrentPage} />}
        </HeartTransition>
      )}
    </>
  )
}

export default App