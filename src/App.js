import React, { useState } from 'react';
import './App.css';

// MBTI 질문 데이터 (임의)
const QUESTIONS = [
  { q: '나는 사람들과 어울리는 것이 좋다.', type: 'E' },
  { q: '나는 혼자만의 시간이 필요하다.', type: 'I' },
  { q: '나는 사실에 근거해 판단한다.', type: 'S' },
  { q: '나는 상상과 가능성을 중시한다.', type: 'N' },
  { q: '나는 논리적으로 결정한다.', type: 'T' },
  { q: '나는 감정적으로 공감한다.', type: 'F' },
  { q: '나는 계획적으로 움직인다.', type: 'J' },
  { q: '나는 즉흥적으로 움직인다.', type: 'P' },
  { q: '나는 여러 사람과 대화하는 것이 편하다.', type: 'E' },
  { q: '나는 깊이 있는 대화를 선호한다.', type: 'I' },
  { q: '나는 현재에 집중한다.', type: 'S' },
  { q: '나는 미래를 자주 상상한다.', type: 'N' },
];

// MBTI 유형별 설명 (임의)
const MBTI_DESC = {
  INFP: {
    title: 'INFP (중재자)',
    desc: '이상주의적이고, 깊은 내면을 가진 성격. 강점: 공감, 창의성. 약점: 현실 도피, 우유부단.'
  },
  ESTJ: {
    title: 'ESTJ (경영자)',
    desc: '현실적이고, 체계적인 리더. 강점: 조직력, 책임감. 약점: 융통성 부족, 완고함.'
  },
  // ... (다른 유형도 임의로 추가)
};

const CHOICES = [
  { label: '매우 그렇다', score: 2 },
  { label: '보통이다', score: 1 },
  { label: '아니다', score: 0 },
];

function getMbtiType(scores) {
  const EI = scores.E >= scores.I ? 'E' : 'I';
  const SN = scores.S >= scores.N ? 'S' : 'N';
  const TF = scores.T >= scores.F ? 'T' : 'F';
  const JP = scores.J >= scores.P ? 'J' : 'P';
  return EI + SN + TF + JP;
}

function App() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score) => {
    const type = QUESTIONS[step].type;
    setScores((prev) => ({ ...prev, [type]: prev[type] + score }));
    setAnswers((prev) => [...prev, score]);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setAnswers([]);
    setShowResult(false);
  };

  // 결과 계산
  const mbti = getMbtiType(scores);
  const mbtiInfo = MBTI_DESC[mbti] || { title: mbti, desc: '설명이 준비 중입니다.' };

  return (
    <div className="App">
      <div className="mbti-container">
        <h1 className="mbti-title">MBTI 성격 유형 검사</h1>
        {!showResult ? (
          <div className="question-slide animate-slide">
            <div className="question-num">Q{step + 1} / {QUESTIONS.length}</div>
            <div className="question-text">{QUESTIONS[step].q}</div>
            <div className="choices">
              {CHOICES.map((c, i) => (
                <button key={i} className="choice-btn" onClick={() => handleAnswer(c.score)}>{c.label}</button>
              ))}
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}></div>
            </div>
          </div>
        ) : (
          <div className="result-slide animate-fadein">
            <div className="mbti-type">{mbtiInfo.title}</div>
            <div className="mbti-desc">{mbtiInfo.desc}</div>
            <div className="result-actions">
              <button onClick={handleRestart} className="restart-btn">다시하기</button>
              <button className="share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>링크 복사</button>
              <a className="share-btn" href={`https://twitter.com/intent/tweet?text=나의 MBTI는 ${mbti}!&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">트위터 공유</a>
              <a className="share-btn" href={`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(window.location.href)}&text=나의 MBTI는 ${mbti}!`} target="_blank" rel="noopener noreferrer">카카오톡 공유</a>
            </div>
          </div>
        )}
      </div>
      <footer className="mbti-footer">© 2024 MBTI Test. Powered by React.</footer>
    </div>
  );
}

export default App;
