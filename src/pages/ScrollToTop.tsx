import { createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";

const ScrollToTop = () => {
    const location = useLocation();

    createEffect(() => {
        window.scrollTo(0, 0);
    });

    return null;
};

export default ScrollToTop;
