import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** Letter-by-letter rise (the THANKS FOR STOPPING BY bounce).
    Replays every time the text scrolls into view. Hidden offset
    clears the descender padding on .rising-word. */
const letterVariants = {
  hidden: { y: '130%' },
  visible: { y: 0, transition: { duration: 1, ease } },
};

export function RisingWords({ text }: { text: string }) {
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      transition={{ staggerChildren: 0.055 }}
    >
      {text.split(' ').map((word, w) => (
        <span key={w}>
          <span className="rising-word">
            {word.split('').map((ch, i) => (
              <motion.span key={i} className="rising-letter" variants={letterVariants}>
                {ch}
              </motion.span>
            ))}
          </span>{' '}
        </span>
      ))}
    </motion.span>
  );
}
