const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Google Cloud 프로젝트 정보 및 API 키
const projectId = 'Generative Language Client'; // Google Cloud 프로젝트 ID
const apiKey = 'AIzaSyApHZ-y-sIzhhRmPjTrM4op8oOuxqDFm_g';     // Google AI API 키

// Gemini 모델 초기화
async function initializeModel() {
    const client = new GenerativeLanguage.DiscussServiceClient({
        projectId: projectId,
        apiKey: apiKey,
    });
    return client;
}

// Gemini API 호출 함수
async function getGeminiResponse(client, message) {
    try {
        const response = await client.generateMessage({
            model: 'models/chat-bison-001',
            prompt: {
                context: "You are a helpful assistant.", // 챗봇 역할 설정
                messages: [{ content: message }],
            },
            temperature: 0.5, // 창의성 조절 (0 ~ 1)
            candidateCount: 1, // 생성할 답변 개수
        });

        return response[0].candidates[0].content; // 답변 내용 반환
    } catch (error) {
        console.error('Gemini API Error:', error);
        return "죄송합니다. 현재 Gemini AI가 응답할 수 없습니다.";
    }
}

// 메시지 전송 및 응답 처리
sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        appendMessage('user', userMessage);
        userInput.value = '';

        try {
            const client = await initializeModel();
            const response = await getGeminiResponse(client, userMessage);
            appendMessage('assistant', response);
        } catch (error) {
            console.error(error);
            appendMessage('assistant', "죄송합니다. 현재 Gemini AI가 응답할 수 없습니다.");
        }
    }
});

// 메시지 추가 함수 (이전 예시와 동일)
function appendMessage(sender, message) {
    // ...
}

// 초기 메시지 (선택 사항)
appendMessage('assistant', "안녕하세요! Gemini 학습 도우미입니다. 무엇을 도와드릴까요?");