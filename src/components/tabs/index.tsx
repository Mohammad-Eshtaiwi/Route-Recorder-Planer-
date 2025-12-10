import { useEffect } from "react";
import { useTabs } from "./context";
import styles from "./styles.module.css";
export function Tabs({
  tabs,
  initialTab,
}: {
  tabs: { label: string; isActive: boolean }[];
  initialTab: string;
}) {
  const { activeTab, setActiveTab } = useTabs();
  useEffect(() => {
    setActiveTab(initialTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          className={styles.tab}
          data-active={activeTab === tab.label}
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
