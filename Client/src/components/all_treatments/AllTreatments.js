import React, { useMemo, useRef } from "react";
import { Suspense } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import { ToastContainer } from "react-toastify";
import ToastifyCSSImport from "./ToastifyCSSImport";
import "./AllTreatments.css";

const AllTreatments = React.forwardRef((props, ref) => {
  const {
    currentScreenSize,
    initialScreenSize,
    Treatments1Ref,
    resetAllCartStates,
    name,
  } = props;

  const treatmentsHeaderRef = useRef(null);

  // Lazy-loaded Treatments
  const Calm = useMemo(
    () => React.lazy(() => import("../treatments/Calm/Calm")),
    []
  );
  const Clarify = useMemo(
    () => React.lazy(() => import("../treatments/Clarify/Clarify")),
    []
  );
  const Bacial = useMemo(
    () => React.lazy(() => import("../treatments/Bacial/Bacial")),
    []
  );
  const Glow = useMemo(
    () => React.lazy(() => import("../treatments/Glow/Glow")),
    []
  );
  const Rejuvenate = useMemo(
    () => React.lazy(() => import("../treatments/Rejuvenate/Rejuvenate")),
    []
  );
  const Quench = useMemo(
    () => React.lazy(() => import("../treatments/Quench/Quench")),
    []
  );
  const SaltCave = useMemo(
    () => React.lazy(() => import("../treatments/SaltCave/SaltCave")),
    []
  );
  const ChemicalPeel = useMemo(
    () => React.lazy(() => import("../treatments/ChemicalPeel/ChemicalPeel")),
    []
  );
  const Dermaplaning = useMemo(
    () => React.lazy(() => import("../treatments/Dermaplaning/Dermaplaning")),
    []
  );
  const CBD = useMemo(
    () => React.lazy(() => import("../treatments/CBD/CBD")),
    []
  );
  const Microneedle = useMemo(
    () => React.lazy(() => import("../treatments/Microneedle/Microneedle")),
    []
  );
  const JetHydroPeel = useMemo(
    () => React.lazy(() => import("../treatments/JetHydroPeel/JetHydroPeel")),
    []
  );

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  return (
    <div className="all_treatments_container" id={name} ref={Treatments1Ref}>
      <ToastContainer
        toastClassName="toast_container"
        position={
          !currentScreenSize
            ? initialScreenSize >= 768
              ? !window.matchMedia("(orientation: landscape)").matches
                ? "bottom-center"
                : "bottom-right"
              : "bottom-right"
            : currentScreenSize >= 768
            ? !window.matchMedia("(orientation: landscape)").matches
              ? "bottom-center"
              : "bottom-right"
            : "bottom-right"
        }
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnVisibilityChange
        draggable={true}
        draggablePercent={20}
      />
      <header className="all_treatments_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
            }}
            to={{
              position: "relative",
              opacity: 1,
            }}
            config={{ duration: 1000 }}
          >
            {(styles) => (
              <>
                <Suspense fallback={<></>}>
                  <ToastifyCSSImport />
                </Suspense>
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                  ref={treatmentsHeaderRef}
                >
                  ABOUT US
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: treatmentsHeaderRef.current
                      ? treatmentsHeaderRef.current.clientWidth + "px"
                      : "0px",
                  }}
                  className="treatments_title_underline"
                />
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                >
                  <p>
                    You will know <br />
                    about us <br />
                    and what <br />
                    we do.
                  </p>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      <Suspense fallback={<></>}>
        <Calm
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
          scrollValue={props.scrollValue}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Clarify
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Bacial
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
      </Suspense>
      
    </div>
  );
});

export default AllTreatments;
