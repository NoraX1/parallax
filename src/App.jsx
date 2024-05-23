import FallSVG from "./component/FallSVG";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function App() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray(".layer").forEach((layer) => {
      let depth = layer.dataset.depth;

      let data = layer.getBoundingClientRect();

      let move = data.y * depth;

      tl.to(layer, { y: -move, ease: "none" }, 0);
    });

    gsap.to(".windmill-top", {
      rotation: "360deg",
      transformOrigin: "50% 68%",
      repeat: -1,
      duration: 20,
    });

    gsap.utils.toArray(".leaf").forEach((leaf, index) => {
      gsap.to(leaf, {
        x: -1000,
        y: 180,
        rotate: (index + 1) * 50,
        duration: 10,
      });
    });

    gsap.utils.toArray(".cloud").forEach((cloud, index) => {
      gsap.to(cloud, {
        y: 10,
        x: 10,
        repeat: -1,
        duration: (index + 30) / (5 + index),
        yoyo: true,
        delay: 1 + index,
      });
    });
  });
  return (
    <>
      <div className="container h-screen w-screen bg-[#F3E0B5]">
        <FallSVG />
      </div>
      <div className="relative h-screen bg-white "></div>
    </>
  );
}
