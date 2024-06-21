import React, { useState, useEffect, useRef } from "react";

interface PopoverProps {
  children: React.ReactNode;
  clickEvent: React.MouseEvent<HTMLButtonElement> | null;
  hideType?: "hidden" | "remove";
  position?:
    | "top-left"
    | "top"
    | "top-right"
    | "bottom-left"
    | "bottom"
    | "bottom-right"
    | "left"
    | "right";
}

export default function ManualPopover({
  children,
  clickEvent,
  hideType = "remove",
  position = "bottom",
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollableElementsRef = useRef<HTMLElement[]>([]);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const calculatePosition = (rect: DOMRect) => {
    const positions = {
      "top-left": {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      },
      top: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      },
      "top-right": {
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX,
      },
      "bottom-left": {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      },
      bottom: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      },
      "bottom-right": {
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX,
      },
      left: {
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.left + window.scrollX,
      },
      right: {
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.right + window.scrollX,
      },
    };

    return positions[position];
  };

  const transformStyles = {
    "top-left": { transform: "translateY(-100%)" },
    top: { transform: "translate(-50%, -100%)" },
    "top-right": { transform: "translate(-100%, -100%)" },
    "bottom-left": {},
    bottom: { transform: "translateX(-50%)" },
    "bottom-right": { transform: "translateX(-100%)" },
    left: { transform: "translate(-100%, -50%)" },
    right: { transform: "translateY(-50%)" },
  };

  const updatePosition = () => {
    if (clickEvent) {
      const rect = (clickEvent.target as HTMLElement).getBoundingClientRect();
      setPopoverPosition(calculatePosition(rect));
    }
  };

  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    if (clickEvent) {
      const rect = (clickEvent.target as HTMLElement).getBoundingClientRect();
      setPopoverPosition(calculatePosition(rect));
      setIsOpen(true);

      const scrollableElements: HTMLElement[] = [];
      let parent: HTMLElement | null = (clickEvent.target as HTMLElement)
        .parentElement;
      while (parent) {
        if (
          parent.scrollHeight > parent.clientHeight ||
          parent.scrollWidth > parent.clientWidth
        ) {
          scrollableElements.push(parent);
        }
        parent = parent.parentElement;
      }

      scrollableElementsRef.current = scrollableElements;

      scrollableElements.forEach((element) => {
        element.addEventListener("scroll", updatePosition);
      });

      if (!resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(updatePosition);
        resizeObserverRef.current.observe(document.body);
      }

      return () => {
        scrollableElements.forEach((element) => {
          element.removeEventListener("scroll", updatePosition);
        });
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
          resizeObserverRef.current = null;
        }
      };
    }
    setIsOpen(false);
  }, [clickEvent, position]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !popoverRef.current.contains(event.target) &&
        !(clickEvent.target as HTMLElement).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollableElementsRef.current.forEach((element) => {
        element.addEventListener("scroll", updatePosition);
      });

      return () => {
        scrollableElementsRef.current.forEach((element) => {
          element.removeEventListener("scroll", updatePosition);
        });
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && popoverRef.current && !isInViewport(popoverRef.current)) {
      setIsOpen(false);
    }
  }, [popoverPosition]);

  if (!isOpen && hideType === "remove") {
    return null;
  }

  return (
    <div
      ref={popoverRef}
      style={{
        position: "fixed",
        top: `${popoverPosition.top.toString()}px`,
        left: `${popoverPosition.left.toString()}px`,
        display: isOpen ? "block" : "none",
        ...transformStyles[position],
      }}
    >
      {children}
    </div>
  );
}
