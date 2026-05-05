'use client';;
import * as React from 'react';
import { motion } from 'motion/react';

import { useIsInView } from '@/hooks/use-is-in-view';

function HighlightText({
  ref,
  text,
  style,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  transition = { duration: 2, ease: 'easeInOut' },
  delay = 0,
  ...props
}) {
  const { ref: localRef, isInView } = useIsInView(ref, {
    inView,
    inViewOnce,
    inViewMargin,
  });

  return (
    <motion.span
      ref={localRef}
      data-slot="highlight-text"
      initial={{ backgroundSize: '0% 100%' }}
      animate={isInView ? { backgroundSize: '100% 100%' } : undefined}
      transition={{
        ...transition,
        delay: (transition?.delay ?? 0) + delay / 1000,
      }}
      style={{
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline-block',
        ...style,
      }}
      {...props}>
      {text}
    </motion.span>
  );
}

export { HighlightText };
