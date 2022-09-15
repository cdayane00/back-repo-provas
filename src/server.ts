import app from './app';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
    console.log(colors.green.bold(`Server is running on port ${PORT}`));
})