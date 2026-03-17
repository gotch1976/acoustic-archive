export type FacilityCategory = "lost" | "living";

export interface Space {
  id: string;
  name: string;
  nameEn: string;
  irPath: string;
  imagePath: string;
  heroLabel?: string;
  heroLabelEn?: string;
}

export interface Sample {
  id: string;
  name: string;
  icon: string;
}

export interface Facility {
  slug: string;
  name: string;
  nameEn: string;
  category: FacilityCategory;
  description: string;
  heroImage: string;
  spaces: Space[];
}
