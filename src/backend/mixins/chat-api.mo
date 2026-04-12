import Types "../types/chat";
import ChatLib "../lib/chat";
import List "mo:core/List";

mixin (history : List.List<Types.Message>) {
  /// Send a user message and receive a rule-based assistant reply
  public func sendMessage(userMessage : Text) : async Text {
    ChatLib.appendMessage(history, #user, userMessage);
    let response = ChatLib.generateResponse(userMessage);
    ChatLib.appendMessage(history, #assistant, response);
    response;
  };

  /// Retrieve the full conversation history for the current session
  public query func getHistory() : async [Types.Message] {
    ChatLib.getHistory(history);
  };
};
