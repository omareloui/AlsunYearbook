export type NotificationType = "success" | "info" | "warn" | "danger";

export interface Notification {
  id: number;
  isShown: boolean;
  type: NotificationType;
  message: string;
  duration: number;
}
