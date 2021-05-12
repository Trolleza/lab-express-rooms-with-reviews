const router = require("express").Router();
const RoomModel = require("../models/Room.model");

// Crud (CREATE) - Criar novo room
router.post("/room", async (req, res) => {
  try {
    const newRoom = await RoomModel.create(req.body);
    return res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud (READ) - Rota para listar todos os quartos
router.get("/rooms", async (req, res) => {
  try {
    // O find() sem filtros traz todos os documentos da collection
    const rooms = await RoomModel.find();
    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

//Pegando um room específico
router.get("/room/:id", async (req, res) => {
  try {
    const room = await RoomModel.findOne({ _id: req.params.id }).populate(
      "reviews"
    );
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// crUd (UPDATE) - Rota para atualizar um quarto específico
router.patch("/room/:id", async (req, res) => {
  // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
  try {
    const updatedRoom = await RoomModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ msg: "Room not found." });
    }
    return res.status(200).json(updatedRoom);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cruD (DELETE) - Apaga o quarto especificado do banco
router.delete("/room/:id", async (req, res) => {
  try {
    const deleted = await RoomModel.deleteOne({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ msg: "Room not found." });
    }
    // Por convenção, em deleções retornamos um objeto vazio para descrever sucesso
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
