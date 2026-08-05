
// src/components/home/TrustedBy.jsx

import { motion } from "framer-motion";

import aflluxeLogo from "../../assets/trusted/AFLLUXE-04.png";
import coloredBlackLogo from "../../assets/trusted/Colored black.png";
import expetHubLogo from "../../assets/trusted/Expet hub-05.png";
import newkrooLogo from "../../assets/trusted/newkroo-logo-BBgxBlWa.png";
import ziboraLogo from "../../assets/trusted/Zibora LOGO-02.png";
import zidexLogo from "../../assets/trusted/zidex-logo-master.png";

import "../../styles/components/trustedby.css";


const TRUSTED_LOGOS = [
  {
    name: "AFLLUXE",
    image: aflluxeLogo,
  },
  {
    name: "Colored Black",
    image: coloredBlackLogo,
  },
  {
    name: "Expet Hub",
    image: expetHubLogo,
  },
  {
    name: "Newkroo",
    image: newkrooLogo,
  },
  {
    name: "Zibora",
    image: ziboraLogo,
  },
  {
    name: "Zidex",
    image: zidexLogo,
  },
];



export default function TrustedBy(){

  const logos = [
    ...TRUSTED_LOGOS,
    ...TRUSTED_LOGOS,
    ...TRUSTED_LOGOS,
  ];


  return (

    <section className="trusted theme-light">

      <p className="trusted__title">
        Trusted by ambitious brands
      </p>


      <div className="trusted__viewport">


        <motion.div
          className="trusted__track"
          animate={{
            x:["0%","-33.33%"]
          }}
          transition={{
            duration:25,
            repeat:Infinity,
            ease:"linear"
          }}
        >


          {
            logos.map((logo,index)=>(

              <div
                className="trusted__logo"
                key={`${logo.name}-${index}`}
              >

                <img
                  src={logo.image}
                  alt={logo.name}
                  loading="lazy"
                />

              </div>

            ))
          }


        </motion.div>


      </div>


    </section>

  );

}