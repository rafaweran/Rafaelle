import { GoogleGenAI } from "@google/genai";

// Ensure API key is available
const apiKey = process.env.API_KEY || '';
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export const getGeminiClient = (): GoogleGenAI | null => {
  if (!aiClient && apiKey) {
     aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generatePatientSummary = async (complaint: string, history: string): Promise<string> => {
  const client = getGeminiClient();
  if (!client) return "Serviço de IA indisponível. Verifique a chave de API.";

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Atue como um assistente médico. Resuma brevemente o seguinte caso para um médico antes da consulta. Queixa: ${complaint}. Histórico: ${history}. Seja direto.`,
    });
    return response.text || "Não foi possível gerar o resumo.";
  } catch (error) {
    console.error("Erro ao gerar resumo:", error);
    return "Erro ao conectar com o assistente inteligente.";
  }
};