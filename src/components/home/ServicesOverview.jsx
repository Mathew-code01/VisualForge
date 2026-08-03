
// src/components/home/ServicesOverview.jsx

// src/components/home/ServicesOverview.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
    ArrowRight,
    PenTool,
    Shapes,
    Megaphone,
    MonitorSmartphone,
} from "lucide-react";

import "../../styles/components/ServicesOverview.css";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },

    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: EASE,
        },
    },
};

const SERVICES = [
    {
        icon: PenTool,
        title: "Strategy",
        description:
            "Define the message before designing the solution.",
        href: "/services/strategy",
    },

    {
        icon: Shapes,
        title: "Brand Identity",
        description:
            "Create brands people instantly recognize and trust.",
        href: "/services/brand-identity",
    },

    {
        icon: Megaphone,
        title: "Communication",
        description:
            "Motion, campaigns, explainers and storytelling that connect.",
        href: "/services/communication",
    },

    {
        icon: MonitorSmartphone,
        title: "Digital Experiences",
        description:
            "Products, websites and systems designed for long-term growth.",
        href: "/services/digital-experiences",
    },
];

export default function ServicesOverview({

    shouldReduceMotion,

}) {

    const motionProps = shouldReduceMotion
        ? {}
        : {

            initial: "hidden",

            whileInView: "show",

            viewport: {
                once: true,
                margin: "-120px",
            },

        };

    return (

        <section
            className="section services-overview theme-dark"
            data-theme="dark"
        >

            <div className="container">

                <motion.div
                    className="services-overview__header"
                    variants={fadeUp}
                    {...motionProps}
                >

                    <span className="eyebrow">

                        How We Create Clarity

                    </span>

                    <h2>

                        Every successful project begins
                        with understanding.

                    </h2>

                    <p>

                        We combine strategy, design,
                        communication and technology
                        to help ambitious companies
                        explain complex ideas with confidence.

                    </p>

                </motion.div>

                <div className="services-overview__grid">

                    {

                        SERVICES.map((service) => {

                            const Icon = service.icon;

                            return (

                                <motion.div
                                    key={service.title}
                                    className="services-card"
                                    variants={fadeUp}
                                    {...motionProps}
                                >

                                    <div className="services-card__icon">

                                        <Icon size={28} />

                                    </div>

                                    <h3>

                                        {service.title}

                                    </h3>

                                    <p>

                                        {service.description}

                                    </p>

                                    <Link
                                        to={service.href}
                                        className="services-card__link"
                                    >

                                        Learn More

                                        <ArrowRight
                                            size={18}
                                        />

                                    </Link>

                                </motion.div>

                            );

                        })

                    }

                </div>

            </div>

        </section>

    );

}