import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
  autostart?: boolean;
}

const TITLE = 'XÃ AN NHƠN TÂY';

/** Minimal EDKR-style intro: colored letters flicker in place, then the site appears. */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, autostart = false }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (autostart) {
      onComplete();
      return;
    }

    const leaveTimer = window.setTimeout(() => setLeaving(true), 3900);
    const completeTimer = window.setTimeout(onComplete, 4450);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [autostart, onComplete]);

  if (autostart) return null;


  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="edkr-loader fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          aria-label="Xã An Nhơn Tây"
        >
          <div className="edkr-wordmark" aria-label={TITLE}>
            {TITLE.split('').map((char, index) => {
              if (char === ' ') {
                return <span className="edkr-space" key={`space-${index}`}>&nbsp;</span>;
              }
              const delay = `${(index % 4) * 35}ms`;
              return (
                <span
                  className="edkr-letter"
                  key={`${index}-${char}`}
                  style={{ animationDelay: delay }}
                >
                  {char}
                </span>
              );
            })}
          </div>


<button
  type="button"
  onClick={() => {
    setLeaving(true);
    onComplete();
  }}
  style={{
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    padding: '10px 24px',
    background: 'transparent',
    color: '#f4ebd9',
    border: '1px solid #f4ebd9',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '2px',
    cursor: 'pointer',
    zIndex: 110
  }}
>
  X
</button>


        </motion.div>
        
      )}
    </AnimatePresence>
  );
};
