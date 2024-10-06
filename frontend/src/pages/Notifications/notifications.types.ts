export interface Notification {
  text: string;
  type: "Events" | "Emergency messages" | "Payments";
  residential_complex: string;
  updatedAt: string;
}
