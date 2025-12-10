import styles from "./map-slot.module.css";
export function MapSlot({
  children,
  slot,
  ...rest
}: {
  slot: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div slot={slot} className={styles.mapSlot} {...rest}>
      {children}
    </div>
  );
}
