const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");

// Crud (CREATE): Criar uma nova Review
router.post("/room/:id/review", async (req, res) => {
  try {
    //Criar a Review
    const newReview = await ReviewModel.create(req.body);

    //Atualizar as reviews deste usuário
    const updatedRoom = await RoomModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    console.log(updatedRoom);

    //Responde o resultado pro cliente
    return res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud (Read): Rota para listar todos os quartos
router.get("/room/:id/review", async (req, res) => {
  try {
    const reviewsList = await RoomModel.findOne({
      _id: req.params.id,
    }).populate("reviews");

    return res.status(200).json(reviewsList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// crUd (Update): Rota para atualizar um comentário específico
router.patch("/review/:id", async (req, res) => {
  try {
    // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado, caso tenha a opção: { new: true }
    const updatedReview = await ReviewModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    console.log(updatedReview);
    // Se o findOne() retornar null, ou seja, não encontrar o review no banco, retornamos um 404 dizendo que não encontramos o review
    if (!updatedReview) {
      return res.status(404).json({ msg: "Review not found" });
    }

    return res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cruD (Delete): Apaga o quarto especificado do banco
router.delete("/review/:id", async (req, res) => {
  try {
    const deleted = await ReviewModel.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ msg: "Review not found" });
    }
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
