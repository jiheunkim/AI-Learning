import styled from 'styled-components'

export const PlaceItem = styled.li`
  display: flex;
  justify-content: space-between; // 자식 요소들을 양 끝으로 정렬
  align-items: center;
  padding: 10px;
  position: relative;
  background-color: white;
  box-shadow: 0 4px 8px 2px rgba(98, 98, 98, 0.3);
  border-radius: 8px;
  margin-bottom: 10px;
  width: 100%;
`

export const PlaceImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 5px;
  margin-left: 10px; // 이미지와 텍스트 사이의 간격
`

export const PlaceInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // 내부 텍스트를 왼쪽 정렬
`

export const PlaceName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  text-align: left;
`

export const PlaceDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
  text-align: left;
`
