import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useRef } from 'react';
import HeroIconX from '../HeroIcons/HeroIconX';

interface Props {
  open: boolean;
  onClose: () => void;
  className?: string;
  /**
   * When screen readers focus the backdrop, they need an instruction
   * saying what it will do. By default, this is: 'Go Back'.
   */
  screenReaderCloseBackdropLabel?: string;
}

export const Modal: React.FC<Props> = ({
  open,
  onClose,
  children,
  className,
  screenReaderCloseBackdropLabel,
}) => {
  const [shouldShowChildren, setShouldShowChildren] = useState(false);
  const backdropRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    /**
     * To keep the animation from looking janky,
     * we make the children show in the DOM for 300ms
     * longer than they usually would.
     */
    if (open) {
      setShouldShowChildren(true);
      backdropRef.current?.focus();
    } else if (shouldShowChildren) {
      setTimeout(() => {
        setShouldShowChildren(false);
      }, 300);
    } else {
      setShouldShowChildren(false);
    }
  }, [open]);

  return (
    <BackdropWrapper
      isVisible={open}
      className="h-screen w-screen fixed top-0 left-0"
    >
      <Backdrop
        isVisible={open}
        className="absolute h-screen w-screen top-0 left-0 bg-smoke-600"
        onClick={onClose}
        ref={backdropRef}
        title={screenReaderCloseBackdropLabel || 'Go Back'}
      >
        <div className="mt-4 mr-6 absolute top-0 right-0">
          <HeroIconX className="text-white w-8 h-8"></HeroIconX>
        </div>
      </Backdrop>
      {shouldShowChildren && (
        <ChildrenWrapper
          isVisible={open}
          className="z-10 max-h-screen flex flex-col justify-center w-full sm:w-auto"
        >
          <div className={`flex-1 m-4 ${className || ''}`}>{children}</div>
        </ChildrenWrapper>
      )}
    </BackdropWrapper>
  );
};

const Backdrop = styled.button<{ isVisible: boolean }>`
  transition: opacity 300ms;
  ${(props) =>
    !props.isVisible
      ? css`
          pointer-events: none;
          opacity: 0;
        `
      : css``}
`;

const ChildrenWrapper = styled.div<{ isVisible: boolean }>`
  transition: opacity 300ms;
  ${(props) =>
    !props.isVisible
      ? css`
          pointer-events: none;
          opacity: 0;
        `
      : css``}
`;

const BackdropWrapper = styled.div<{ isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.isVisible
      ? css`
          pointer-events: none;
        `
      : ''}
  @media only screen and (max-width: 639px) {
    justify-content: stretch;
    align-items: flex-end;
  }
`;

export default Modal;
