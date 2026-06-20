let history = [];

function addMessage(sender, text, isAI = false) {
  const messagesDiv = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`;
  div.innerHTML = `
    <div class="${isAI ? 'bg-slate-700' : 'bg-cyan-400 text-black'} max-w-[80%] rounded-3xl px-6 py-4">
      <strong>${sender}:</strong><br>${text}
    </div>`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  addMessage('You', message);
  input.value = '';

  // Show thinking
  addMessage('AI Agent', 'Thinking...', true);

  try {
    const res = await fetch('http://localhost:5000/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    
    // Remove last "Thinking..." message and replace with real reply
    const messages = document.getElementById('messages');
    messages.removeChild(messages.lastChild);

    addMessage('AI Agent', data.reply || "No response", true);

    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: data.reply });

  } catch (err) {
    console.error("Frontend Error:", err);
    const messages = document.getElementById('messages');
    messages.removeChild(messages.lastChild);
    addMessage('AI Agent', `❌ Connection Error: ${err.message}<br><br>Is backend running on port 5000?`, true);
  }
}

// Enter key support
document.getElementById('userInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});