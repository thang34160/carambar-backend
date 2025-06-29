const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models');
const blagueRoutes = require('./routes/blagueRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Autorise les requêtes depuis ton frontend
app.use(cors({
    origin: "https://carambar-frontend.onrender.com"
}));

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/blagues', blagueRoutes);

// Route de base
app.get('/', (req, res) => {
    res.json({
        message: 'API Carambar & Co - Blagues',
        version: '1.0.0',
        endpoints: {
            getAll: 'GET /api/v1/blagues',
            getById: 'GET /api/v1/blagues/:id',
            getRandom: 'GET /api/v1/blagues/random',
            create: 'POST /api/v1/blagues'
        }
    });
});

// Initialisation de la base de données et démarrage du serveur
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');

        await sequelize.sync();
        console.log('✅ Base de données synchronisée');

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erreur lors du démarrage:', error);
    }
}

startServer();