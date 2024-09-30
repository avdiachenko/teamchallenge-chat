import Notification from "../models/Notification.js";

export function addNotification(data) {
  return Notification.create(data);
}
