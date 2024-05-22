import React from 'react';
import gsap from 'gsap';
import ReactDOM from 'react-dom/client';
import '../styles/Home.scss'; 


const Home = () => {
    React.useEffect(() => {
      let sections = document.querySelectorAll(".section"),
        images = document.querySelectorAll(".background"),
        headings = document.querySelectorAll(".section-title"),
        outerWrappers = document.querySelectorAll(".wrapper-outer"),
        innerWrappers = document.querySelectorAll(".wrapper-inner"),
        currentIndex = -1,
        wrap = (index, max) => (index + max) % max,
        animating;
  
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
  
      function gotoSection(index, direction) {
        index = wrap(index, sections.length);
        animating = true;
  
        let fromTop = direction === -1;
        let dFactor = fromTop ? -1 : 1;
        let tl = gsap.timeline({ defaults: { duration: 1.25, ease: "power1.inOut" }, onComplete: () => (animating = false) });
  
        if (currentIndex >= 0) {
          gsap.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor })
            .set(sections[currentIndex], { autoAlpha: 0 });
        }
  
        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
        tl.fromTo([outerWrappers[index], innerWrappers[index]], { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) }, { yPercent: 0 }, 0)
          .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
          .fromTo(headings[index], { autoAlpha: 0, yPercent: 150 * dFactor }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          }, 0.2);
  
        currentIndex = index;
      }
  
      function navigateSectionById(id) {
        let index = Array.from(sections).findIndex(section => section.id === id);
  
        if (index !== -1 && index !== currentIndex) {
          gotoSection(index, index > currentIndex ? 1 : -1);
        }
      }
  
      let lastTap = 0;
      document.addEventListener("touchend", function (event) {
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
          gotoSection(currentIndex + 1, 1);
          event.preventDefault();
        }
        lastTap = currentTime;
      });
  
      window.addEventListener("wheel", (event) => {
        if (event.deltaY < 0 && !animating) {
          gotoSection(currentIndex - 1, -1);
        } else if (event.deltaY > 0 && !animating) {
          gotoSection(currentIndex + 1, 1);
        }
      });
  
      document.querySelectorAll("nav a").forEach(a => {
        a.addEventListener("click", e => {
          e.preventDefault();
          navigateSectionById(e.currentTarget.getAttribute("href").slice(1));
        });
      });
  
      gotoSection(0, 1);
    }, []);
  
    return (
      <div className="app-container">
        <header className="header">
          <nav>
            <a href="#first">Recettes </a>
            <a href="#second">Communauté </a>
            <a href="#third">Profil </a>
            <a href="#fourth">Ingrédients </a>
            <a href="#fifth">Défi du jour</a>
          </nav>
        </header>
        <Section id="first" title="Recettes" className="first" videoUrl={"/video/omelet.mp4"} />
        <Section id="second" title="Communauté" className="second" bgUrl="https://images.unsplash.com/photo-1503796964332-e25e282e390f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1NTR8&ixlib=rb-4.0.3&q=85" />
        <Section id="third" title="Profil" className="third" bgUrl="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1OTh8&ixlib=rb-4.0.3&q=85" />
        <Section id="fourth" title="Ingrédients" className="fourth" bgUrl="https://images.unsplash.com/photo-1584351583369-6baf055b51a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM4MTB8&ixlib=rb-4.0.3&q=85" />
        <Section id="fifth" title="Défi du jour" className="fifth" bgUrl="https://images.unsplash.com/photo-1516663713099-37eb6d60c825?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM4MTB8&ixlib=rb-4.0.3&q=85" />
      </div>
    );
  };
const Section = ({ id, title, className, bgUrl, videoUrl }) => {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <div className="background" style={{ backgroundImage: `url(${bgUrl})` }}>
            <h2 className="section-title">{title}</h2>
            {videoUrl && (
              <video autoPlay loop muted>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}; const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);
export default Home;

