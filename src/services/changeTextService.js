const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.geminiPro;

const processChangeTextRequest = async (text) => {
  const payload = {
    "nome": "",
    "email": "",
    "cpf": "",
    "rg": "",
    "telefone": "",
    "sexo": "",
    "estado_civil": "",
    "cidade": "",
    "estado": "",
    "qualificacao": "",
    "formacao": "",
    "cursos_certificacoes": [],
    "idiomas": [],
    "tecnologias": [],
    "linkedin": "",
    "portifolio": "",
    "repositorio_git": "",
    "tempo_experiencia_funcao": "",
    "experiencia": [
      {
        "empresa": "",
        "periodo": "",
        "cargo": "",
        "atividades": ""
      }
    ]
  };

  const prompt = `preciso que analise esse curriculo: ${text} e traga os dados dele para dentro desse payload: ${JSON.stringify(payload)}, e devolva apenas o payload em formato JSON. Onde não identificar campos traga com o valor: "Dados faltantes".`


  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

    console.log("Resposta do Gemini:", textResponse);

    try {
      return JSON.parse(textResponse);
    } catch (error) {
      console.error("Erro ao fazer o parse da resposta JSON do Gemini:", error);
      console.error("Resposta bruta do Gemini:", textResponse);
      return { error: "Erro ao processar a resposta do Gemini" };
    }
  } catch (error) {
    console.error("Erro ao chamar a API do Gemini:", error);
    return { error: "Erro ao comunicar com a API do Gemini" };
  }
};

module.exports = { processChangeTextRequest };