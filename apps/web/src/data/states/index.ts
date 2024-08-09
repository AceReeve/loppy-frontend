const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
];

const states = {
  US: [
    { value: "AL", label: "Alabama", area_codes: [205, 251, 256, 334] },
    { value: "AK", label: "Alaska", area_codes: [907] },
    { value: "AZ", label: "Arizona", area_codes: [480, 520, 602, 623, 928] },
    { value: "AR", label: "Arkansas", area_codes: [479, 501, 870] },
    {
      value: "CA",
      label: "California",
      area_codes: [
        209, 213, 310, 323, 408, 415, 424, 442, 510, 530, 559, 562, 619, 626,
        650, 657, 661, 669, 707, 714, 747, 760, 805, 818, 831, 858, 909, 916,
        925, 949, 951,
      ],
    },
    { value: "CO", label: "Colorado", area_codes: [303, 719, 720, 970] },
    { value: "CT", label: "Connecticut", area_codes: [203, 475, 860, 959] },
    { value: "DE", label: "Delaware", area_codes: [302] },
    {
      value: "FL",
      label: "Florida",
      area_codes: [
        239, 305, 321, 352, 386, 407, 561, 727, 754, 772, 786, 813, 850, 863,
        904, 941, 954,
      ],
    },
    {
      value: "GA",
      label: "Georgia",
      area_codes: [229, 404, 470, 478, 678, 706, 762, 770, 912],
    },
    { value: "HI", label: "Hawaii", area_codes: [808] },
    { value: "ID", label: "Idaho", area_codes: [208] },
    {
      value: "IL",
      label: "Illinois",
      area_codes: [
        217, 224, 309, 312, 331, 618, 630, 708, 773, 779, 815, 847, 872,
      ],
    },
    {
      value: "IN",
      label: "Indiana",
      area_codes: [219, 260, 317, 463, 574, 765, 812, 930],
    },
    { value: "IA", label: "Iowa", area_codes: [319, 515, 563, 641, 712] },
    { value: "KS", label: "Kansas", area_codes: [316, 620, 785, 913] },
    { value: "KY", label: "Kentucky", area_codes: [270, 364, 502, 606, 859] },
    { value: "LA", label: "Louisiana", area_codes: [225, 318, 337, 504, 985] },
    { value: "ME", label: "Maine", area_codes: [207] },
    { value: "MD", label: "Maryland", area_codes: [240, 301, 410, 443, 667] },
    {
      value: "MA",
      label: "Massachusetts",
      area_codes: [339, 351, 413, 508, 617, 774, 781, 857, 978],
    },
    {
      value: "MI",
      label: "Michigan",
      area_codes: [231, 248, 269, 313, 517, 586, 616, 734, 810, 906, 947, 989],
    },
    {
      value: "MN",
      label: "Minnesota",
      area_codes: [218, 320, 507, 612, 651, 763, 952],
    },
    { value: "MS", label: "Mississippi", area_codes: [228, 601, 662, 769] },
    {
      value: "MO",
      label: "Missouri",
      area_codes: [314, 417, 573, 636, 660, 816],
    },
    { value: "MT", label: "Montana", area_codes: [406] },
    { value: "NE", label: "Nebraska", area_codes: [308, 402, 531] },
    { value: "NV", label: "Nevada", area_codes: [702, 725, 775] },
    { value: "NH", label: "New Hampshire", area_codes: [603] },
    {
      value: "NJ",
      label: "New Jersey",
      area_codes: [201, 551, 609, 732, 848, 856, 862, 908, 973],
    },
    { value: "NM", label: "New Mexico", area_codes: [505, 575] },
    {
      value: "NY",
      label: "New York",
      area_codes: [
        212, 315, 347, 516, 518, 585, 607, 631, 646, 716, 718, 845, 914, 917,
        929, 934,
      ],
    },
    {
      value: "NC",
      label: "North Carolina",
      area_codes: [252, 336, 704, 743, 828, 910, 919, 980, 984],
    },
    { value: "ND", label: "North Dakota", area_codes: [701] },
    {
      value: "OH",
      label: "Ohio",
      area_codes: [216, 234, 283, 330, 380, 419, 440, 513, 567, 614, 740, 937],
    },
    { value: "OK", label: "Oklahoma", area_codes: [405, 539, 580, 918] },
    { value: "OR", label: "Oregon", area_codes: [458, 503, 541, 971] },
    {
      value: "PA",
      label: "Pennsylvania",
      area_codes: [
        215, 223, 267, 272, 412, 445, 484, 570, 610, 717, 724, 814, 878,
      ],
    },
    { value: "RI", label: "Rhode Island", area_codes: [401] },
    {
      value: "SC",
      label: "South Carolina",
      area_codes: [803, 839, 843, 854, 864],
    },
    { value: "SD", label: "South Dakota", area_codes: [605] },
    {
      value: "TN",
      label: "Tennessee",
      area_codes: [423, 615, 629, 731, 865, 901, 931],
    },
    {
      value: "TX",
      label: "Texas",
      area_codes: [
        210, 214, 254, 281, 325, 346, 409, 430, 432, 469, 512, 682, 713, 737,
        806, 817, 830, 832, 903, 915, 936, 940, 956, 972, 979,
      ],
    },
    { value: "UT", label: "Utah", area_codes: [385, 435, 801] },
    { value: "VT", label: "Vermont", area_codes: [802] },
    {
      value: "VA",
      label: "Virginia",
      area_codes: [276, 434, 540, 571, 703, 757, 804],
    },
    {
      value: "WA",
      label: "Washington",
      area_codes: [206, 253, 360, 425, 509, 564],
    },
    { value: "WV", label: "West Virginia", area_codes: [304, 681] },
    {
      value: "WI",
      label: "Wisconsin",
      area_codes: [262, 274, 414, 534, 608, 715, 920],
    },
    { value: "WY", label: "Wyoming", area_codes: [307] },
  ],
  CA: [
    { value: "AB", label: "Alberta", area_codes: [403, 587, 780, 825] },
    {
      value: "BC",
      label: "British Columbia",
      area_codes: [236, 250, 604, 672, 778],
    },
    { value: "MB", label: "Manitoba", area_codes: [204, 431] },
    { value: "NB", label: "New Brunswick", area_codes: [506] },
    { value: "NL", label: "Newfoundland and Labrador", area_codes: [709] },
    { value: "NS", label: "Nova Scotia", area_codes: [782, 902] },
    {
      value: "ON",
      label: "Ontario",
      area_codes: [
        226, 249, 289, 343, 365, 416, 437, 519, 613, 647, 705, 807, 905,
      ],
    },
    { value: "PE", label: "Prince Edward Island", area_codes: [782, 902] },
    {
      value: "QC",
      label: "Quebec",
      area_codes: [367, 418, 438, 450, 514, 579, 581, 819, 873],
    },
    { value: "SK", label: "Saskatchewan", area_codes: [306, 639] },
    { value: "NT", label: "Northwest Territories", area_codes: [867] },
    { value: "NU", label: "Nunavut", area_codes: [867] },
    { value: "YT", label: "Yukon", area_codes: [867] },
  ],
};

export { countries, states };
