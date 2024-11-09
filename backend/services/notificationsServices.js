import Notification from "../models/Notification.js";

export function addNotification(data) {
  return Notification.create(data);
}

export function listNotificationsByFilter(filter, query) {
  return Notification.find(filter, "", query).sort({ updatedAt: -1 });
}

export function deleteNotification(id) {
  return Notification.findByIdAndDelete(id);
}

export function deleteNotificationByModerator(params) {
  return Notification.findOneAndDelete(params);
}

export function findNotificationByID(id) {
  return Notification.findById(id);
}
