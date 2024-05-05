import { gsap } from "gsap";

const selectorMaskWrapper = ".mask-page-transition";
const positionItemMask = {
  start: "-100vw",
  end: "100vw",
};

export async function animationEnterTransition() {
  tweenMask(positionItemMask.start, positionItemMask.end);
  timelineSection(selectorMaskWrapper);
}

export async function animationOutTransition() {
  tweenMask(positionItemMask.end, positionItemMask.start);
  timelineSection(selectorMaskWrapper);
}

const tweenMask = (starterPosition, toPosition) => {
  const from = {
    x: starterPosition,
  };
  const to = {
    x: toPosition,
    duration: 0.6,
    stagger: {
      each: 0.1,
      from: "start",
    },
  };
  gsap.fromTo(".mask-page-transition .item", from, to);
};

const timelineSection = (section, delay) => {
  gsap.fromTo(
    section,
    { opacity: 1 },
    {
      backgroundColor: "var(--surface-ground)",
      ease: "power1.inOut",
      duration: 0.1,
      delay: 0.1,
    }
  );

  gsap.to(section, {
    opacity: "0",
    ease: "power1.inOut",
    duration: 0.5,
    delay: 0.9,
  });
};
