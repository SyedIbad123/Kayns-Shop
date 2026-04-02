/**
 * Defines the typed, config-driven clothing form structure for all supported product types.
 * Dependencies: consumed by DynamicClothingForm for rendering and by Zod schema wiring for field IDs.
 */

export type ClothingProductType =
  | "t-shirt"
  | "polo-shirt"
  | "hooded-sweatshirt"
  | "track-jacket"
  | "puffer-jacket"
  | "reversible-jacket"
  | "trousers"
  | "football-shorts"
  | "basketball-shorts"
  | "netball-shorts"
  | "rugby-shorts";

export type FieldType =
  | "image-radio"
  | "yes-no-conditional"
  | "fixed-badge"
  | "textarea"
  | "multi-file-upload"
  | "single-file-upload"
  | "number-input"
  | "select-dropdown"
  | "yes-no-simple";

export interface OptionItem {
  value: string;
  label: string;
  icon?: string;
  imageSrc?: string;
  priceModifier?: number;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: OptionItem[];
  conditionalOptions?: OptionItem[];
  required: boolean;
  placeholder?: string;
  helperText?: string;
  fixedValue?: string;
  acceptedFileTypes?: string;
  maxFiles?: number;
}

export interface ProductFormConfig {
  productType: ClothingProductType;
  label: string;
  description: string;
  fields: FormField[];
}

export type FormConfig = ProductFormConfig;

const LOGO_FILE_TYPES = ".jpg,.jpeg,.png,.cdr,.ai,.pdf,.svg";
const COLOR_PLACEHOLDER =
  "Describe how many colors you want. You can write color codes";
const LOGO_POSITION_PLACEHOLDER = "Please describe logo position in comment";

const icon = (paths: string) =>
  `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${paths}</svg>`;

const imageIcon = (src: string, alt: string) =>
  `<img src="${src}" alt="${alt}" width="56" height="56" style="width:56px;height:56px;object-fit:contain;" />`;

const ICONS = {
  // sleeves length
  shortSleeve: imageIcon("/short_sleeve.png", "Short sleeve"),
  longSleeve: imageIcon("/long_sleeve.png", "Long sleeve"),
  sleeveless: icon(
    '<path d="M18 20L27 10H37L46 20V28H40V24L36 22V52H28V22L24 24V28H18V20Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  ),

  // sleeves types
  raglan: imageIcon("/raglan_sleeve.png", "Raglan sleeve"),
  regular: imageIcon("/set_in_sleeve.png", "Set-In regular sleeve"),

  // collar images
  one_Piece_collar: imageIcon("/1_Piece_collar.png", "one_piece_collar"),
  ban_with_collar: imageIcon("/ban_with_collar.png", ""),
  ban_collar: imageIcon("/ban_collar.png", ""),
  concelled_hood_collar: imageIcon("/concelled_hood_collar.png", ""),
  emu_collar: imageIcon("/emu_collar.png", ""),
  hood_collar: imageIcon("/hood_collar.png", ""),
  hood_with_drawcard_collar: imageIcon("/hood_with_drawcard_collar.png", ""),
  hood_with_placket_collar: imageIcon("/hood_with_placket_collar.png", ""),
  hood_with_toggle_collar: imageIcon("/hood_with_toggle_collar.png", ""),
  jacket_collar: imageIcon("/jacket_collar.png", ""),
  ribbed_collar: imageIcon("/ribbed_collar.png", ""),
  ribbed_round_collar: imageIcon("/ribbed_round_collar.png", ""),
  ribbed_v_collar: imageIcon("/ribbed_v_collar.png", ""),
  round_collar: imageIcon("/round_collar.png", ""),
  v_plus_panel_collar: imageIcon("/v_plus_panel_collar.png", ""),
  v_shape_polo_collar: imageIcon("/v_shape_collar.png", ""),
  v_shape_t_collar: imageIcon("/v_shape_collar.png", ""),
  zip_collar: imageIcon("/zip_collar.png", ""),

  // Cuff Images
  plain_cuff: imageIcon("/plain_cuff.png", "Plain cuff"),
  thumb_hole_cuff: imageIcon("/thumb_hole_cuff.png", "Logo application"),

  // logos
  twod_embroidded_logo: imageIcon("/2d_embroidded_logo.png", "Plain cuff"),
  puff_embroidded_logo: imageIcon("/puff_embroidded_logo.png", "Plain cuff"),
  sublimation_logo: imageIcon("/sublimation_logo.png", "Plain cuff"),
  vinyl_sticker_logo: imageIcon("/vinyl_sticker_logo.png", "Plain cuff"),

  text: icon(
    '<path d="M14 18H50" stroke="#9CA3AF" stroke-width="2"/><path d="M24 18V46" stroke="#9CA3AF" stroke-width="2"/><path d="M40 18V46" stroke="#9CA3AF" stroke-width="2"/><path d="M18 46H46" stroke="#9CA3AF" stroke-width="2"/>',
  ),
  number: icon(
    '<path d="M21 22L29 18V46" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/><path d="M38 22C38 19 41 17 44 17C48 17 50 20 50 23C50 29 40 31 40 37V39H50" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="12" width="36" height="40" rx="4" stroke="#9CA3AF" stroke-width="2"/>',
  ),
  zip: imageIcon("/zip_collar.png", "Zip collar"),
  pocket: icon(
    '<path d="M18 16H46V50H18V16Z" stroke="#9CA3AF" stroke-width="2"/><path d="M24 28H40V44H24V28Z" stroke="#9CA3AF" stroke-width="2"/><path d="M24 34H40" stroke="#9CA3AF" stroke-width="2"/>',
  ),
  trousers: icon(
    '<path d="M22 12H42L39 52H30L32 34L34 52H25L22 12Z" stroke="#9CA3AF" stroke-width="2" stroke-linejoin="round"/><path d="M26 20H38" stroke="#9CA3AF" stroke-width="2"/>',
  ),
  skirt: icon(
    '<path d="M24 14H40L46 50H18L24 14Z" stroke="#9CA3AF" stroke-width="2" stroke-linejoin="round"/><path d="M26 22H38" stroke="#9CA3AF" stroke-width="2"/>',
  ),
  narrow_trouser: imageIcon("/narrow_trouser.png", "Narrow trouser"),
  leggings_trouser: imageIcon("/leggings_trouser.png", "Leggings"),
  playing_trouser: imageIcon("/playing_trouser.png", "Playing trouser"),
  bummer_netball: imageIcon("/bummer_netball.png", "Netball bummer"),
  skirt_netball: imageIcon("/skirt_netball.png", "Netball skirt"),
  undershorts_netball: imageIcon("/undershorts_netball.png", "Under shorts"),
  casual_shorts_football: imageIcon(
    "/casual_shorts_football.png",
    "Football casual shorts",
  ),
  women_shorts_football: imageIcon(
    "/women_shorts_football.png",
    "Football women shorts",
  ),
  casual_shorts_rugby: imageIcon(
    "/casual_shorts_rugby.png",
    "Rugby casual shorts",
  ),
  playing_shorts_rugby: imageIcon(
    "/playing_shorts_rugby.png",
    "Rugby playing shorts",
  ),
  stunning_shorts_rugby: imageIcon(
    "/stunning_shorts_rugby.png",
    "Rugby stunning shorts",
  ),
  purpose: icon(
    '<circle cx="32" cy="20" r="8" stroke="#9CA3AF" stroke-width="2"/><path d="M32 28V46" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/><path d="M24 38H40" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>',
  ),
  gender: icon(
    '<circle cx="24" cy="24" r="7" stroke="#9CA3AF" stroke-width="2"/><circle cx="40" cy="24" r="7" stroke="#9CA3AF" stroke-width="2"/><path d="M24 31V44" stroke="#9CA3AF" stroke-width="2"/><path d="M20 40H28" stroke="#9CA3AF" stroke-width="2"/><path d="M40 31L46 37" stroke="#9CA3AF" stroke-width="2"/><path d="M46 37V44" stroke="#9CA3AF" stroke-width="2"/><path d="M46 37H39" stroke="#9CA3AF" stroke-width="2"/>',
  ),
} as const;

type IconKey = keyof typeof ICONS;

const toValue = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const option = (
  label: string,
  iconKey: IconKey,
  priceModifier?: number,
): OptionItem => ({
  value: toValue(label),
  label,
  icon: ICONS[iconKey],
  ...(priceModifier !== undefined ? { priceModifier } : {}),
});

const explicitOption = (
  value: string,
  label: string,
  iconKey: IconKey,
  priceModifier?: number,
): OptionItem => ({
  value,
  label,
  icon: ICONS[iconKey],
  ...(priceModifier !== undefined ? { priceModifier } : {}),
});

const PURPOSE_OPTIONS: OptionItem[] = [
  explicitOption("sports", "Sports", "purpose"),
  explicitOption("workwear", "Workwear", "purpose"),
  explicitOption("event", "Event", "purpose"),
];

const GENDER_OPTIONS: OptionItem[] = [
  explicitOption("male", "Male", "gender"),
  explicitOption("female", "Female", "gender"),
  explicitOption("both", "Both", "gender"),
];

const COMMON_LOGO_OPTIONS: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("2D Embroidered", "twod_embroidded_logo"),
  option("Vinyl", "vinyl_sticker_logo"),
  option("Puff Embroidery", "puff_embroidded_logo"),
];

const commonUploadLogosField: FormField = {
  id: "uploadLogos",
  label: "Upload Logos",
  type: "multi-file-upload",
  required: false,
  acceptedFileTypes: LOGO_FILE_TYPES,
  maxFiles: 10,
  placeholder: LOGO_POSITION_PLACEHOLDER,
  helperText: "Upload logo files and describe exact placement on the garment.",
};

const commonUploadDesignField: FormField = {
  id: "uploadDesign",
  label: "Please upload your design or any reference you have",
  type: "single-file-upload",
  required: false,
  acceptedFileTypes: LOGO_FILE_TYPES,
  helperText: "You can upload one or multiple reference files.",
};

const commonOrderQuantityField: FormField = {
  id: "orderQuantity",
  label: "Order Quantity",
  type: "number-input",
  required: true,
  helperText: "Minimum 1 unit",
};

const commonGenderField: FormField = {
  id: "gender",
  label: "Gender",
  type: "select-dropdown",
  required: true,
  options: GENDER_OPTIONS,
  placeholder: "Select gender",
};

const commonPurposeField: FormField = {
  id: "purpose",
  label: "Purpose",
  type: "select-dropdown",
  required: true,
  options: PURPOSE_OPTIONS,
  placeholder: "Select purpose",
};

const commonColorsField: FormField = {
  id: "colors",
  label: "Colors",
  type: "textarea",
  required: true,
  placeholder: COLOR_PLACEHOLDER,
};

const conditionalNameOptionsShort: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("Embroidered", "twod_embroidded_logo"),
];

const conditionalNameOptionsExtended: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("Embroidered", "twod_embroidded_logo"),
  option("Vinyl", "vinyl_sticker_logo"),
];

const conditionalNameOptionsFull: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("2D Embroidered", "twod_embroidded_logo"),
  option("Vinyl", "vinyl_sticker_logo"),
  option("Puff Embroidery", "puff_embroidded_logo"),
];

const conditionalNumberOptionsShort: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("Embroidered", "twod_embroidded_logo"),
];

const conditionalNumberOptionsExtended: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("Embroidered", "twod_embroidded_logo"),
  option("Vinyl", "vinyl_sticker_logo"),
];

const conditionalNumberOptionsFull: OptionItem[] = [
  option("Sublimation", "sublimation_logo"),
  option("Embroidered", "twod_embroidded_logo"),
  option("Vinyl", "vinyl_sticker_logo"),
  option("Puff Embroidery", "puff_embroidded_logo"),
];

export const CLOTHING_FORM_CONFIG: Record<ClothingProductType, FormConfig> = {
  "t-shirt": {
    productType: "t-shirt",
    label: "T-Shirt",
    description: "Configure your custom sports or workwear t-shirt.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve Length",
        type: "image-radio",
        required: true,
        options: [option("Short", "shortSleeve"), option("Long", "longSleeve")],
      },
      {
        id: "sleeveType",
        label: "Sleeve Type",
        type: "image-radio",
        required: true,
        options: [
          option("Set-In/Regular", "regular"),
          option("Raglan", "raglan"),
        ],
      },
      {
        id: "collarType",
        label: "Collar Type",
        type: "image-radio",
        required: true,
        options: [
          option("Ban Collar", "ban_collar"),
          option("EMU Collar", "emu_collar"),
          option("Round Collar", "round_collar"),
          option("V+Panel Collar", "v_plus_panel_collar"),
          option("V-Collar", "v_shape_t_collar"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: [
          option("Sublimation", "sublimation_logo"),
          option("2D Embroidered", "twod_embroidded_logo"),
          option("Vinyl", "vinyl_sticker_logo"),
          option("Puff Embroidery", "puff_embroidded_logo"),
        ],
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: [
          option("Sublimation", "sublimation_logo"),
          option("Embroidered", "twod_embroidded_logo"),
          option("Vinyl", "vinyl_sticker_logo"),
        ],
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: [
          option("Sublimation", "sublimation_logo"),
          option("Embroidered", "twod_embroidded_logo"),
        ],
      },
      commonColorsField,
      commonUploadLogosField,
      commonPurposeField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "polo-shirt": {
    productType: "polo-shirt",
    label: "Polo Shirt",
    description: "Configure your custom polo shirt details.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve Length",
        type: "image-radio",
        required: true,
        options: [option("Short", "shortSleeve"), option("Long", "longSleeve")],
      },
      {
        id: "sleeveType",
        label: "Sleeve Type",
        type: "image-radio",
        required: true,
        options: [
          option("Set-In/Regular", "regular"),
          option("Raglan", "raglan"),
        ],
      },
      {
        id: "collarType",
        label: "Collar Type",
        type: "image-radio",
        required: true,
        options: [
          option("1 Pcs Collar", "one_Piece_collar"),
          option("Ban+Collar", "ban_with_collar"),
          option("Zipper", "zip_collar"),
          option("V-Shape", "v_shape_polo_collar"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonColorsField,
      commonUploadLogosField,
      commonPurposeField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "hooded-sweatshirt": {
    productType: "hooded-sweatshirt",
    label: "Hooded Sweatshirt",
    description: "Configure a hooded sweatshirt with fixed long sleeves.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve Length",
        type: "fixed-badge",
        required: false,
        fixedValue: "long",
        helperText: "Long sleeve only",
        options: [option("Long Sleeve", "longSleeve")],
      },
      {
        id: "sleeveType",
        label: "Sleeve Type",
        type: "image-radio",
        required: true,
        options: [
          option("Set-In/Regular", "regular"),
          option("Raglan", "raglan"),
        ],
      },
      {
        id: "collarType",
        label: "Collar Type",
        type: "image-radio",
        required: true,
        options: [
          option("Hood With Drawcord", "hood_with_drawcard_collar"),
          option("Hood With Placket", "hood_with_placket_collar"),
          option("Hood With Toggle", "hood_with_toggle_collar"),
        ],
      },
      {
        id: "cuffsType",
        label: "Cuffs Type",
        type: "image-radio",
        required: true,
        options: [
          option("Thumb Hole Cuff", "thumb_hole_cuff"),
          option("Plane Cuff", "plain_cuff"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsExtended,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsExtended,
      },
      commonColorsField,
      commonUploadLogosField,
      commonPurposeField,
      {
        id: "zipType",
        label: "Zip Type",
        type: "image-radio",
        required: true,
        options: [
          option("Full Zip", "zip_collar"),
          option("No Zip", "zip_collar"),
        ],
      },
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "track-jacket": {
    productType: "track-jacket",
    label: "Track Jacket",
    description:
      "Configure your track jacket and optional matching trousers note.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve Length",
        type: "fixed-badge",
        required: false,
        fixedValue: "long",
        helperText: "Long sleeve only",
      },
      {
        id: "sleeveType",
        label: "Sleeve Type",
        type: "image-radio",
        required: true,
        options: [
          option("Set-In/Regular", "regular"),
          option("Raglan", "raglan"),
        ],
      },
      {
        id: "collarType",
        label: "Collar Type",
        type: "image-radio",
        required: true,
        options: [
          option("Collar With Concealed Hood", "concelled_hood_collar"),
          option("Hood Collar", "hood_collar"),
          option("Jacket Collar", "jacket_collar"),
          option("Ribbed Round Collar", "ribbed_round_collar"),
          option("Ribbed V Collar", "ribbed_v_collar"),
        ],
      },
      {
        id: "cuffsType",
        label: "Cuffs Type",
        type: "image-radio",
        required: true,
        options: [
          option("Thumb Hole Cuff", "thumb_hole_cuff"),
          option("Plane Cuff", "plain_cuff"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonColorsField,
      commonUploadLogosField,
      commonPurposeField,
      {
        id: "zipType",
        label: "Zip Type",
        type: "image-radio",
        required: true,
        options: [
          option("Full Zip", "zip_collar"),
          option("No Zip", "zip_collar"),
        ],
      },
      {
        id: "needTrousers",
        label: "Do you need trousers to go with the jacket?",
        type: "yes-no-simple",
        required: true,
      },
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "puffer-jacket": {
    productType: "puffer-jacket",
    label: "Puffer Jacket",
    description: "Configure your puffer jacket details and branding options.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve Length",
        type: "image-radio",
        required: true,
        options: [
          option("Sleeveless", "sleeveless"),
          option("Long", "longSleeve"),
        ],
      },
      {
        id: "sleeveType",
        label: "Sleeve Type",
        type: "image-radio",
        required: true,
        options: [
          option("Set-In/Regular", "regular"),
          option("Raglan", "raglan"),
        ],
      },
      {
        id: "collarType",
        label: "Collar Type",
        type: "image-radio",
        required: true,
        options: [
          option("Collar With Cancelled Hood", "concelled_hood_collar"),
          option("Hood Collar", "hood_collar"),
          option("Jacket Collar", "jacket_collar"),
          option("Ribbed Round Collar", "ribbed_round_collar"),
        ],
      },
      {
        id: "cuffsType",
        label: "Cuffs Type",
        type: "image-radio",
        required: true,
        options: [
          option("Thumb Hole Cuff", "thumb_hole_cuff"),
          option("Plane Cuff", "plain_cuff"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonColorsField,
      commonUploadLogosField,
      commonPurposeField,
      {
        id: "zipType",
        label: "Zip Type",
        type: "image-radio",
        required: true,
        options: [
          option("Full Zip", "zip_collar"),
          option("No Zip", "zip_collar"),
        ],
      },
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "reversible-jacket": {
    productType: "reversible-jacket",
    label: "Reversible Jacket",
    description: "Configure your reversible jacket with fixed long sleeves.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve Length",
        type: "fixed-badge",
        required: false,
        fixedValue: "long",
        helperText: "Long sleeve only",
      },
      {
        id: "sleeveType",
        label: "Sleeve Type",
        type: "image-radio",
        required: true,
        options: [
          option("Set-In/Regular", "regular"),
          option("Raglan", "raglan"),
        ],
      },
      {
        id: "collarType",
        label: "Collar Type",
        type: "image-radio",
        required: true,
        options: [
          option("Collar With Concealed Hood", "concelled_hood_collar"),
          option("Hood Collar", "hood_collar"),
          option("Jacket Collar", "jacket_collar"),
          option("Ribbed Round Collar", "ribbed_round_collar"),
          option("Ribbed V Collar", "ribbed_v_collar"),
        ],
      },
      {
        id: "cuffsType",
        label: "Cuffs Type",
        type: "image-radio",
        required: true,
        options: [
          option("Thumb Hole Cuff", "thumb_hole_cuff"),
          option("Plane Cuff", "plain_cuff"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonColorsField,
      commonUploadLogosField,
      commonPurposeField,
      {
        id: "zipType",
        label: "Zip Type",
        type: "image-radio",
        required: true,
        options: [
          option("Full Zip", "zip_collar"),
          option("No Zip", "zip_collar"),
        ],
      },
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  trousers: {
    productType: "trousers",
    label: "Trousers",
    description: "Configure your trouser style and utility details.",
    fields: [
      commonColorsField,
      {
        id: "type",
        label: "Type",
        type: "image-radio",
        required: true,
        options: [
          option("Narrow Trouser", "narrow_trouser"),
          option("Leggings", "leggings_trouser"),
          option("Playing Trouser", "playing_trouser"),
        ],
      },
      {
        id: "pocketType",
        label: "Pocket Type",
        type: "image-radio",
        required: true,
        options: [
          option("Zipped Pocket", "pocket"),
          option("Pocket Without Zip", "pocket"),
          option("Velcro Pocket", "pocket"),
        ],
      },
      {
        id: "bottomType",
        label: "Bottom Type",
        type: "image-radio",
        required: true,
        options: [
          option("Zipped Bottom", "zip_collar"),
          option("Elastic Bottom", "trousers"),
          option("Narrow Bottom", "trousers"),
        ],
      },
      {
        id: "backPocket",
        label: "Back Pocket",
        type: "yes-no-simple",
        required: true,
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonUploadLogosField,
      commonPurposeField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "football-shorts": {
    productType: "football-shorts",
    label: "Football Shorts",
    description: "Configure football shorts details and branding options.",
    fields: [
      commonColorsField,
      {
        id: "type",
        label: "Type",
        type: "image-radio",
        required: true,
        options: [
          option("Casual Shorts", "casual_shorts_football"),
          option("Women Shorts", "women_shorts_football"),
        ],
      },
      {
        id: "pocketType",
        label: "Pocket Type",
        type: "image-radio",
        required: true,
        options: [
          option("No Pocket", "pocket"),
          option("Zipped Pocket", "pocket"),
          option("Pocket Without Zip", "pocket"),
        ],
      },
      {
        id: "backPocket",
        label: "Back Pocket",
        type: "yes-no-simple",
        required: true,
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsFull,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonUploadLogosField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "basketball-shorts": {
    productType: "basketball-shorts",
    label: "Basketball Shorts",
    description: "Configure basketball shorts details and branding options.",
    fields: [
      commonColorsField,
      {
        id: "type",
        label: "Type",
        type: "image-radio",
        required: true,
        options: [
          option("Casual Shorts", "casual_shorts_football"),
          option("Women Shorts", "women_shorts_football"),
        ],
      },
      {
        id: "pocketType",
        label: "Pocket Type",
        type: "image-radio",
        required: true,
        options: [
          option("No Pocket", "pocket"),
          option("Zipped Pocket", "pocket"),
          option("Pocket Without Zip", "pocket"),
        ],
      },
      {
        id: "backPocket",
        label: "Back Pocket",
        type: "yes-no-simple",
        required: true,
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsFull,
      },
      commonUploadLogosField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "netball-shorts": {
    productType: "netball-shorts",
    label: "Netball Shorts",
    description: "Configure netball short style and branding options.",
    fields: [
      commonColorsField,
      {
        id: "type",
        label: "Type",
        type: "image-radio",
        required: true,
        options: [
          option("Netball Bummers", "bummer_netball"),
          option("Netball Skirts", "skirt_netball"),
          option("Under Shorts", "undershorts_netball"),
        ],
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: COMMON_LOGO_OPTIONS,
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsFull,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonUploadLogosField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
  "rugby-shorts": {
    productType: "rugby-shorts",
    label: "Rugby Shorts",
    description: "Configure rugby short utility and branding options.",
    fields: [
      commonColorsField,
      {
        id: "type",
        label: "Type",
        type: "image-radio",
        required: true,
        options: [
          option("Casual Shorts", "casual_shorts_rugby"),
          option("Playing Shorts", "playing_shorts_rugby"),
          option("Stunning Shorts", "stunning_shorts_rugby"),
        ],
      },
      {
        id: "pocketType",
        label: "Pocket Type",
        type: "image-radio",
        required: true,
        options: [
          option("No Pocket", "pocket"),
          option("Zipped Pocket", "pocket"),
          option("Pocket Without Zip", "pocket"),
        ],
      },
      {
        id: "backPocket",
        label: "Back Pocket",
        type: "yes-no-simple",
        required: true,
      },
      {
        id: "logo",
        label: "Logo Application",
        type: "image-radio",
        required: true,
        options: [
          option("Sublimation", "sublimation_logo"),
          option("Embroidered", "twod_embroidded_logo"),
          option("Vinyl", "vinyl_sticker_logo"),
          option("Puff Embroidery", "puff_embroidded_logo"),
        ],
      },
      {
        id: "nameToggle",
        label: "Do you need a name on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNameOptionsShort,
      },
      {
        id: "numberToggle",
        label: "Do you need a number on the garment?",
        type: "yes-no-conditional",
        required: true,
        conditionalOptions: conditionalNumberOptionsShort,
      },
      commonUploadLogosField,
      commonUploadDesignField,
      commonOrderQuantityField,
      commonGenderField,
    ],
  },
};
