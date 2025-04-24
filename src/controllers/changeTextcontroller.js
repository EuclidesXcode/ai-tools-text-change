const changeTextService = require('../services/changeTextService');

const handleChangeTextRequest = async (req, res) => {
  const { text } = req.body;

  console.log("O QUE VEIO: ", type)

  if (!text) {
    return res.status(400).json({ error: 'Text parameter required!' });
  }

  try {
    const response = await changeTextService.processChangeTextRequest(type, text);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChangeTextRequest };