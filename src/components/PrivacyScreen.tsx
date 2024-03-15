import { motion, useIsPresent } from "framer-motion";

export function PrivacyScreen() {
    const isPresent = useIsPresent();


    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.7, ease: "circOut" } }}
            exit={{ opacity: 1, transition: { duration: 0.2, ease: "circIn" } }}
            className="privacy-screen"
        >
            {/* <img className=" pointer-events-none size-full" src="https://i.imgur.com/nXkM7hJ_d.webp?maxwidth=520&shape=thumb&fidelity=high" alt="privacy" /> */}
        </motion.div>
        // <motion.div className="privacy-screen"
        //     initial={{ scaleY: 1 }}
        //     animate={{ scaleY: 0, transition: { duration: 0.5, ease: "circOut" } }}
        //     exit={{ scaleY: 1, transition: { duration: 0.5, ease: "circIn" } }}
        //     style={{ originY: isPresent ? 0 : 1}}
        // />
        // <></>
    )
}