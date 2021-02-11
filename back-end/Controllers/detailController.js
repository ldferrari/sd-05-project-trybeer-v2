const { Router } = require('express');

const service = require('../Service/detailService');

const detail = Router();

detail.get('/:id', async (req, res) => {
  try {
    // const { id } = req.payload;
    const { id } = req.params;
    const detailProducts = await service.getDetails(id);
    res.status(200).json(detailProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = detail;