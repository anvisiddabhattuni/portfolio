"use client";

import { useEffect, useRef, useState } from 'react';

export interface AnimatedTab {
  id: string;
  label: string;
}

export interface AnimatedTabsProps {
  tabs: AnimatedTab[];
  activeId?: string;
  onTabChange?: (tab: AnimatedTab) => void;
  ariaLabel?: string;
}

export function AnimatedTabs({
  tabs,
  activeId,
  onTabChange,
  ariaLabel = 'Sections',
}: AnimatedTabsProps) {
  const [internalActiveId, setInternalActiveId] = useState(tabs[0]?.id ?? '');
  const currentId = activeId ?? internalActiveId;
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeId) setInternalActiveId(activeId);
  }, [activeId]);

  useEffect(() => {
    const container = containerRef.current;
    const activeTabElement = activeTabRef.current;

    if (!container || !activeTabElement) return;

    const { offsetTop, offsetHeight } = activeTabElement;
    const clipTop = offsetTop + 8;
    const clipBottom = offsetTop + offsetHeight + 8;

    container.style.clipPath = `inset(${Number((clipTop / container.offsetHeight) * 100).toFixed()}% 0 ${Number(
      100 - (clipBottom / container.offsetHeight) * 100,
    ).toFixed()}% 0 round 14px)`;
  }, [currentId, tabs]);

  const chooseTab = (tab: AnimatedTab) => {
    setInternalActiveId(tab.id);
    onTabChange?.(tab);
  };

  return (
    <nav className="animated-tabs" aria-label={ariaLabel}>
      <div ref={containerRef} className="animated-tabs__active-layer" aria-hidden="true">
        <div className="animated-tabs__active-fill">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="animated-tabs__button animated-tabs__button--active"
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animated-tabs__base-layer">
        {tabs.map((tab) => {
          const isActive = currentId === tab.id;

          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              type="button"
              onClick={() => chooseTab(tab)}
              className="animated-tabs__button"
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
