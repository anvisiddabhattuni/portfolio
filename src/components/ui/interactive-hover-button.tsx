import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.ReactNode;
  showArrow?: boolean;
}

interface InteractiveHoverLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: React.ReactNode;
  showArrow?: boolean;
}

function InteractiveHoverContent({
  text = 'Button',
  showArrow = true,
}: {
  text?: React.ReactNode;
  showArrow?: boolean;
}) {
  return (
    <>
      <span className="nk-hover-button__idle">{text}</span>
      <span className="nk-hover-button__hover" aria-hidden="true">
        <span>{text}</span>
        {showArrow && <ArrowRight className="nk-hover-button__icon" />}
      </span>
      <span className="nk-hover-button__blob" aria-hidden="true" />
    </>
  );
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = 'Button', showArrow = true, className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn('nk-hover-button', className)}
      {...props}
    >
      <InteractiveHoverContent text={children ?? text} showArrow={showArrow} />
    </button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

const InteractiveHoverLink = React.forwardRef<
  HTMLAnchorElement,
  InteractiveHoverLinkProps
>(({ text = 'Button', showArrow = true, className, children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn('nk-hover-button', className)}
      {...props}
    >
      <InteractiveHoverContent text={children ?? text} showArrow={showArrow} />
    </a>
  );
});

InteractiveHoverLink.displayName = 'InteractiveHoverLink';

export { InteractiveHoverButton, InteractiveHoverLink };
