const { Blague } = require('../models');

class BlagueController {
    // GET /api/v1/blagues - Récupérer toutes les blagues
    static async getAllBlagues(req, res) {
        try {
            const blagues = await Blague.findAll({
                order: [['createdAt', 'DESC']]
            });

            res.json({
                success: true,
                count: blagues.length,
                data: blagues
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des blagues',
                error: error.message
            });
        }
    }

    // GET /api/v1/blagues/:id - Récupérer une blague par ID
    static async getBlagueById(req, res) {
        try {
            const { id } = req.params;
            const blague = await Blague.findByPk(id);

            if (!blague) {
                return res.status(404).json({
                    success: false,
                    message: 'Blague non trouvée'
                });
            }

            res.json({
                success: true,
                data: blague
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de la blague',
                error: error.message
            });
        }
    }

    // GET /api/v1/blagues/random - Récupérer une blague aléatoire
    static async getRandomBlague(req, res) {
        try {
            const count = await Blague.count();

            if (count === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Aucune blague disponible'
                });
            }

            // Générer un offset aléatoire
            const randomOffset = Math.floor(Math.random() * count);

            const blague = await Blague.findOne({
                offset: randomOffset
            });

            res.json({
                success: true,
                data: blague
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de la blague aléatoire',
                error: error.message
            });
        }
    }

    // POST /api/v1/blagues - Créer une nouvelle blague
    static async createBlague(req, res) {
        try {
            const { question, reponse } = req.body;

            if (!question || !reponse) {
                return res.status(400).json({
                    success: false,
                    message: 'Question et réponse sont obligatoires'
                });
            }

            const nouvelleBlague = await Blague.create({
                question: question.trim(),
                reponse: reponse.trim()
            });

            res.status(201).json({
                success: true,
                message: 'Blague créée avec succès',
                data: nouvelleBlague
            });
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    message: 'Données invalides',
                    errors: error.errors.map(err => err.message)
                });
            }

            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de la blague',
                error: error.message
            });
        }
    }
}

module.exports = BlagueController;
