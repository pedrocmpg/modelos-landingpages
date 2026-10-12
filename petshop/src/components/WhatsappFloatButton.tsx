import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion as useMotionReducedMotion } from "motion/react";
import { whatsappHref } from "../lib/whatsapp";

function WhatsappIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.5 6.5a7.6 7.6 0 0 0-11.9 9.1L4.5 20l4.5-1.1A7.6 7.6 0 0 0 17.5 6.5Z"
        fill="#fff"
      />
      <path
        d="M12 4.3a7.7 7.7 0 0 0-6.6 11.6L4.5 20l4.2-1.1A7.7 7.7 0 1 0 12 4.3Zm0 1.4a6.3 6.3 0 1 1-3.4 11.6l-.3-.2-2.4.6.6-2.3-.2-.3A6.3 6.3 0 0 1 12 5.7Z"
        fill="#25D366"
      />
      <path
        d="M9.4 8.2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.3.9 2.5 1.1 2.6.1.2 1.8 2.8 4.4 3.8 2.1.8 2.6.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.2-.3 0-.4.1-.6l.4-.5c.1-.1.1-.3.2-.4 0-.2 0-.3-.1-.4-.1-.2-.6-1.5-.8-2Z"
        fill="#25D366"
      />
    </svg>
  );
}

export function WhatsappFloatButton() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useMotionReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReduced ? undefined : { scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 150,
            boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
          }}
        >
          {!prefersReduced && (
            <motion.span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid #25D366",
              }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <WhatsappIcon />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
