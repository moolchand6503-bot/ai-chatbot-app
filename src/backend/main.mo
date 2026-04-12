import Types "types/chat";
import ChatMixin "mixins/chat-api";
import ChatLib "lib/chat";
import List "mo:core/List";

actor {
  let history = List.empty<Types.Message>();

  // Seed the welcome message on first load
  ChatLib.initSession(history);

  include ChatMixin(history);
};
