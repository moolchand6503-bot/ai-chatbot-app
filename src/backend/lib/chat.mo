import Types "../types/chat";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Message = Types.Message;

  /// Initialize session with a welcome message
  public func initSession(history : List.List<Message>) : () {
    history.add({
      role = #assistant;
      content = "Hello! I'm your AI assistant. I'm here to chat, answer questions, and help you out. You can ask me about the time, tell me a joke, ask for help, or just say hello. What's on your mind?";
      timestamp = Time.now();
    });
  };

  /// Generate a rule-based assistant response for the given user message
  public func generateResponse(userMessage : Text) : Text {
    let lower = userMessage.toLower();

    // Greetings
    if (lower.contains(#text "hello") or lower.contains(#text "hi") or lower.contains(#text "hey") or lower.contains(#text "howdy") or lower.contains(#text "greetings")) {
      return "Hello there! Great to hear from you. How can I help you today?";
    };

    // Farewell
    if (lower.contains(#text "bye") or lower.contains(#text "goodbye") or lower.contains(#text "see you") or lower.contains(#text "farewell") or lower.contains(#text "take care")) {
      return "Goodbye! It was a pleasure chatting with you. Come back anytime!";
    };

    // Name
    if (lower.contains(#text "your name") or lower.contains(#text "who are you") or lower.contains(#text "what are you")) {
      return "I'm your AI assistant, powered by the Internet Computer! I'm here to have conversations and help you with questions.";
    };

    // How are you
    if (lower.contains(#text "how are you") or lower.contains(#text "how do you do") or lower.contains(#text "how's it going") or lower.contains(#text "how are things")) {
      return "I'm doing great, thanks for asking! As an AI, I'm always ready to chat. How are you doing today?";
    };

    // Help
    if (lower.contains(#text "help") or lower.contains(#text "what can you do") or lower.contains(#text "commands") or lower.contains(#text "capabilities")) {
      return "I can chat with you about all sorts of things! Try asking me: my name, the current time, a joke, about the weather, or just say hello. I'm also happy to have a general conversation!";
    };

    // Time
    if (lower.contains(#text "time") or lower.contains(#text "what time") or lower.contains(#text "current time") or lower.contains(#text "clock")) {
      return "I don't have access to a real-time clock, but I can tell you that time on the Internet Computer is measured in nanoseconds since the Unix epoch. Pretty precise, right?";
    };

    // Weather
    if (lower.contains(#text "weather") or lower.contains(#text "forecast") or lower.contains(#text "temperature") or lower.contains(#text "raining") or lower.contains(#text "sunny") or lower.contains(#text "cloudy")) {
      return "I wish I could check the weather for you! I don't have access to weather data, but I'd suggest checking a local weather app or website for the latest forecast.";
    };

    // Jokes
    if (lower.contains(#text "joke") or lower.contains(#text "funny") or lower.contains(#text "make me laugh") or lower.contains(#text "tell me a joke")) {
      // Pick from a few jokes based on message length (deterministic variety)
      let len = lower.size();
      if (len % 4 == 0) {
        return "Why don't scientists trust atoms? Because they make up everything! 😄";
      } else if (len % 4 == 1) {
        return "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾";
      } else if (len % 4 == 2) {
        return "What do you call a fish without eyes? A fsh! 🐟";
      } else {
        return "Why can't you explain puns to kleptomaniacs? They always take things literally! 😂";
      };
    };

    // Thanks
    if (lower.contains(#text "thank") or lower.contains(#text "thanks") or lower.contains(#text "appreciate") or lower.contains(#text "cheers")) {
      return "You're very welcome! It's my pleasure to help. Is there anything else you'd like to know?";
    };

    // Yes / agree
    if (lower == "yes" or lower == "yeah" or lower == "yep" or lower == "sure" or lower == "absolutely" or lower == "of course") {
      return "Great! What would you like to talk about?";
    };

    // No
    if (lower == "no" or lower == "nope" or lower == "nah" or lower == "not really") {
      return "No problem at all! Feel free to ask me anything whenever you're ready.";
    };

    // Interesting / cool
    if (lower.contains(#text "interesting") or lower.contains(#text "cool") or lower.contains(#text "awesome") or lower.contains(#text "amazing") or lower.contains(#text "wow")) {
      return "Glad you think so! The world is full of fascinating things. Is there something specific you'd like to explore?";
    };

    // About the app / internet computer
    if (lower.contains(#text "internet computer") or lower.contains(#text "icp") or lower.contains(#text "dfinity") or lower.contains(#text "blockchain") or lower.contains(#text "canister")) {
      return "The Internet Computer is a blockchain platform that allows fully on-chain applications to run at web speed. This very chatbot is running entirely on the IC — no traditional servers needed!";
    };

    // Sad / feeling down
    if (lower.contains(#text "sad") or lower.contains(#text "unhappy") or lower.contains(#text "depressed") or lower.contains(#text "down") or lower.contains(#text "lonely")) {
      return "I'm sorry to hear you're not feeling your best. Remember, it's okay to have tough days. I'm here to chat if that helps, and it might also be good to reach out to friends or loved ones.";
    };

    // Happy / feeling good
    if (lower.contains(#text "happy") or lower.contains(#text "great") or lower.contains(#text "wonderful") or lower.contains(#text "fantastic") or lower.contains(#text "excellent")) {
      return "That's wonderful to hear! Positive energy is contagious. What's making your day great?";
    };

    // Food
    if (lower.contains(#text "food") or lower.contains(#text "hungry") or lower.contains(#text "eat") or lower.contains(#text "dinner") or lower.contains(#text "lunch") or lower.contains(#text "breakfast")) {
      return "Food is one of life's great pleasures! Unfortunately I can't eat, but I imagine it must be delicious. What kind of cuisine do you enjoy?";
    };

    // Music
    if (lower.contains(#text "music") or lower.contains(#text "song") or lower.contains(#text "sing") or lower.contains(#text "playlist") or lower.contains(#text "album")) {
      return "Music is such a powerful force! I don't have ears to listen with, but I find the concept of music fascinating. Do you have a favourite genre or artist?";
    };

    // Short / empty message fallbacks
    if (lower.size() <= 3) {
      return "I see! Could you share a bit more? I'd love to help.";
    };

    // Diverse fallback responses based on message length
    let fallbackIndex = lower.size() % 6;
    if (fallbackIndex == 0) {
      return "That's an interesting thought! I'd love to explore that further. Could you tell me more?";
    } else if (fallbackIndex == 1) {
      return "Hmm, I'm not quite sure how to respond to that, but I'm curious — what's the context?";
    } else if (fallbackIndex == 2) {
      return "Great point! I'm still learning, but I find conversations like this really engaging. What else is on your mind?";
    } else if (fallbackIndex == 3) {
      return "I appreciate you sharing that. I may not have a perfect answer, but I'm here to chat anytime!";
    } else if (fallbackIndex == 4) {
      return "That's something I haven't encountered before! You can also try asking me about jokes, the weather, or just say hello.";
    } else {
      return "Interesting! I'm always happy to chat. Feel free to ask me anything — I'll do my best to help!";
    };
  };

  /// Append a message to the conversation history
  public func appendMessage(history : List.List<Message>, role : Types.Role, content : Text) : () {
    history.add({
      role;
      content;
      timestamp = Time.now();
    });
  };

  /// Return all messages as an immutable array
  public func getHistory(history : List.List<Message>) : [Message] {
    history.toArray();
  };
};
