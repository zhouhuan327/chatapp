import { useTrail } from "react-spring";
const useAnimesList = number => {
  const animes = useTrail(number, {
    transform: "translate3d(0px,0px,0px)",
    from: { transform: "translate3d(-50px,0px,0px)" },
    config: {
      mass: 0.8,
      tension: 200,
      friction: 20,
    },
    delay: 100,
  });

  return animes;
};
export default useAnimesList;
