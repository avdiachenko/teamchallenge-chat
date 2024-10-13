export interface Notification {
  _id: string;
  text: string;
  type: "Events" | "Emergency" | "Payments";
  residential_complex: string;
  createdAt: string;
  updatedAt: string;
}
