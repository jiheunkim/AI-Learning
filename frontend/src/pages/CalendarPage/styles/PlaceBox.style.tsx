import styled from 'styled-components'

import distancePlaceholderSvg from '../../../assets/distance_placeholder.svg'

interface PlaceBoxContainerProps {
  isSliding: boolean
}

interface PlaceBoxTextProps {
  isEditing: boolean
}

interface DeleteIconProps {
  isVisible: boolean
}

export const PlaceBoxWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-left: 3rem;
  margin-bottom: 5rem;
`

export const PlaceBoxContainer = styled.div<
  PlaceBoxContainerProps & { isEditing: boolean }
>`
  width: 100%;
  height: 4.5rem;
  background-color: white;
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  position: relative;
  justify-content: ${({ isEditing }) =>
    isEditing ? 'flex-start' : 'space-between'};
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  transform: ${({ isSliding }) =>
    isSliding ? 'translateX(-60px)' : 'translateX(0)'};
`

export const PlaceBoxText = styled.div<PlaceBoxTextProps>`
  line-height: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-left: ${({ isEditing }) => (isEditing ? '0' : '0.5rem')};
  margin-right: ${({ isEditing }) => (isEditing ? '1.5rem' : '0.3rem')};
`

export const PlaceBoxTitle = styled.p`
  font-weight: 700;
  font-size: 1rem;
`

export const PlaceBoxCity = styled.p`
  font-weight: 400;
  color: #626262;
  font-size: 0.9rem;
`

export const PlaceBoxPic = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  position: relative;
  object-fit: cover;
  border-radius: 10px;
`

export const DragEditIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VerticalLine = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(217, 217, 217, 0.8);
  box-shadow: 0 0 8px rgba(217, 217, 217, 0.6);
`

export const NumberCircle = styled.div`
  position: absolute;
  left: 0;
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  background-color: #dd176a;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.7rem;
  color: white;
`

export const DistancePlaceholder = styled.div`
  left: -10px;
  margin-top: 4.5rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  width: 40px;
  height: 20px;
  padding: 0.2rem 0.4rem 0.2rem 0.2rem;
  background-image: url(${distancePlaceholderSvg});
  color: #626262;
`

export const DeleteIcon = styled.div<DeleteIconProps>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f31c1c;
  color: white;
  border-radius: 0px 15px 15px 0px;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`

export const CheckboxWrapper = styled.div`
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
`
