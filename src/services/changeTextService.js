const { GoogleGenerativeAI } = require("@google/generative-ai");

const processChangeTextRequest = async (text) => {
  const API_KEY = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = await genAI.getGenerativeModel({ model: 'gemini-2.0-flash'} )

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

  const prompt = `preciso que analise esse curriculo: ${text} e traga os dados dele para dentro desse payload: ${JSON.stringify(payload)}, e devolva apenas o payload em formato JSON. Onde não identificar campos traga com o valor: "Dados faltantes".`;
  const timeout = 6000; 
  try {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout ao chamar a API do Gemini")), timeout)
      )
    ]);
    const response = await result.response;
    const textResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonResponse = JSON.parse(textResponse.trim());
    console.log("Resposta do Gemini:", jsonResponse);

    if (jsonResponse) {
      try {
        return jsonResponse;
      } catch (error) {
        return { error: "Erro ao processar a resposta do Gemini" };
      }
    } else {
      return { error: "Resposta do Gemini inválida ou incompleta" };
    }
  } catch (error) {
    return { error: "Erro ao comunicar com a API do Gemini" };
  }
};

module.exports = { processChangeTextRequest };