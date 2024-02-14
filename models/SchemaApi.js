const mongoose = require('mongoose');

const Maq = new mongoose.Schema({
    TEMPERATURA: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    INICIO_PROCESS_W: {
        type: String,
        required: true
    },
    PRODUCAO: {
        type: String,
        required: true
    },
    MAQ_LIG_DES_B: {
        type: Boolean,
        required: true
    },
    FIM_PROCESS_B: {
        type: Boolean,
        required: true
    },
    INICIO_PROCESS_B: {
        type: Boolean,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    FIM_PROCESS_W: {
        type: String,
        required: true
    },
    MAQ_LIG_DES_W: {
        type: String,
        required: true
    }

},
{
    timestamps: true,
});

mongoose.model('maq', Mac);