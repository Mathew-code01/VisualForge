// src/components/home/CraftSection.jsx


import { motion } from "framer-motion";

import SmartVideo from "../SmartVideo";

import "../../styles/components/craftSection.css";


const EASE = [0.16, 1, 0.3, 1];


const fadeUp = {

    hidden:{
        opacity:0,
        y:30,
    },


    show:{
        opacity:1,
        y:0,

        transition:{
            duration:.8,
            ease:EASE,
        },
    },

};



export default function CraftSection({

    beforeProject,
    afterProject,
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
    margin:"-120px"
}

};



return (

<section

className="section craft-section theme-light"

data-theme="light"

>


<div className="container">



<motion.div

className="craft-section__header"

variants={fadeUp}

{...motionProps}

>


<span className="eyebrow">

The Craft

</span>



<h2>

Raw footage,

<span className="gradient-text">

 refined.

</span>

</h2>



<p>

Every great story begins with imperfect
footage. Our process transforms raw
material into a clear cinematic experience.

</p>



</motion.div>







<motion.div

className="craft-section__comparison"

variants={fadeUp}

{...motionProps}

>




<div className="craft-card">


<span className="craft-card__label">

Raw Footage

</span>



<div className="craft-card__media">


<SmartVideo

project={beforeProject}

className="craft-video"

/>


</div>


</div>







<div className="craft-divider">


<span></span>

<span></span>

<span></span>


</div>







<div className="craft-card craft-card--result">


<span className="craft-card__label">

Final Cinematic Result

</span>



<div className="craft-card__media">


<SmartVideo

project={afterProject}

className="craft-video"

/>


</div>


</div>



</motion.div>



</div>


</section>


);

}