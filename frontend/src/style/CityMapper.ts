export const getCityName = (areacode: number, sigungucode: number): string => {
  // areacode가 1, 2, 3, 4, 5, 6, 7, 8, 39인 경우
  const cityByAreaCode: { [key: number]: string } = {
    1: '서울',
    2: '인천',
    3: '대전',
    4: '대구',
    5: '광주',
    6: '부산',
    7: '울산',
    8: '세종',
    39: '제주',
  }

  if (cityByAreaCode[areacode]) {
    return cityByAreaCode[areacode]
  }

  // 특정 예외 처리
  if (areacode === 36 && sigungucode === 3) return '경남고성'
  if (areacode === 31 && sigungucode === 5) return '경기광주'

  // 시/군 이름에서 마지막 글자 제거하여 반환
  const sigunguNames: { [key: number]: { [key: number]: string } } = {
    1: {
      1: '강남구',
      2: '강동구',
      3: '강북구',
      4: '강서구',
      5: '관악구',
      6: '광진구',
      7: '구로구',
      8: '금천구',
      9: '노원구',
      10: '도봉구',
      11: '동대문구',
      12: '동작구',
      13: '마포구',
      14: '서대문구',
      15: '서초구',
      16: '성동구',
      17: '성북구',
      18: '송파구',
      19: '양천구',
      20: '영등포구',
      21: '용산구',
      22: '은평구',
      23: '종로구',
      24: '중구',
      25: '중랑구',
    },
    2: {
      1: '강화군',
      2: '계양구',
      3: '미추홀구',
      4: '남동구',
      5: '동구',
      6: '부평구',
      7: '서구',
      8: '연수구',
      9: '옹진군',
      10: '중구',
    },
    3: {
      1: '대덕구',
      2: '동구',
      3: '서구',
      4: '유성구',
      5: '중구',
    },
    4: {
      1: '남구',
      2: '달서구',
      3: '달성군',
      4: '동구',
      5: '북구',
      6: '서구',
      7: '수성구',
      8: '중구',
      9: '군위군',
    },
    5: {
      1: '광산구',
      2: '남구',
      3: '동구',
      4: '북구',
      5: '서구',
    },
    6: {
      1: '강서구',
      2: '금정구',
      3: '기장군',
      4: '남구',
      5: '동구',
      6: '동래구',
      7: '부산진구',
      8: '북구',
      9: '사상구',
      10: '사하구',
      11: '서구',
      12: '수영구',
      13: '연제구',
      14: '영도구',
      15: '중구',
      16: '해운대구',
    },
    7: {
      1: '중구',
      2: '남구',
      3: '동구',
      4: '북구',
      5: '울주군',
    },
    31: {
      1: '가평',
      2: '고양',
      3: '과천',
      4: '광명',
      5: '광주', // 경기광주 처리됨
      6: '구리',
      7: '군포',
      8: '김포',
      9: '남양주',
      10: '동두천',
      11: '부천',
      12: '성남',
      13: '수원',
      14: '시흥',
      15: '안산',
      16: '안성',
      17: '안양',
      18: '양주',
      19: '양평',
      20: '여주',
      21: '연천',
      22: '오산',
      23: '용인',
      24: '의왕',
      25: '의정부',
      26: '이천',
      27: '파주',
      28: '평택',
      29: '포천',
      30: '하남',
      31: '화성',
    },
    32: {
      1: '강릉',
      2: '고성',
      3: '동해',
      4: '삼척',
      5: '속초',
      6: '양구',
      7: '양양',
      8: '영월',
      9: '원주',
      10: '인제',
      11: '정선',
      12: '철원',
      13: '춘천',
      14: '태백',
      15: '평창',
      16: '홍천',
      17: '화천',
      18: '횡성',
    },
    33: {
      1: '괴산',
      2: '단양',
      3: '보은',
      4: '영동',
      5: '옥천',
      6: '음성',
      7: '제천',
      8: '진천',
      9: '청원',
      10: '청주',
      11: '충주',
      12: '증평',
    },
    34: {
      1: '공주',
      2: '금산',
      3: '논산',
      4: '당진',
      5: '보령',
      6: '부여',
      7: '서산',
      8: '서천',
      9: '아산',
      11: '예산',
      12: '천안',
      13: '청양',
      14: '태안',
      15: '홍성',
      16: '계룡',
    },
    35: {
      1: '경산',
      2: '경주',
      3: '고령',
      4: '구미',
      6: '김천',
      7: '문경',
      8: '봉화',
      9: '상주',
      10: '성주',
      11: '안동',
      12: '영덕',
      13: '영양',
      14: '영주',
      15: '영천',
      16: '예천',
      17: '울릉',
      18: '울진',
      19: '의성',
      20: '청도',
      21: '청송',
      22: '칠곡',
      23: '포항',
    },
    36: {
      1: '거제',
      2: '거창',
      3: '고성', // 경남고성 처리됨
      4: '김해',
      5: '남해',
      6: '마산',
      7: '밀양',
      8: '사천',
      9: '산청',
      10: '양산',
      12: '의령',
      13: '진주',
      14: '진해',
      15: '창녕',
      16: '창원',
      17: '통영',
      18: '하동',
      19: '함안',
      20: '함양',
      21: '합천',
    },
    37: {
      1: '고창',
      2: '군산',
      3: '김제',
      4: '남원',
      5: '무주',
      6: '부안',
      7: '순창',
      8: '완주',
      9: '익산',
      10: '임실',
      11: '장수',
      12: '전주',
      13: '정읍',
      14: '진안',
    },
    38: {
      1: '강진',
      2: '고흥',
      3: '곡성',
      4: '광양',
      5: '구례',
      6: '나주',
      7: '담양',
      8: '목포',
      9: '무안',
      10: '보성',
      11: '순천',
      12: '신안',
      13: '여수',
      16: '영광',
      17: '영암',
      18: '완도',
      19: '장성',
      20: '장흥',
      21: '진도',
      22: '함평',
      23: '해남',
      24: '화순',
    },
    39: {
      1: '남제주군',
      2: '북제주군',
      3: '서귀포시',
      4: '제주시',
    },
  }

  return sigunguNames[areacode]?.[sigungucode] || ''
}
