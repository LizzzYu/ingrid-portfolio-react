import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { WORK_MODAL_BANNERS } from '../../../data/carouselData';
import { useModal } from '../../../hooks/useModal';
import ArrowLeft from '../../../images/carousel/arrow_left.png';
import ArrowRight from '../../../images/carousel/arrow_right.png';
import CarouselPointer from '../CarouselPointer';
import WorkModal from '../WorkModal';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const CarouselContent = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
`;

const CarouselImageStyle = css`
  width: 1060px;
  height: 370px;
  filter: drop-shadow(0px 6px 6px rgba(20, 16, 0, 0.25));
  border-radius: 4px;
`;

const Image = styled.img`
  ${CarouselImageStyle}

  transition: transform 0.3s ease-in-out;
`;

const CenterImageWrapper = styled.div`
  position: relative;
`;

const CenterCarouselImage = styled.img`
  ${CarouselImageStyle}

  &:hover {
    outline: 6px solid var(--yellow);
    outline-offset: -6px;
  }
`;

const ButtonStyle = css`
  padding: 0;
  margin: 30px 0 0 0;
  width: 50px;
  height: 370px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 2;

  > img {
    opacity: 0;
  }

  &:hover {
    > img {
      opacity: 1;
      transition: ease-in-out 0.1s;
    }
  }
`;

const LeftButton = styled.button`
  ${ButtonStyle}

  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0 4px 4px 0;
`;

const RightButton = styled.button`
  ${ButtonStyle}

  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px 0 0 4px;
`;

type WorkListProps = {
  banners: string[];
  currentCarouselIndex?: number;
  currentBannerIndex?: number;
  handleNext?: () => void;
  handlePrev?: () => void;
};

const Carousel = ({
  handlePrev,
  handleNext,
  banners,
  currentCarouselIndex = 0,
  currentBannerIndex = 0,
}: WorkListProps) => {
  const { openModal, closeModal, isShowModal } = useModal();
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentModalImageIndex(currentCarouselIndex);
    openModal();
  };

  const currentImage = useMemo(
    () => WORK_MODAL_BANNERS[currentModalImageIndex],
    [currentModalImageIndex]
  );

  return (
    <Wrapper>
      <LeftButton onClick={handlePrev}>
        <img src={ArrowLeft} alt="previous" />
      </LeftButton>
      <CarouselContent>
        <Image
          src={
            banners[
              (currentCarouselIndex - 1 + banners.length) % banners.length
            ]
          }
          alt="carousel"
        />
        <CenterImageWrapper onClick={handleImageClick}>
          <CenterCarouselImage
            src={banners[currentCarouselIndex]}
            alt="carousel"
          />
          <CarouselPointer
            currentBannerIndex={currentCarouselIndex}
            length={banners.length}
          />
        </CenterImageWrapper>
        <Image
          src={banners[(currentCarouselIndex + 1) % banners.length]}
          alt="carousel"
        />
      </CarouselContent>
      <RightButton onClick={handleNext}>
        <img src={ArrowRight} alt="next" />
      </RightButton>
      {isShowModal && <WorkModal onClose={closeModal} image={currentImage} />}
    </Wrapper>
  );
};

export default Carousel;