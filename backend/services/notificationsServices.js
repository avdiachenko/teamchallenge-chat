import Notification from "../models/Notification.js";

export function addNotification(data) {
  return Notification.create(data);
}

export function listNotificationsByFilter(filter, query) {
  return Notification.find(filter, "", query);
}
