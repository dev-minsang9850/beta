// 요소 선택
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const imageUpload = document.getElementById('image-upload');
const uploadButton = document.getElementById('upload-button');

// 이벤트 리스너 등록
sendButton.addEventListener('click', handleSendMessage);
uploadButton.addEventListener('click', () => imageUpload.click());
imageUpload.addEventListener('change', handleImageUpload);

// 메시지 전송 처리 함수
function handleSendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        sendMessage(messageText, 'my-message');
        handleAutoReply(messageText);
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// 자동 응답 처리 함수
function handleAutoReply(messageText) {
    if (messageText.toLowerCase() === '안녕') {
        setTimeout(() => sendMessage('안녕! 무엇을 도와줄까?', 'other-message'), 500);
    } else if (messageText.includes('내가 보내준 파일로 문제 만들어줘')) {
        setTimeout(() => {
            sendMessage('알겠어! 나에게 파일을 보내줘!', 'other-message');
            uploadButton.style.display = 'block';
        }, 500);
    } else if (messageText.toLowerCase() === '고마워!') {
        setTimeout(() => sendMessage('별말씀을!', 'other-message'), 500);
    }
}

// 이미지 업로드 처리 함수
function handleImageUpload() {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const userImageElement = document.createElement('img');
            userImageElement.src = e.target.result;
            userImageElement.style.maxWidth = '300px';
            sendMessage(userImageElement, 'my-message');

            setTimeout(() => {
                const responseImageElement = document.createElement('img');
                responseImageElement.src = 'response_image.png'; // 응답 이미지 파일 경로
                responseImageElement.style.maxWidth = '300px';

                const messageContainer = document.createElement('div');
                messageContainer.appendChild(responseImageElement);
                const messageText = document.createElement('p');
                messageText.textContent = '여기 만들었어!';
                messageContainer.appendChild(messageText);

                sendMessage(messageContainer, 'other-message');
            }, 1000);

            uploadButton.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// 메시지 생성 및 추가 함수
function sendMessage(messageContent, messageClass) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', messageClass);
    if (typeof messageContent === 'string') {
        messageElement.textContent = messageContent;
    } else {
        messageElement.appendChild(messageContent);
    }
    chatMessages.appendChild(messageElement);
}
