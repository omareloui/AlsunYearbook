type GTagOptions = {
  debug_mode?: boolean;
  value?: number;
  [K: string]: string | number | boolean | Date;
};

type GTagFunction = (
  actionOrConfig: "event" | "config" | "js",
  actionOrValue: string | number | Date,
  options?: GTagOptions
) => void;

declare interface Window {
  dataLayer: unknown[];
}
