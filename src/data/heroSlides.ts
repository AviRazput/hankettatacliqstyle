export type HeroSlide = {
  id: string;
  imageSrc: string;
  mobileImageSrc?: string;
  imageAlt: string;
  imageFilter?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "banner-1",
    imageSrc: "/banner.png",
    mobileImageSrc: "/mobile_banner/mobilebanner1.jpg",
    imageAlt: "Hanket hero banner 1",
  },
  {
    id: "banner-2",
    imageSrc: "/banner5.png",
    mobileImageSrc: "/mobile_banner/mobilebanner2.jpg",
    imageAlt: "Hanket hero banner 2",
  },
  {
    id: "banner-3",
    imageSrc: "/banner4.png",
    mobileImageSrc: "/mobile_banner/mobilebanner3.jpg",
    imageAlt: "Hanket hero banner 3",
  },
  {
    id: "banner-4",
    imageSrc: "/bannerx.png",
    mobileImageSrc: "/mobile_banner/mobilebanner4.jpg",
    imageAlt: "Hanket hero banner X",
  },
  {
    id: "banner-5",
    imageSrc: "/banner6.png",
    mobileImageSrc: "/mobile_banner/mobilebanner5.jpg",
    imageAlt: "Hanket hero banner 5",
  },
];