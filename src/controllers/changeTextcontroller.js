const changeTextService = require('../services/changeTextService');

const handleChangeTextRequest = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text parameter required!' });
  }

  try {
    const response = await changeTextService.processChangeTextRequest(text);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChangeTextRequest };