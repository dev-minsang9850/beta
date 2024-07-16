const chatMessages = document.getElementById('chat-messages');
const userInputForm = document.getElementById('user-input-form');
const userInput = document.getElementById('user-input');

// 폼 제출 이벤트 처리
userInputForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
    const message = userInput.value.trim();

    if (message !== '') {
        appendMessage('user', message); // 사용자 메시지 화면에 추가
        userInput.value = ''; // 입력창 초기화
        userInput.disabled = true; // 입력창 비활성화 (로딩 표시)

        try {
            const response = await sendMessageToAPI(message); // API 호출 (비동기)
            appendMessage('bot', response); // 챗봇 응답 화면에 추가
        } catch (error) {
            console.error('API 호출 에러:', error);
            appendMessage('bot', '죄송합니다. 현재 답변을 드릴 수 없습니다.');
        } finally {
            userInput.disabled = false; // 입력창 다시 활성화
            userInput.focus(); // 입력창에 포커스
        }
    }
});

// 메시지 화면에 추가 함수
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const senderElement = document.createElement('div'); // 발신자 표시
    senderElement.classList.add('sender');
    senderElement.textContent = sender === 'user' ? '나' : '챗봇';
    messageElement.appendChild(senderElement);

    const textElement = document.createElement('div'); // 메시지 내용
    textElement.classList.add('text');
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    chatMessages.appendChild(messageElement); // 메시지 추가
    chatMessages.scrollTop = chatMessages.scrollHeight; // 스크롤 맨 아래로
}

// Google AI API 호출 함수 (예시 - Vertex AI)
async function sendMessageToAPI(message) {
    const API_KEY = 'AIzaSyBU-4KIGGx9TiPkIyKU8jk0to4MCUTtl4Y'; // Google Cloud API 키
    const API_URL = 'https://dialogflow.googleapis.com'; // Vertex AI 엔드포인트 URL

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            'instances': [{'content': message}] // Vertex AI 요청 형식
        })
    });

    const data = await response.json();
    return data.predictions[0].content; // Vertex AI 응답 형식
}
