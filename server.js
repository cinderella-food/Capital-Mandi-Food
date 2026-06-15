const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const TELEGRAM_BOT_TOKEN = '7546948976:AAFPHTjFRKGAOQOgkyg6uEqXCjl_ca2nC2k';
const TELEGRAM_CHAT_ID = '56081692';
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/send-order', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        if (response.data.ok) {
            res.json({ success: true });
        } else {
            throw new Error('Telegram API error');
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
