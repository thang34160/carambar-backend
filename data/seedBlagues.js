const { sequelize, Blague } = require('../models');

const blaguesInitiales = [
    {
        question: "Que dit un escargot quand il croise une limace ?",
        reponse: "Regarde le nudiste !"
    },
    {
        question: "Qu'est-ce qui est jaune et qui attend ?",
        reponse: "Jonathan !"
    },
    {
        question: "Que dit un café qui arrive en retard au bureau ?",
        reponse: "Désolé, j'étais dans les bouchons !"
    },
    {
        question: "Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ?",
        reponse: "Un chat-mallow !"
    },
    {
        question: "Qu'est-ce qui est transparent et qui sent la carotte ?",
        reponse: "Un pet de lapin !"
    },
    {
        question: "Que dit un pingouin quand il se présente ?",
        reponse: "Polo !"
    }
];

async function seedDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // Recrée les tables

        await Blague.bulkCreate(blaguesInitiales);

        console.log('✅ Base de données peuplée avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du peuplement:', error);
        process.exit(1);
    }
}

// Exécuter si appelé directement
if (require.main === module) {
    seedDatabase();
}

module.exports = { blaguesInitiales };
