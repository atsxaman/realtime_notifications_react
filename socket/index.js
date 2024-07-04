import { Server } from "socket.io";
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb+srv://urbanmizaz:gUHxuwnDxCI9ABgj@cluster0.v3ny1cx.mongodb.net/realtime-notification?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to database successfully');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

// Define a schema and model for notifications
const notificationSchema = new mongoose.Schema({
    username: String,
    count: { type: Number, default: 0 }
});
const Notification = mongoose.model('Notification', notificationSchema);

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
});

io.on("connection", (socket) => {
    socket.on('send_notification', async (username) => {
        let notification = await Notification.findOne({ username });
        if (notification) {
            notification.count++;
        } else {
            notification = new Notification({ username, count: 1 });
        }
        await notification.save();
        io.emit('receive_notification', { username, count: notification.count });
    });

    // Handle clearing notifications
    socket.on('clear_notifications', async (username) => {
        await Notification.deleteMany({ username });
        io.emit('clear_notifications', username);
    });

    // Handle user reconnecting and sending current notification count
    socket.on('reconnect_user', async (username) => {
        const notification = await Notification.findOne({ username });
        if (notification) {
            socket.emit('receive_notification', { username, count: notification.count });
        }
    });

    socket.on('disconnect', () => {
    });
});

io.listen(3000);
