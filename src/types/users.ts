export interface Users {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  dateCreated: string;
}
