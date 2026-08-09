/**
 * @file Index.js
 * @description Animaciones fluidas y minimalistas para la portada original del Ryokan Miyabi (雅).
 */

document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // MÓDULO 1 — INTRO (intro.html)
        const introTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro-section",
                start: "top 75%",
            }
        });

        introTimeline.from(".intro-right", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from(".intro-left", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8");

        // MÓDULO 2 — FEATURES (features.html)
        const featureBlocks = document.querySelectorAll(".feature-block");
        featureBlocks.forEach((block) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(block.querySelector(".feature-main-img"), {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            })
            .from(block.querySelector(".feature-jp-img"), {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .from(block.querySelector(".feature-title"), {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6");
        });
    }
});