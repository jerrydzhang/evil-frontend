import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export function PrivacyScreen() {

	const location = useLocation();

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: location.state? 0 : 0.5, ease: "circOut" } }}
            // exit={{ opacity: 1, transition: { duration: 0.0, ease: "circIn" } }}
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
