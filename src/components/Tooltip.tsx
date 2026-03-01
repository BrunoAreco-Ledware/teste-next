import React from "react";

interface TooltipProps {
  content: string;
  show: boolean;
  children: React.ReactNode;
}

export default function Tooltip({ content, show, children }: TooltipProps) {
  return (
    <div className="app-tooltip-wrapper">
      {children}
      <span
        role="tooltip"
        className={"app-tooltip" + (show ? " show-on-hover" : " is-hidden")}
      >
        {content}
      </span>
    </div>
  );
}
