// 정답 숫자 생성
export function generateAnswer() {
    const digits = [];
    while (digits.length < 3) {
      const rand = Math.floor(Math.random() * 10);
      if (!digits.includes(rand)) digits.push(rand);
    }
    return digits.join('');
  }
  
  // 입력에 대한 결과 계산
  export function getBaseballResult(input, answer) {
    let strike = 0;
    let ball = 0;
  
    [...input].forEach((num, idx) => {
      if (num === answer[idx]) strike++;
      else if (answer.includes(num)) ball++;
    });
  
    return { strike, ball };
  }
  
  // 입력 유효성 검사
  export function isValidInput(input) {
    return /^[0-9]{3}$/.test(input) && new Set(input).size === 3;
  }
  