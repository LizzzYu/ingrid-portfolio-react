import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Cross from '../../images/cross.png';
import { secondaryTitleStyle } from '../../styles/typography';

const ModalWrapper = styled.div<{ isFloating: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 背景透明度 50% */
  backdrop-filter: blur(5px); /* 模糊效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

  overflow: ${({ isFloating }) => (isFloating ? 'scroll' : 'auto')};
`;

const ModalContent = styled.div<{ width: number; isFloating: boolean }>`
  box-sizing: border-box;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px rgba(20, 16, 0, 0.1);
  position: relative;
  width: ${({ width }) => `${width}px`};

  ${({ isFloating }) =>
    isFloating &&
    css`
      position: absolute;
      top: 50px;
    `}
`;

const ContentWrapper = styled.div`
  padding: 40px;
`;

export type ModalProps = {
  title?: string | React.ReactNode;
  content: string | React.ReactNode;
  onClose: () => void;
  width?: number;
  image?: string;
  isFloating?: boolean;
};

const CloseButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Image = styled.div<{ image: string }>`
  width: 700px;
  height: 350px;

  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  ${secondaryTitleStyle};
`;

const Modal = ({
  title,
  content,
  onClose,
  width = 580,
  image,
  isFloating = false,
}: ModalProps) => {
  const handleClickBackgroundClose = (event: React.SyntheticEvent) => {
    if (event.target === event?.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    // 打開彈窗食禁止背景滾動
    document.body.style.overflow = 'hidden';

    // 關閉彈窗時恢復背景滾動
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <ModalWrapper isFloating={isFloating} onClick={handleClickBackgroundClose}>
      <ModalContent width={width} isFloating={isFloating}>
        {image && <Image image={image} />}
        <ContentWrapper>
          <Title>{title}</Title>
          <div>{content}</div>
        </ContentWrapper>
        <CloseButton src={Cross} alt="close" onClick={onClose} />
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
