const scholarships = [
  {
    id: 1,
    name: "Post Matric Scholarship (SC/ST)",
    provider: "Government of India",
    amount: 48000,
    criteria: {
      caste: ["SC", "ST"],
      incomeBelow: 250000
    }
  },
  {
    id: 2,
    name: "Merit-cum-Means Scholarship",
    provider: "Ministry of Minority Affairs",
    amount: 30000,
    criteria: {
      incomeBelow: 250000,
      min12th: 60
    }
  },
  {
    id: 3,
    name: "Central Sector Scholarship",
    provider: "Govt of India",
    amount: 100000,
    criteria: {
      min12th: 80
    }
  },
  {
    id: 4,
    name: "AICTE Pragati Scholarship (Girls)",
    provider: "AICTE",
    amount: 50000,
    criteria: {
      incomeBelow: 800000
    }
  }
];

export default scholarships;
