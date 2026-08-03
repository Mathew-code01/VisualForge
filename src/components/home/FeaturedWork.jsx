// src/components/home/FeaturedWork.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SmartVideo from "../SmartVideo";

import "../../styles/components/FeaturedWork.css";


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



export default function FeaturedWork({
  projects = [],
  loading,
  shouldReduceMotion,
}) {


const motionProps = shouldReduceMotion
? {}
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
 className="section featured-work theme-light"
 data-theme="light"
>


<div className="container-wide">



<motion.div
className="featured-work__header"
variants={fadeUp}
{...motionProps}
>


<span className="eyebrow">
Selected Work
</span>


<h2>
Stories crafted
<br/>
<span className="gradient-text">
frame by frame.
</span>
</h2>


<p>

A collection of commercial films,
brand stories, and visual experiences
created for ambitious companies.

</p>


</motion.div>





<div className="featured-work__list">


{
loading ? (

<div className="featured-work__empty">
Loading projects...
</div>


)

:

projects.length ?


projects.map((project,index)=>(


<motion.article

key={project.id}

className="featured-work__item"

variants={fadeUp}

{...motionProps}

>



<Link
to={`/work/${project.id}`}
className="featured-work__media-link"
>


<div
className="featured-work__media"
>


<SmartVideo

project={project}

className="featured-work__video"

/>


<div
className="featured-work__overlay"
/>


</div>


</Link>





<div className="featured-work__info">

    <span className="featured-work__number">
        0{index + 1}
    </span>

    <span className="featured-work__category">
        {project.category || "Commercial"}
    </span>

    <h3>
        {project.title}
    </h3>

    <p className="featured-work__description">
        {project.description}
    </p>

    <div className="featured-work__meta">

        <span>{project.duration || "2 min"}</span>

        <span>{project.resolution || "4K"}</span>

    </div>

    <Link
        to={`/work/${project.id}`}
        className="featured-work__link"
    >
        View Case Study →
    </Link>

</div>


</motion.article>


))


:

(

<div className="featured-work__empty">

New work is currently being produced.

</div>

)

}



</div>


</div>


</section>

);

}