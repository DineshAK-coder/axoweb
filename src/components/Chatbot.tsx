import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import Groq from 'groq-sdk';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am the Axoweb AI Assistant. I can help resolve any doubts regarding our digital solutions. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error('Groq API key not configured');
      }

      // Initialize Groq client
      const groq = new Groq({ 
        apiKey,
        dangerouslyAllowBrowser: true 
      });
      
      const systemPrompt = `You are the official customer support AI for Axoweb Technologies. 
Your strict motto is to solve user queries and clear doubts related to Axoweb's tech solutions.

SERVICES WE OFFER:
1. Website Development (high-performance, striking digital experiences)
2. Automation Solutions (scaling operations, CRM integrations, data pipelines)
3. AI Agents & Tools (custom AI chatbots, predictive analytics)
4. Custom Digital Solutions (SaaS platforms, internal dashboards)
5. Event & Cultural Websites (live ticketing, interactive schedules)
6. Digital Marketing (SEO, social campaigns, performance marketing)

CRITICAL PRICING RULE:
You must ALWAYS inform users that "prices may vary depending on the specific project scope, requirements, and scale." Do not ever give exact fixed prices. Always encourage them to reach out to our team for a custom quote.

TONE: Professional, extremely helpful, premium, and concise. Do not use large markdown headers, keep responses clean and conversational for a small chat window.`;

      // Build message history for Groq
      const groqMessages: any = [
        { role: 'system', content: systemPrompt },
        ...messages.slice(1).map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const chatCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 1024,
      });

      const responseText = chatCompletion.choices[0]?.message?.content || "";

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error: any) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message || 'Failed to connect to Groq'}. Please ensure the server was restarted.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[#05070D] border border-[#2F6BFF]/30 rounded-2xl shadow-[0_0_40px_rgba(47,107,255,0.15)] flex flex-col overflow-hidden mb-4">
          
          {/* Header */}
          <div className="bg-[#0A1220] border-b border-white/5 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2F6BFF]/20 border border-[#2F6BFF]/50 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#4DA3FF]" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">Axoweb Assistant</h3>
                <p className="text-[#4DA3FF] text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#9AA4B2] hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#2F6BFF] text-white rounded-br-sm' 
                      : 'bg-[#0A1220] border border-white/5 text-[#9AA4B2] rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#0A1220] border border-white/5 text-[#9AA4B2] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#0A1220] border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services..."
                className="w-full bg-[#05070D] border border-white/10 text-white placeholder-[#5A6472] text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-[#2F6BFF]/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 w-8 h-8 rounded-full bg-[#2F6BFF] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4DA3FF] transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
          
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(47,107,255,0.3)] transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-[#0A1220] border border-[#2F6BFF]/30 text-[#4DA3FF]' : 'bg-[#2F6BFF] text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
