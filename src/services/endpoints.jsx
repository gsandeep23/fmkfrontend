import services from "./services";

export const postIdeasText = (text) =>
  services.post("/api/ideas/text", { text }).then((r) => r.data);

export const postIdeasImage = (imageB64, label = "") =>
  services.post("/api/ideas/image", { image_b64: imageB64, label }).then((r) => r.data);

export const postChatImage = (imageB64, message, history) =>
  services.post("/api/chat/image", { image_b64: imageB64, message, history }).then((r) => r.data);

export const postTts = (text) =>
  services.post("/api/tts", { text }).then((r) => r.data);

export const postTranscribe = (audioB64) =>
  services.post("/api/transcribe", { audio_b64: audioB64 }).then((r) => r.data);

export const postChat = (history, message, contextObject = "", contextIdeas = []) =>
  services
    .post("/api/chat", { history, message, context_object: contextObject, context_ideas: contextIdeas })
    .then((r) => r.data);

export const postMoreInfo = (idea) =>
  services.post("/api/more-info", { idea }).then((r) => r.data);

export const postActionOptions = (idea, zipcode = "") =>
  services.post("/api/action-options", { idea, zipcode }).then((r) => r.data);

export const postShareMessage = (idea, moreInfo = "") =>
  services.post("/api/share-message", { idea, more_info: moreInfo }).then((r) => r.data);

export const postMeetupInvite = (idea) =>
  services.post("/api/meetup-invite", { idea }).then((r) => r.data);
