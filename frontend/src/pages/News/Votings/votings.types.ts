export interface PollOption {
  name: string;
  quantity: number | boolean;
  _id: string;
}

export interface Poll {
  _id: string;
  headline: string;
  options: PollOption[];
}
