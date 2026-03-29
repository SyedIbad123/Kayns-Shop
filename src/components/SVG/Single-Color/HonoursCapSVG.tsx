"use client";

import type { CapColors } from "@/types/cap.types";

const DEFAULT_HONOURS_COLORS: CapColors = {
  solid: "#FFFFFF",
};

export default function HonoursCapSVG({ colors }: { colors: CapColors }) {
  const color = colors.solid || colors.main || DEFAULT_HONOURS_COLORS.solid;

  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      width="340px"
      height="440px"
      viewBox="0 0 340 440"
      enableBackground="new 0 0 340 440"
    >
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
	.st0{fill-rule:evenodd;clip-rule:evenodd;fill:${color}; }
	.st1{fill:${color};stroke:#000000;stroke-width:2.5;stroke-miterlimit:2.6131;}
	.st2{fill:none;stroke:#000000;stroke-width:2.5;stroke-miterlimit:2.6131;}
	.st3{fill:none; stroke:#000000; stroke-width:2.5;stroke-miterlimit:2.6131;}
	.st4{fill-rule:evenodd;clip-rule:evenodd; }
	.st5{fill:none;stroke-width:2.5;stroke-miterlimit:2.6131;}
	.st6{}
	.st7{font-family:'ArialMT';}
	.st8{font-size:11.1928px;}
	.st9{font-size:11.1927px;}
	.st10{font-size:11.1914px;}
	.st11{font-size:11.193px;}
	.st12{font-size:11.1929px;}
`,
        }}
      />
      <path
        className="st0"
        d="M300.2,274.4c-0.1,0.8-3.1,12.2-3.2,13c-5.7,40.2-19,79.3-56.2,100.7c-6.8,3.9-14.2,7.1-22.2,9.6  c-23.1,7.1-54.5,6.9-78.6,3.1c-59.7-9.5-88.3-50.6-95.5-113.9c-0.1-0.6-2.3-11.2-2.3-11.8L300.2,274.4z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        strokeWidth="2.5"
        id="id_10"
        d="M300.2,274.4c-0.1,0.8-3.1,12.2-3.2,13c-5.7,40.2-19,79.3-56.2,100.7c-6.8,3.9-14.2,7.1-22.2,9.6  c-23.1,7.1-54.5,6.9-78.6,3.1c-59.7-9.5-88.3-50.6-95.5-113.9c-0.1-0.6-2.3-11.2-2.3-11.8L300.2,274.4z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        id="id_8"
        d="M102.8,338.7c-6.9-4.8-13.7-11.7-20.9-21.6c-7.4-10.2-8.9-12.9-18.5-21.6c-14.8-13.4-27.4-25.6-33.2-33.6  c-0.4-0.6-0.9-1.3-1.4-2.1l0,0l128.7-60.2l6.4,7.2L102.8,338.7z"
      />
      <path
        className="st2"
        d="M102.8,338.7c-6.9-4.8-13.7-11.7-20.9-21.6c-7.4-10.2-8.9-12.9-18.5-21.6c-14.8-13.4-27.4-25.6-33.2-33.6  c-0.4-0.6-0.9-1.3-1.4-2.1l0,0l128.7-60.2l6.4,7.2L102.8,338.7z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        id="id_2"
        d="M313.2,260.2c-0.4,0.6-0.8,1.2-1.1,1.7c-5.8,8-18.4,20.1-33.2,33.6c-9.6,8.7-11.1,11.3-18.5,21.6  c-7.5,10.4-14.5,17.5-21.8,22.3l0,0l-61.4-132l7.4-7.4L313.2,260.2z"
      />
      <path
        className="st3"
        d="M313.2,260.2c-0.4,0.6-0.8,1.2-1.1,1.7c-5.8,8-18.4,20.1-33.2,33.6c-9.6,8.7-11.1,11.3-18.5,21.6  c-7.5,10.4-14.5,17.5-21.8,22.3l0,0l-61.4-132l7.4-7.4L313.2,260.2z"
      />
      <path
        stroke="#000000"
        fill={color}
        id="id_4"
        d="M238.5,46.9c0.9,0.7,1.8,1.4,2.6,2.2c1.6,1.5,3.3,3.4,5.2,5.5c5.5,6,12.1,13.5,18.7,20  c22.3,21.9,23.4,19.3,42.6,45.4c5,6.8,10.6,15.1,13.2,23.8l-136.9,45l-8-7.5L238.5,46.9z"
      />
      <path
        className="st3"
        d="M238.5,46.9c0.9,0.7,1.8,1.4,2.6,2.2c1.6,1.5,3.3,3.4,5.2,5.5c5.5,6,12.1,13.5,18.7,20  c22.3,21.9,23.4,19.3,42.6,45.4c5,6.8,10.6,15.1,13.2,23.8l-136.9,45l-8-7.5L238.5,46.9z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        id="id_6"
        d="M21.4,144.1c2.5-8.8,8.2-17.3,13.3-24.2C57.3,89.1,71.3,81.8,96,54.6c1.9-2.1,3.6-4,5.2-5.5  c0.5-0.5,1.1-1,1.7-1.5l67.6,145.5L21.4,144.1z"
      />
      <path
        className="st3"
        d="M21.4,144.1c2.5-8.8,8.2-17.3,13.3-24.2C57.3,89.1,71.3,81.8,96,54.6c1.9-2.1,3.6-4,5.2-5.5  c0.5-0.5,1.1-1,1.7-1.5l67.6,145.5L21.4,144.1z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        id="id_1"
        d="M238.6,339.4c-17.2,11.3-35.7,9.9-65.3,9.8c-0.7,0-1.4,0-2.1,0c-0.7,0-1.4,0-2.1,0  c-30.2,0.1-48.8,1.5-66.3-10.4L166.3,202l9.7,3.1L238.6,339.4z"
      />
      <path
        className="st3"
        d="M238.6,339.4c-17.2,11.3-35.7,9.9-65.3,9.8c-0.7,0-1.4,0-2.1,0c-0.7,0-1.4,0-2.1,0  c-30.2,0.1-48.8,1.5-66.3-10.4L166.3,202l9.7,3.1L238.6,339.4z"
      />
      <path
        className="st0"
        d="M126.7,41.8c3.8,0.1,85.2,0.1,89,0c8.4-0.3,16.2,0.3,22.9,5.1l-62.5,134.3l-9.7,3.1L102.9,47.6  C109.7,42.1,117.9,41.5,126.7,41.8z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        id="id_5"
        strokeWidth="2.5"
        d="M126.7,41.8c3.8,0.1,85.2,0.1,89,0c8.4-0.3,16.2,0.3,22.9,5.1l-62.5,134.3l-9.7,3.1L102.9,47.6  C109.7,42.1,117.9,41.5,126.7,41.8z"
      />
      <path
        stroke="#000000"
        fill={color}
        id="id_3"
        d="M321.5,145.8c0.7,3.1,1.1,6.2,0.8,9.3c-0.6,7.9-1.5,12-1.2,20.5l0.4,12.5l0.5,16.3c0.5,17.4,0.6,33.7-2.6,43  c-1.5,4.4-3.7,8.8-6.1,12.8l-142.5-66.6l0.1-0.4L321,143.8L321.5,145.8z"
      />
      <path
        className="st3"
        d="M321.5,145.8c0.7,3.1,1.1,6.2,0.8,9.3c-0.6,7.9-1.5,12-1.2,20.5l0.4,12.5l0.5,16.3c0.5,17.4,0.6,33.7-2.6,43  c-1.5,4.4-3.7,8.8-6.1,12.8l-142.5-66.6l0.1-0.4L321,143.8L321.5,145.8z"
      />
      <path
        className=""
        stroke="#000000"
        fill={color}
        id="id_7"
        d="M28.9,259.8c-2.2-3.7-4.7-9-5.8-12.4c-3.2-9.4-3.1-25.7-2.6-43l0.5-16.3l0.4-12.5c0.2-8.5-0.6-12.6-1.2-20.5  c-0.3-3.7,0.2-7.4,1.3-11l149.2,49l0.1,0.4L28.9,259.8z"
      />
      <path
        className="st3"
        d="M28.9,259.8c-2.2-3.7-4.7-9-5.8-12.4c-3.2-9.4-3.1-25.7-2.6-43l0.5-16.3l0.4-12.5c0.2-8.5-0.6-12.6-1.2-20.5  c-0.3-3.7,0.2-7.4,1.3-11l149.2,49l0.1,0.4L28.9,259.8z"
      />
      <polygon
        className="st4"
        id="ccc_1"
        fill="#E7C91C"
        points="104.2,46.6 166.5,180.4 163.3,181.9 101.4,48.9 102.8,47.7 "
      />
      <polygon
        className="st4"
        id="ccc_2"
        fill="#E7C91C"
        points="21.9,142.3 157.9,187.2 156.9,190.5 20.8,146.2 21.4,144.1 "
      />
      <polygon
        className="st4"
        id="ccc_3"
        fill="#E7C91C"
        points="237.2,46 175,179.5 178.1,181.1 240,48.1 239.4,47.6 238.7,47 237.7,46.3 "
      />
      <polygon
        className="st4"
        id="ccc_4"
        fill="#E7C91C"
        points="177.9,204.9 240,338.4 239.1,339 238.6,339.3 237.8,339.9 237.1,340.3 175.1,207.1 176.5,205.9 "
      />
      <polygon
        className="st4"
        id="ccc_5"
        fill="#E7C91C"
        points="163.5,204.5 101.5,337.7 102.8,338.7 104.4,339.7 166.3,206.6 165.7,206.1 165,205.5 164,204.8 "
      />
      <polygon
        className="st4"
        id="ccc_6"
        fill="#E7C91C"
        points="184.3,197.5 314.1,258.7 313.2,260.2 312.7,261 312.4,261.5 312.2,261.7 182.8,201.2 183.6,199.2 "
      />
      <polygon
        className="st4"
        id="ccc_7"
        fill="#E7C91C"
        points="185.4,190.9 321.3,145.4 320.9,143.8 320.7,143 320.5,142.5 320.4,142.1 184.3,187.1 184.8,189.2 "
      />
      <polygon
        className="st4"
        id="ccc_8"
        fill="#E7C91C"
        points="29.9,261.3 159.3,200.3 158.7,198.8 158.3,198 158.1,197.5 157.9,197.1 27.9,257.9 28.4,258.8   28.9,259.7 29.2,260.2 29.4,260.5 29.7,261 "
      />
      <path
        className="st4"
        id="ccc_9"
        fill="#E7C91C"
        d="M171.1,179c8.1,0,14.6,6.6,14.6,14.6c0,8.1-6.6,14.6-14.6,14.6c-8.1,0-14.6-6.6-14.6-14.6  C156.4,185.6,163,179,171.1,179"
      />
      <path
        className="st5"
        id="stk_1"
        stroke="#E7C91C"
        d="M179.8,196.2c28.4-7.7,51.9-0.8,85,15"
      />
      <path
        className="st5"
        id="stk_2"
        stroke="#E7C91C"
        d="M225.2,198.9c29-5.2,55.1,2.8,71,37.3"
      />
      <path
        className="st5"
        id="stk_3"
        stroke="#E7C91C"
        d="M233.6,194.6c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_4"
        stroke="#E7C91C"
        d="M227.5,196.3c28.7,1.5,46.6,26.8,60.7,59.7"
      />
      <path
        className="st5"
        id="stk_5"
        stroke="#E7C91C"
        d="M228.6,194.3c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st5"
        id="stk_6"
        stroke="#E7C91C"
        d="M220.7,202.6c29-5.2,55.1,2.8,71,37.3"
      />
      <path
        className="st5"
        id="stk_7"
        stroke="#E7C91C"
        d="M223,200c28.7,1.5,46.6,26.8,60.7,59.7"
      />
      <path
        className="st5"
        id="stk_8"
        stroke="#E7C91C"
        d="M224.2,198c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st5"
        id="stk_9"
        stroke="#E7C91C"
        d="M230.2,195.9c29-5.2,55.1,2.8,71,37.3"
      />
      <path
        className="st5"
        id="stk_10"
        stroke="#E7C91C"
        d="M238.6,191.6c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_11"
        stroke="#E7C91C"
        d="M232.5,193.3c28.7,1.5,46.6,26.8,60.7,59.7"
      />
      <path
        className="st5"
        id="stk_12"
        stroke="#E7C91C"
        d="M234.2,192.4c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st5"
        id="stk_13"
        stroke="#E7C91C"
        d="M242.6,191.6c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_14"
        stroke="#E7C91C"
        d="M248.4,191.3c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_15"
        stroke="#E7C91C"
        d="M251.9,191c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_16"
        stroke="#E7C91C"
        d="M219.2,200.7c29-5.2,55.1,2.8,71,37.3"
      />
      <path
        className="st5"
        id="stk_17"
        stroke="#E7C91C"
        d="M227.6,196.3c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_18"
        stroke="#E7C91C"
        d="M223.9,196.8c28.7,1.5,46.6,26.8,60.7,59.7"
      />
      <path
        className="st5"
        id="stk_19"
        stroke="#E7C91C"
        d="M222.6,196.1c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st5"
        id="stk_20"
        stroke="#E7C91C"
        d="M218.9,199.6c29-5.2,53.6,6.2,69.5,40.7"
      />
      <path
        className="st5"
        id="stk_21"
        stroke="#E7C91C"
        d="M225.5,197.5c28.7,1.5,46.6,26.8,60.7,59.7"
      />
      <path
        className="st5"
        id="stk_22"
        stroke="#E7C91C"
        d="M218.2,199.8c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st5"
        id="stk_23"
        stroke="#E7C91C"
        d="M224.2,197.7c29-5.2,55.1,2.8,71,37.3"
      />
      <path
        className="st5"
        id="stk_24"
        stroke="#E7C91C"
        d="M232.6,193.3c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_25"
        stroke="#E7C91C"
        d="M229.9,194.9c28.7,1.5,46.6,26.8,60.7,59.7"
      />
      <path
        className="st5"
        id="stk_26"
        stroke="#E7C91C"
        d="M227.7,193.1c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st5"
        id="stk_27"
        stroke="#E7C91C"
        d="M236.1,192.3c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_28"
        stroke="#E7C91C"
        d="M241.6,191.5c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_29"
        stroke="#E7C91C"
        d="M245.1,191.2c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_30"
        stroke="#E7C91C"
        d="M242.1,194.5c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_31"
        stroke="#E7C91C"
        d="M231.9,195.8c28.7,1.5,46.4,26.7,60.6,59.7"
      />
      <path
        className="st5"
        id="stk_32"
        stroke="#E7C91C"
        d="M233.7,201.1c29-5.2,53.6,3.1,69.5,37.6"
      />
      <path
        className="st4"
        id="ccc_10"
        fill="#E7C91C"
        d="M224.9,205.8c4.9,1.6,12.2-16.8,8.5-17.1c-8.5-0.5-15.6-3-20-1C204.1,191.8,203.6,198.7,224.9,205.8"
      />
      <text
        transform="matrix(1 0 0 1 167.7178 198.0202)"
        className="st6 st7 st8"
      />
      <text
        transform="matrix(1 0 0 1 166.6866 218.8181)"
        className="st6 st7 st8"
        id="n_id_1"
      >
        1
      </text>
      <text
        transform="matrix(0.6087 -0.7934 0.7934 0.6087 186.7622 213.686)"
        className="st6 st7 st9"
        id="n_id_2"
      >
        2
      </text>
      <text
        transform="matrix(2.830004e-02 -0.9996 0.9996 2.830004e-02 196.2899 197.0057)"
        className="st6 st7 st8"
        id="n_id_3"
      >
        3
      </text>
      <text
        transform="matrix(-0.5802 0.8144 -0.8144 -0.5802 153.4839 175.2451)"
        className="st6 st7 st10"
        id="n_id_6"
      >
        6
      </text>
      <text
        transform="matrix(-1 0 0 -1 173.6914 168.9621)"
        className="st6 st7 st8"
        id="n_id_5"
      >
        5
      </text>
      <text
        transform="matrix(2.909932e-02 0.9996 -0.9996 2.909932e-02 145.3541 191.4664)"
        className="st6 st7 st11"
        id="n_id_7"
      >
        7
      </text>
      <text
        transform="matrix(0.6796 0.7336 -0.7336 0.6796 150.3486 208.8074)"
        className="st6 st7 st12"
        id="n_id_8"
      >
        8
      </text>
      <text
        transform="matrix(-0.74 -0.6726 0.6726 -0.74 191.3357 178.281)"
        className="st6 st7 st9"
        id="n_id_4"
      >
        4
      </text>
      <text
        transform="matrix(1 0 0 1 161.0071 367.1154)"
        className="st6 st7 st8"
        id="n_id_10"
      >
        10
      </text>
    </svg>
  );
}
