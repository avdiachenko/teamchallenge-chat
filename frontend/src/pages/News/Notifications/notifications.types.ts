export interface Notification {
  _id: string;
  text: string;
  type: "events" | "emergency" | "payments";
  residential_complex: string;
  createdAt: string;
  updatedAt: string;
}
