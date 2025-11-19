export interface TimelineNode {
  id: number;
  year: string;
  glow: "low" | "medium" | "high" | "prime";
  labelSide: "top" | "bottom" | "left" | "right";

  // Bilingual fields
  labelEN: string;
  labelJP: string;

  descriptionEN: string;
  descriptionJP: string;

  // List of project keys
  projects: string[];
}
