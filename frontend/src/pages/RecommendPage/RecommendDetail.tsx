import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import * as L from './styles/RecommendDetail.style'
import { getAllPlace } from '../../api/calendar/getAllPlace'
import { postRecommendPlace } from '../../api/recommend/postRecommendPlace'
import BackButton from '../../components/BackButton/BackButton'
import authToken from '../../stores/authToken'
import dummyImage from '../RecommendPage/img/dummy.png'

interface RecommendPlace {
  contentid: number
  contenttypeid: number
  areacode: number
  sigungucode: number
  place: string
  firstimage: string
}

// const dummyData: RecommendPlace[] = [
//   {
//     contentid: 1,
//     contenttypeid: 12,
//     areacode: 35,
//     sigungucode: 2,
//     place: '불국사',
//     firstimage: dummyImage,
//   },
//   {
//     contentid: 2,
//     contenttypeid: 12,
//     areacode: 35,
//     sigungucode: 2,
//     place: '석굴암',
//     firstimage: dummyImage,
//   },
//   {
//     contentid: 3,
//     contenttypeid: 12,
//     areacode: 35,
//     sigungucode: 2,
//     place: '동궁과 월지',
//     firstimage: dummyImage,
//   },
// ]

const RecommendDetail: React.FC = () => {
  const token = authToken.getAccessToken()
  const navigate = useNavigate() // useNavigate 훅 사용

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // Retrieve query parameters
  const areacode = JSON.parse(searchParams.get('areacode') || '[]')
  const sigungucode = searchParams.get('sigungucode')
  const [recommendedPlaces, setRecommendedPlaces] = useState<RecommendPlace[]>(
    [],
  )
  const [searchTerm, setSearchTerm] = useState('') // 검색어 상태 추가
  //-----API 연결----
  useEffect(() => {
    const fetchPlaces = async () => {
      if (sigungucode === null) return

      if (areacode.length === 0) {
        // areacode가 빈 배열인 경우
        const allPlaces = await getAllPlace(token)
        if (allPlaces) {
          setRecommendedPlaces(allPlaces.data)
        } else {
          setRecommendedPlaces([]) // null인 경우 빈 배열로 설정
        }
      } else {
        // areacode가 값이 있는 경우
        const requestPayload = [
          {
            areacode,
            sigungucode: sigungucode !== 'null' ? Number(sigungucode) : null,
          },
        ]

        try {
          const response = await postRecommendPlace(token, requestPayload)
          if (response && response.data) {
            setRecommendedPlaces(response.data) // API에서 받아온 추천 장소 데이터 저장
          }
        } catch (error) {
          console.error('추천 장소를 가져오는 데 실패했습니다:', error)
        }
      }
    }

    fetchPlaces()
  }, [areacode, sigungucode, token])

  // 더미 데이터를 상태로 설정
  // useEffect(() => {
  //   setRecommendedPlaces(dummyData)
  // }, [areacode, sigungucode, token])

  const getLocationName = (
    areacode: number[],
    sigungucode: number | null,
  ): string => {
    if (areacode.length === 0) return '전체'
    if (areacode.includes(1)) return '서울'
    if (areacode.includes(2)) return '인천'
    if (areacode.includes(32)) return '강원도'
    if (areacode.includes(31)) return '경기도'
    if (areacode.includes(33) || areacode.includes(34)) return '충청도'
    if (areacode.includes(35) && sigungucode === 2) return '경주' // 특정 조건에 맞춰 경주로 설정
    if (areacode.includes(35) || areacode.includes(36)) return '경상도'
    if (areacode.includes(37) || areacode.includes(38)) return '전라도'
    if (areacode.includes(6)) return '부산'
    if (areacode.includes(5)) return '광주'
    if (areacode.includes(39)) return '제주'
    return '알 수 없음' // 매칭되지 않는 경우 기본값
  }

  const locationName = getLocationName(
    areacode,
    sigungucode !== 'null' ? Number(sigungucode) : null,
  )

  const getContentTypeDescription = (contenttypeid: number): string => {
    switch (contenttypeid) {
      case 12:
        return '관광지'
      case 14:
        return '문화시설'
      case 15:
        return '축제공연행사'
      default:
        return '기타'
    }
  }

  const filteredPlaces = recommendedPlaces.filter(place =>
    place.place.includes(searchTerm),
  )

  const handleClick = (place: RecommendPlace) => {
    navigate(
      `/place/${encodeURIComponent(place.contenttypeid)}/${encodeURIComponent(place.contentid)}`,
    )
  }

  const handleAddButtonClick = (
    e: React.MouseEvent,
    contentid: number,
    place: string,
  ) => {
    e.stopPropagation() // 상세페이지와 추가버튼 분리
    navigate(`/dateselected/${contentid}/${encodeURIComponent(place)}`)
  }

  return (
    <L.AppContainer>
      <L.Container>
        <L.Header>
          <BackButton />
          <L.SearchInput
            type='text'
            placeholder='원하는 장소 검색'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </L.Header>
        <L.PlacesSection>
          <L.SectionTitle>
            <L.BoldText>{locationName}</L.BoldText> 추천 장소
          </L.SectionTitle>
          <L.PlacesList>
            {filteredPlaces.map((place, index) => (
              <L.PlaceItem
                key={place.contentid}
                onClick={() => handleClick(place)}
              >
                <L.PlaceNumber>{index + 1}</L.PlaceNumber>
                <L.PlaceImage
                  src={place.firstimage || dummyImage}
                  alt={place.place}
                />
                <L.PlaceInfo>
                  <L.PlaceName>{place.place}</L.PlaceName>
                  <L.PlaceDescription>
                    {`${locationName} · ${getContentTypeDescription(place.contenttypeid)}`}
                  </L.PlaceDescription>
                </L.PlaceInfo>
                <L.AddButton
                  onClick={e =>
                    handleAddButtonClick(e, place.contentid, place.place)
                  }
                >
                  추가
                </L.AddButton>
              </L.PlaceItem>
            ))}
          </L.PlacesList>
        </L.PlacesSection>
      </L.Container>
    </L.AppContainer>
  )
}

export default RecommendDetail
