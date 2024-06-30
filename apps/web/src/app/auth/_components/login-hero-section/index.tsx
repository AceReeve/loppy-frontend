import Image from "next/image";
import React from "react";

export default function LoginHeroSection() {
  const oldHero = () => {
    return (
      <section className="relative flex h-32 items-center justify-center lg:col-span-5 lg:h-full xl:col-span-6">
        <div className="= absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#401A65] to-[#200D31]" />
        <Image
          alt=""
          src="/assets/images/login-cover.png"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
          fill
        />
        <div className="hidden max-w-[700px] flex-col items-center justify-center text-center lg:relative lg:flex lg:p-12">
          <Image
            src="/assets/images/logo.png"
            alt="Service Hero Logo"
            width={138}
            height={141}
          />

          <h2 className="mt-6 text-2xl text-[#fff] sm:text-3xl md:text-5xl md:leading-[4rem]">
            Welcome to Service Hero, we&apos;re so happy to have you here!
          </h2>

          <div className="mt-8 flex gap-6">
            <div className="border-primary relative h-16 w-16 overflow-hidden rounded-full border-2">
              <Image
                src="/assets/images/garrett-elmore.png"
                width={223}
                height={247}
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col text-left">
              <p className="font-roboto text-[24px] font-medium text-[#fff]">
                Garrett Elmore
              </p>
              <p className="font-open-sans text-primary">
                CEO & Founder of Service Hero
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="absolute flex lg:col-span-5 lg:h-full xl:col-span-6 select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1432"
        height="1049"
        viewBox="0 0 1432 1049"
        fill="none"
        className="size-full  "
      >
        <path
          d="M549.932 1048.99H0V0H1432C1426.36 5.4276 1420.25 10.7201 1413.87 15.7303C1407.73 20.5423 1401.15 25.2429 1394.3 29.7007C1380.69 38.4719 1366.49 46.2796 1351.8 53.0671C1337.94 59.5376 1323.06 65.5771 1306.32 71.5163C1292.48 76.4286 1277.22 81.3185 1259.66 86.4637C1249.16 89.5268 1238.49 92.5244 1228.17 95.4228H1228.15C1197.84 103.941 1166.49 112.75 1136.77 123.856C1121.94 129.331 1107.4 135.599 1093.23 142.635C1079.06 149.662 1065.43 157.751 1052.47 166.835C1044.78 172.259 1037.44 178.166 1030.49 184.52C1023.47 190.935 1016.86 197.784 1010.68 205.026C1004.52 212.26 998.821 219.886 993.63 227.858C988.492 235.746 983.907 243.986 979.908 252.517C962.85 289.056 959.409 326.053 969.958 359.516C973.602 370.638 978.36 381.359 984.159 391.512C989.856 401.767 996.381 411.872 1002.69 421.645L1002.7 421.657C1010.08 433.087 1017.71 444.906 1024.02 456.983C1027.19 462.977 1030 469.155 1032.44 475.484C1034.89 481.824 1036.82 488.357 1038.2 495.017C1041.12 509.524 1041.14 524.472 1038.26 538.987C1035.34 553.584 1030.11 567.612 1022.75 580.529C1008.29 606.328 985.886 629.243 959.663 645.054C953.409 648.824 946.771 652.395 939.937 655.666C933.422 658.784 926.523 661.735 919.42 664.423C905.426 669.664 891.113 673.999 876.568 677.4C846.796 684.52 815.283 688.733 787.471 692.451C755.395 696.741 726.555 700.851 698.398 707.736C683.872 711.212 669.587 715.639 655.634 720.989C648.557 723.736 641.68 726.739 635.196 729.915C628.393 733.247 621.792 736.881 615.578 740.717C603.064 748.442 591.361 757.427 580.651 767.534C570.052 777.544 560.481 788.603 552.081 800.542C543.686 812.484 536.506 825.245 530.648 838.634C524.738 852.16 520.208 866.256 517.128 880.705C514.054 895.154 512.447 909.88 512.33 924.657C512.221 939.285 513.574 953.888 516.37 968.244C519.171 982.598 523.401 996.632 528.992 1010.13C534.647 1023.77 541.662 1036.79 549.932 1049V1048.99Z"
          fill="url(#paint0_linear_3949_411)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3949_411"
            x1="716"
            y1="0"
            x2="716"
            y2="1049"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2E1249" />
            <stop offset="1" stop-color="#401A65" />
          </linearGradient>
        </defs>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="964"
          height="1050"
          viewBox="0 0 964 1050"
          fill="none"
          className=" absolute size-full z-20 ml-44"
        >
          <path
            d="M964 0L963.668 0.277686C860.762 81.9198 717.863 54.0012 605.741 113.174C555.567 139.676 510.283 185.251 503.694 244.231C495.861 314.221 539.398 375.648 566.633 436.573C591.017 491.075 608.149 558.48 570.087 611.147C537.123 656.891 479.167 675.104 425.749 681.388C390.073 685.587 354.092 685.67 318.388 689.285C287.103 692.218 256.338 699.277 226.887 710.279C172.46 731.096 123.978 765.068 85.7294 809.189C28.1646 875.676 -0.287672 963.213 3.00682 1050H0.239205C-3.35882 951.924 33.7295 854.043 104.997 784.97C145.917 745.246 195.718 715.954 250.226 699.547C280.671 690.454 312.057 686.588 343.693 684.475C380.449 682.028 417.592 681.5 453.88 674.353C509.428 663.397 568.465 632.642 585.266 574.108C604.638 506.453 565.089 439.216 536.304 380.793C509.069 325.512 485.765 262.723 512.529 202.604C535.141 151.884 584.13 116.624 634.587 97.3822C699.315 72.688 769.154 69.0174 836.129 53.4731C879.587 43.2397 923.76 27.4463 959.406 0H964Z"
            fill="#EBF3FF"
          />
        </svg>
      </svg>
    </section>
  );
}
