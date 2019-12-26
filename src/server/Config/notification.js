import Notification from "@Models/notification.model";


export default function saveNotification(vendorId, description, urlId) {
    const time = new Date().toLocaleString();
    const query = new Notification({
        username: vendorId,
        notificationMsg: description,
        urlId: urlId,
        time: time,
    });
    query.save();
};