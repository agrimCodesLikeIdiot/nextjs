import { useChat } from "ai";

export default async (req, res) => {
  const chat = useChat();
  const response = await chat.generateResponse(req.body.message);
  return res.json({ response });
};