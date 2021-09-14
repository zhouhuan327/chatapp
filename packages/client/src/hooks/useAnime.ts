import { useSpring, useTrail } from "react-spring";
// 列表的从左到右移动动画
const useAnimeList = number => {
  return useTrail(number, {
    transform: "translate3d(0px,0px,0px)",
    from: { transform: "translate3d(-50px,0px,0px)" },
    config: {
      mass: 0.8,
      tension: 200,
      friction: 20,
    },
    delay: 100,
  });
};
// 聊天框 三个部分的动画
const useChatAnime = () => {
  const topBarAnime = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(0px, -50px, 0px)" },
    delay: 500,
  });

  const msgAnime = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(50px, 0px, 0px)" },
    delay: 800,
  });

  const footerAnime = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(0px, 50px, 0px)" },
    delay: 950,
  });
  return { topBarAnime, msgAnime, footerAnime };
};
export { useAnimeList, useChatAnime };
