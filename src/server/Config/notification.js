import Notification from "@Models/notification.model";


export default function saveNotification(vendorId, description) {
    const time = new Date().toLocaleString();
    const query = new Notification({
        username: vendorId,
        notificationMsg: description,
        time: time,
    });
    query.save();
};