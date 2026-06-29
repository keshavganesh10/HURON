import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FadeProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
} & MotionProps;

export function FadeUp({ children, delay = 0, className, ...rest }: FadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxHero({
  src,
  alt,
  className,
  intensity = 180,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, intensity]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/35 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
