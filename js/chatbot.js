/* ============================================
   ARIA — VYAPTUM ADVISORY'S AI ASSISTANT (SCRIPTED DEMO)
   ------------------------------------------------
   Rule-based conversational demo: no external API calls,
   no cost, fully offline. Matches user intent via keywords,
   simulates a typing delay, and supports a short multi-turn
   "book a consultation" flow to show off guided conversations.
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Element refs ---------- */
  const bubble = document.getElementById('chatBubble');
  const badge = document.getElementById('chatBadge');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatPanelClose');
  const body = document.getElementById('chatBody');
  const quickRepliesWrap = document.getElementById('chatQuickReplies');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');

  const proactive = document.getElementById('chatProactive');
  const proactiveClose = document.getElementById('chatProactiveClose');

  const externalTriggers = [
    document.getElementById('heroChatBtn'),
    document.getElementById('tryDemoBtn'),
    document.getElementById('ctaChatBtn')
  ].filter(Boolean);

  /* ---------- State ---------- */
  const state = {
    isOpen: false,
    hasGreeted: false,
    bookingStep: null, // null | 'name' | 'email' | 'time' | 'done'
    booking: { name: '', email: '', time: '' }
  };

  /* ---------- Helpers ---------- */
  const scrollToBottom = () => { body.scrollTop = body.scrollHeight; };

  const formatTime = () => {
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.textContent = text;
    body.appendChild(msg);

    const time = document.createElement('div');
    time.className = 'chat-msg-time';
    time.textContent = formatTime();
    body.appendChild(time);

    scrollToBottom();
  }

  let typingEl = null;
  function showTyping() {
    typingEl = document.createElement('div');
    typingEl.className = 'chat-typing';
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typingEl);
    scrollToBottom();
  }
  function hideTyping() {
    if (typingEl) { typingEl.remove(); typingEl = null; }
  }

  function renderQuickReplies(options) {
    quickRepliesWrap.innerHTML = '';
    if (!options || !options.length) return;
    options.forEach(opt => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chat-chip';
      chip.textContent = opt;
      chip.addEventListener('click', () => handleUserSend(opt));
      quickRepliesWrap.appendChild(chip);
    });
  }

  function clearQuickReplies() {
    quickRepliesWrap.innerHTML = '';
  }

  /** Bot speaks after a realistic, length-based typing delay */
  function botSay(text, options) {
    showTyping();
    const delay = Math.min(1700, Math.max(650, text.length * 12));
    setTimeout(() => {
      hideTyping();
      addMessage(text, 'bot');
      renderQuickReplies(options);
      input.focus();
    }, delay);
  }

  /* ---------- Open / close panel ---------- */
  function openChat() {
    state.isOpen = true;
    panel.classList.add('open');
    bubble.classList.add('open');
    badge.classList.add('hidden');
    hideProactive(true);

    if (!state.hasGreeted) {
      state.hasGreeted = true;
      setTimeout(() => {
        botSay(
          "Hi! I'm ARIA 👋 Vyaptum Advisory's AI assistant. I can tell you about our services, pricing, or book you a free consultation. What would you like to know?",
          ['Our Services', 'Book a Consultation', 'Pricing', 'About Vyaptum']
        );
      }, 400);
    }
    input.focus();
  }

  function closeChat() {
    state.isOpen = false;
    panel.classList.remove('open');
    bubble.classList.remove('open');
  }

  function toggleChat() {
    state.isOpen ? closeChat() : openChat();
  }

  bubble.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', closeChat);
  externalTriggers.forEach(btn => btn.addEventListener('click', openChat));

  /* ---------- Proactive teaser bubble ---------- */
  let proactiveDismissed = false;
  function showProactive() {
    if (proactiveDismissed || state.isOpen) return;
    proactive.classList.add('visible');
    setTimeout(() => hideProactive(), 9000);
  }
  function hideProactive(permanently) {
    proactive.classList.remove('visible');
    if (permanently) proactiveDismissed = true;
  }
  proactiveClose.addEventListener('click', () => hideProactive(true));
  proactive.addEventListener('click', (e) => {
    if (e.target === proactiveClose) return;
    hideProactive(true);
    openChat();
  });
  setTimeout(showProactive, 3500);

  /* ---------- Form submit ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserSend(text);
  });

  /* ============================================
     CONVERSATION LOGIC
     ============================================ */
  function handleUserSend(text) {
    addMessage(text, 'user');
    clearQuickReplies();

    // Multi-turn booking flow takes priority over generic intent matching
    if (state.bookingStep) {
      handleBookingStep(text);
      return;
    }

    const intent = matchIntent(text);
    respondToIntent(intent, text);
  }

  function matchIntent(raw) {
    const t = raw.toLowerCase();

    // Note: word stems use \w* (not a trailing \b) so inflected forms like
    // "consultation", "booking", "services" or "results" still match —
    // a trailing \b right after a partial stem would otherwise reject them.
    if (/\bbook\w*|\bconsult\w*|\bschedul\w*|\bappointment\w*|\bmeet\w*|talk to.*(sale|expert)/.test(t)) return 'booking';
    if (/\bpric\w*|\bcost\w*|\bfee\w*|how much|\bbudget\w*|\brate\w*/.test(t)) return 'pricing';
    if (/\bservice\w*|\boffer\w*|help with|what do you do|what can you do/.test(t)) return 'services';
    if (/case stud\w*|\bresult\w*|success stor\w*|track record|\broi\b/.test(t)) return 'results';
    if (/\babout\b|who are you|\bcompany\w*|\bhistory\b|\bfounded\b|vyaptum/.test(t)) return 'about';
    if (/\baria\b|ai assistant|\bchatbot\w*|are you (a )?(bot|ai|human)|how do you work/.test(t)) return 'aria';
    if (/\bindustr\w*|\bsector\w*|\bniche\w*/.test(t)) return 'industries';
    if (/\bhuman\w*|\bagent\w*|representative|real person|\bsomeone\b/.test(t)) return 'human';
    if (/\bhours?\b|\bavailable\b|time zone|\bopen\b|\bwhen\b/.test(t)) return 'hours';
    if (/\blocation\w*|\boffice\w*|\baddress\w*|where are you|\bbased\b/.test(t)) return 'location';
    if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(t)) return 'greeting';
    if (/\bthank\w*|appreciate|\bcheers\b/.test(t)) return 'thanks';
    if (/\bbye\b|goodbye|see you/.test(t)) return 'bye';

    return 'fallback';
  }

  function respondToIntent(intent, rawText) {
    switch (intent) {
      case 'greeting':
        botSay(
          "Hello there! Great to hear from you. What can I help you with — our services, pricing, or booking a free consultation?",
          ['Our Services', 'Book a Consultation', 'Pricing']
        );
        break;

      case 'services':
        botSay(
          "We cover Registrations (company, NGO, licenses like FSSAI/MSME/ISO/IEC), Compliance, Taxation, Trademark & IPR, Business Consultation, Documentation, and Loans & CC. You'll find the full breakdown in the Services section above — or I can connect you with an expert on WhatsApp.",
          ['Talk to a human', 'Book a Consultation']
        );
        break;

      case 'pricing':
        botSay(
          "Great question — engagement pricing depends on scope, timeline and team size, so we don't publish flat rates. Most clients start with a free 30-minute discovery call where we scope the work in rupees, upfront, before anything is signed.",
          ['Book a Consultation', 'What\'s included in discovery?', 'Talk to a human']
        );
        break;

      case 'results':
        botSay(
          "A few highlights: 38% revenue growth for a Bhagalpur textiles client in 6 months, a 27% operating cost reduction for a Muzaffarpur dairy client, and we helped a Patna-based education group raise ₹18 Cr post-strategy. I can point you to full case studies on this page.",
          ['See Case Studies', 'Book a Consultation']
        );
        break;

      case 'about':
        botSay(
          "Vyaptum Advisory was founded in 2013 in Patna by former operators who ran family businesses and MSMEs across Bihar — not just career advisors. We're a team of 22+ consultants working across 8 sectors from 3 offices in Bihar.",
          ['Our Services', 'Book a Consultation']
        );
        break;

      case 'aria':
        botSay(
          "I'm ARIA — a demo of the kind of AI assistant Vyaptum helps clients build. On this site I run on scripted logic (no live model calls), but in a real client deployment I'd be connected to a full language model and your CRM. Meta, right? 😄",
          ['Our Services', 'Book a Consultation']
        );
        break;

      case 'industries':
        botSay(
          "We work across agriculture & dairy, textiles, retail & FMCG, education, real estate & construction, and MSME manufacturing, among others. Chances are we've seen a problem close to yours before.",
          ['Our Services', 'Book a Consultation']
        );
        break;

      case 'human':
        botSay(
          "Of course — I can hand you off. In a live deployment this would ring our team directly or open a live chat handoff. For this demo, the best next step is booking a consultation and a consultant will follow up personally.",
          ['Book a Consultation', 'Email us instead']
        );
        break;

      case 'hours':
        botSay(
          "I'm available right here, 24/7 — no wait time. Our human consultants generally work Monday to Saturday, 10am–7pm IST, but a same-day response is typical.",
          ['Book a Consultation']
        );
        break;

      case 'location':
        botSay(
          "We're based in Patna, with offices across Bihar, and run most engagements hybrid — on-site kickoffs with remote execution in between. Wherever in Bihar or Eastern India you're based, we can work with you.",
          ['Book a Consultation', 'Our Services']
        );
        break;

      case 'thanks':
        botSay("You're very welcome! Anything else I can help with?", ['Our Services', 'Book a Consultation', 'No, that\'s all']);
        break;

      case 'bye':
        botSay("Thanks for stopping by Vyaptum Advisory — have a great day! 👋");
        break;

      case 'booking':
        startBookingFlow();
        break;

      default:
        handleFallback(rawText);
    }
  }

  function handleFallback(rawText) {
    botSay(
      "I want to make sure I get you the right answer — I'm a focused demo assistant, so I'm best with questions about Vyaptum's services, pricing, case studies, or booking a call. Try one of these:",
      ['Our Services', 'Book a Consultation', 'Pricing', 'Talk to a human']
    );
  }

  /* ---------- Booking flow (multi-turn demo) ---------- */
  function startBookingFlow() {
    state.bookingStep = 'name';
    state.booking = { name: '', email: '', time: '' };
    botSay("I'd love to get that booked. First, what's your name?");
  }

  function handleBookingStep(text) {
    if (state.bookingStep === 'name') {
      state.booking.name = text;
      state.bookingStep = 'email';
      botSay(`Nice to meet you, ${text.split(' ')[0]}! What's the best email to send the invite to?`);
      return;
    }

    if (state.bookingStep === 'email') {
      const looksLikeEmail = /\S+@\S+\.\S+/.test(text);
      if (!looksLikeEmail) {
        botSay("That doesn't quite look like an email address — mind double-checking it?");
        return;
      }
      state.booking.email = text;
      state.bookingStep = 'time';
      botSay(
        `Got it — I'll send the invite to ${text}. When works best for a 30-minute call?`,
        ['Tomorrow morning', 'This week, afternoon', 'Next week']
      );
      return;
    }

    if (state.bookingStep === 'time') {
      state.booking.time = text;
      state.bookingStep = null;
      botSay(
        `You're all set, ${state.booking.name.split(' ')[0]}! ✅ In a live deployment I'd now send a calendar invite to ${state.booking.email} for "${text}" and notify a Vyaptum consultant. For this demo, consider it booked — thanks for trying ARIA!`,
        ['Ask another question', 'Our Services']
      );
      return;
    }
  }

});
