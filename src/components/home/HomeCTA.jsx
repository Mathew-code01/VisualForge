

// src/components/home/HomeCTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SmartVideo from "../SmartVideo";

import "../../styles/components/homeCTA.css";


const EASE = [0.16, 1, 0.3, 1];


const fadeUp = {

  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },

};



export default function HomeCTA({

  ctaProject,
  shouldReduceMotion,

}) {


const motionProps = shouldReduceMotion

?

{}

:

{

initial:"hidden",

whileInView:"show",

viewport:{
  once:true,
  margin:"-120px",
}

};



return (

<section

className="home-cta theme-dark"

data-theme="dark"

>


<div className="home-cta__media">


<SmartVideo

project={ctaProject}

className="home-cta__video home-media"

/>


<div className="home-cta__overlay"/>


</div>





<div className="container home-cta__inner">


<motion.div

className="home-cta__content"

variants={fadeUp}

{...motionProps}

>



<span className="eyebrow">

Start a Conversation

</span>




<h2 className="home-cta__title">

Have a project

<br />

in mind?

</h2>




<p className="home-cta__text">

Let's build something people understand.

Together we create clear communication,

strong brands and meaningful digital experiences.

</p>




<Link

to="/contact"

className="btn btn-primary btn-lg"

>

Start a Conversation

</Link>



</motion.div>


</div>



</section>

);

}